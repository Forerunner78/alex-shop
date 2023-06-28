import ProductItem from "@/components/ProductItem";
import ProductNotFound from "@/components/ProductNotFound";
import CategoryRefinements from "@/components/Refinements/CategoryRefinements";
import PriceRefinements from "@/components/Refinements/PriceRefinements";
import Product from "@/models/productModel";
import db from "@/utils/db";
import { useState } from "react";

const SearchScreen = (props) => {
	const { allCategories, products } = props;
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [selectedPriceRange, setSelectedPriceRange] = useState([]);

	const handleSelectedCategories = (e) => {
		setSelectedCategories(e);
	};

	const filteredProducts = (products) => {
		if (selectedCategories.includes("All")) {
			return products.filter((product) => {
				return (
					product.price >= selectedPriceRange[0] && product.price <= selectedPriceRange[1]
				);
			});
		} else {
			return products.filter(
				(product) =>
					selectedCategories.includes(product.category) &&
					product.price >= selectedPriceRange[0] &&
					product.price <= selectedPriceRange[1]
			);
		}
	};

	const handleSelectedPriceRange = (e) => {
		setSelectedPriceRange(e);
	};

	return (
		<div className="flex justify-center">
			<div className="mt-[10vh]">
				<div className="m-[10vh]">
					<CategoryRefinements
						categories={allCategories}
						handleSelectedCategories={handleSelectedCategories}
					/>
					<PriceRefinements handleSelectedPriceRange={handleSelectedPriceRange} />
				</div>
				<div className="mt-0 mx-10 bg-slate-200 pt-10">
					{filteredProducts(products).length > 0 ? (
						<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
							{filteredProducts(products).map((product) => (
								<ProductItem product={product} key={product.id} />
							))}
						</div>
					) : (
						<ProductNotFound />
					)}
				</div>
			</div>
		</div>
	);
};

export default SearchScreen;

export async function getServerSideProps(context) {
	await db.connect();
	const { params } = context;
	const { category } = params;

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

	var products;

	if (category === "All" || !category) {
		products = allProducts;
	} else {
		products = await Product.find({ category }).lean();
	}

	// if (query.minPrice) {
	// 	const minPrice = parseInt(query.minPrice);
	// 	products = products.filter((product) => product.price >= minPrice);
	// }

	// if (query.maxPrice) {
	// 	const maxPrice = parseInt(query.maxPrice);
	// 	products = products.filter((product) => product.price <= maxPrice);
	// }

	// if (query.sortOrder === "ascending") {
	// 	products = products.sort((a, b) => a.price - b.price);
	// } else if (query.sortOrder === "descending") {
	// 	products = products.sort((a, b) => b.price - a.price);
	// }

	await db.disconnect();
	return {
		props: {
			products: products.map(db.convertDocToObj),
			allCategories: getAllCategories(),
		},
	};
}
