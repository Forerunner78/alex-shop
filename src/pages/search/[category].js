import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import ProductItem from "@/components/ProductItem";
import ProductNotFound from "@/components/ProductNotFound";
import CategoryRefinements from "@/components/Refinements/CategoryRefinements";
import PriceRefinements from "@/components/Refinements/PriceRefinements";
import SortRefinements from "@/components/Refinements/SortRefinements";
import Product from "@/models/productModel";
import db from "@/utils/db";
import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment, useEffect } from "react";
import { BiFilterAlt } from "react-icons/bi";

const SearchScreen = (props) => {
	const { allCategories, products } = props;
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [selectedPriceRange, setSelectedPriceRange] = useState([]);
	const [selectedSortOption, setSelectedSortOption] = useState("");
	const [selectedProducts, setSelectedProducts] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	const handleSelectedCategories = (e) => {
		setSelectedCategories(e);
	};

	const filteredProducts = (products) => {
		setIsLoading(true);
		let filtered = products;
		if (selectedCategories.includes("All")) {
			filtered = filtered.filter(
				(product) =>
					product.price >= selectedPriceRange[0] && product.price <= selectedPriceRange[1]
			);
		} else {
			filtered = filtered.filter(
				(product) =>
					selectedCategories.includes(product.category) &&
					product.price >= selectedPriceRange[0] &&
					product.price <= selectedPriceRange[1]
			);
		}
		switch (selectedSortOption.id) {
			case 1:
				filtered = filtered.sort((a, b) => a.price - b.price);
				break;
			case 2:
				filtered = filtered.sort((a, b) => b.price - a.price);
				break;
			case 3:
				filtered = filtered.sort((a, b) => a.rating - b.rating);
				break;
			case 4:
				filtered = filtered.sort((a, b) => b.rating - a.rating);
				break;
			case 5:
				filtered = filtered.sort((a, b) => {
					const nameProductA = a.name.toUpperCase();
					const nameProductB = b.name.toUpperCase();
					return nameProductA < nameProductB ? -1 : 1;
				});
				break;
			case 6:
				filtered = filtered.sort((a, b) => {
					const nameProductA = a.name.toUpperCase();
					const nameProductB = b.name.toUpperCase();
					return nameProductA > nameProductB ? -1 : 1;
				});
				break;
		}
		setIsLoading(false);
		setSelectedProducts(filtered);
	};

	useEffect(() => {
		filteredProducts(products);
	}, [selectedCategories, selectedPriceRange, selectedSortOption]);

	const handleSelectedPriceRange = (e) => {
		setSelectedPriceRange(e);
	};

	const handleSelectedSort = (e) => {
		setSelectedSortOption(e);
	};
	return (
		<div className="flex justify-center">
			<div className="mt-[10vh] lg:mt-[20vh] w-[80vw] lg:w-[95vw] lg:flex lg:flex-row">
				<div className="lg:flex-auto">
					<div className="hidden lg:block lg:w-[20vw]">
						<Layout className="lg:rounded-2xl p-5">
							<h1 className="text-2xl text-center font-bold mb-10">Filter options</h1>
							<CategoryRefinements
								categories={allCategories}
								handleSelectedCategories={handleSelectedCategories}
							/>
							<PriceRefinements handleSelectedPriceRange={handleSelectedPriceRange} />
							<SortRefinements handleSelectedSort={handleSelectedSort} />
						</Layout>
					</div>
					<div className="lg:hidden">
						<div className="flex flex-row items-center justify-center md:mt-[5vh]">
							<button
								type="button"
								onClick={openModal}
								className="rounded-md bg-black bg-opacity-20 px-4 py-2 my-5 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
							>
								<div className="flex flex-row text-lg items-center">
									<span className="font-bold me-2">Filter your products</span>{" "}
									<BiFilterAlt />
								</div>
							</button>
						</div>
						<Transition appear show={isOpen} as={Fragment}>
							<Dialog as="div" className="relative z-10" onClose={closeModal}>
								<Transition.Child
									as={Fragment}
									enter="ease-out duration-300"
									enterFrom="opacity-0"
									enterTo="opacity-100"
									leave="ease-in duration-200"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<div className="fixed inset-0 bg-black bg-opacity-25" />
								</Transition.Child>

								<div className="fixed inset-0 overflow-y-auto">
									<div className="flex min-h-full items-center justify-center p-4 text-center">
										<Transition.Child
											as={Fragment}
											enter="ease-out duration-300"
											enterFrom="opacity-0 scale-95"
											enterTo="opacity-100 scale-100"
											leave="ease-in duration-200"
											leaveFrom="opacity-100 scale-100"
											leaveTo="opacity-0 scale-95"
										>
											<Dialog.Panel className="w-[100vw] max-w-md max-h-[80vh] transform overflow-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative">
												<Dialog.Title
													as="h3"
													className="text-lg font-medium leading-6 text-gray-900"
												>
													Filter options
												</Dialog.Title>
												<div className="absolute top-5 right-5">
													<button
														type="button"
														className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
														onClick={closeModal}
													>
														X
													</button>
												</div>
												<div className="w-full px-4 pt-10">
													<div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
														<CategoryRefinements
															categories={allCategories}
															handleSelectedCategories={
																handleSelectedCategories
															}
														/>
														<PriceRefinements
															handleSelectedPriceRange={
																handleSelectedPriceRange
															}
														/>
														<SortRefinements
															handleSelectedSort={handleSelectedSort}
														/>
													</div>
												</div>
											</Dialog.Panel>
										</Transition.Child>
									</div>
								</div>
							</Dialog>
						</Transition>
					</div>
				</div>
				<Layout className="mt-0 md:mx-10 bg-slate-200 py-10 flex justify-center items-center lg:min-w-[70vw]">
					<div>
						{isLoading ? (
							<Loading />
						) : selectedProducts.length > 0 ? (
							<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
								{selectedProducts.map((product) => (
									<ProductItem product={product} key={product.id} />
								))}
							</div>
						) : (
							<ProductNotFound />
						)}
					</div>
				</Layout>
			</div>
		</div>
	);
};

export default SearchScreen;

export async function getServerSideProps() {
	await db.connect();

	const allProducts = await Product.find().lean();

	const getAllCategories = () => {
		const allCategories = ["All"];
		allProducts.forEach((product) => {
			if (!allCategories.includes(product.category)) {
				allCategories.push(product.category);
			}
		});
		return allCategories;
	};

	const products = allProducts;

	await db.disconnect();
	return {
		props: {
			products: products.map(db.convertDocToObj),
			allCategories: getAllCategories(),
		},
	};
}
