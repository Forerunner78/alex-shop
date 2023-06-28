import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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

	return (
		<>
			Refinements by categories
			<div>
				{categories.map((category) => (
					<div className="my-5" key={category}>
						<input
							name="category"
							id={category}
							type="checkbox"
							checked={handleChecked(category)}
							onChange={() => handleSelectedCategory(category)}
						/>
						<label className="ms-2 mb-2 text-sm sm:text-lg" htmlFor={category}>
							{category}
						</label>
					</div>
				))}
			</div>
		</>
	);
};

export default CategoryRefinements;
