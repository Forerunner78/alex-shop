import { Disclosure } from "@headlessui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsChevronUp } from "react-icons/bs";

const CategoryRefinements = ({ categories, handleSelectedCategories }) => {
	const router = useRouter();
	const routerCategory = router.query.category;
	const [selectedCategories, setSelectedCategories] = useState([routerCategory]);

	const handleChecked = (category) => {
		return selectedCategories.includes(category);
	};

	const handleSelectedCategory = (category) => {
		if (selectedCategories.length === 1 && selectedCategories[0] === "All") {
			setSelectedCategories([]);
		}
		if (category === "All") {
			setSelectedCategories([]);
		}
		if (selectedCategories.includes(category)) {
			setSelectedCategories((prevCategories) =>
				prevCategories.filter((cat) => cat !== category)
			);
		} else {
			setSelectedCategories((prevCategories) => [...prevCategories, category]);
		}
	};

	useEffect(() => {
		handleSelectedCategories(selectedCategories);
	}, [selectedCategories]);

	const categoriesFilterOptions = () => {
		return categories.map((category) => (
			<div className="my-5" key={category}>
				<input
					name="category"
					id={category}
					type="checkbox"
					checked={handleChecked(category)}
					onChange={() => handleSelectedCategory(category)}
				/>
				<label className="ms-2 mb-2 text-sm sm:text-lg lg:text-base" htmlFor={category}>
					{category}
				</label>
			</div>
		));
	};

	return (
		<>
			<div className="lg:hidden lg:my-10">
				<Disclosure>
					{({ open }) => (
						<>
							<Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 my-5 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
								<h2 className="text-lg">Categories</h2>
								<BsChevronUp
									className={`${
										open ? "rotate-180 transform" : ""
									} h-5 w-5 text-blue-500`}
								/>
							</Disclosure.Button>
							<Disclosure.Panel className="p-2 text-sm">
								<div>{categoriesFilterOptions()}</div>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</div>
			<div className="hidden lg:block my-[7vh]">
				<h2 className="text-xl font-bold text-blue-500">Categories</h2>
				{categoriesFilterOptions()}
			</div>
		</>
	);
};

export default CategoryRefinements;
