import { Disclosure } from "@headlessui/react";
import { useEffect, useState } from "react";
import { BsChevronUp } from "react-icons/bs";

const sortOptions = [
	{ id: 1, name: "Price: Low to High" },
	{ id: 2, name: "Price: High to Low" },
	{ id: 3, name: "Rating: Low to High" },
	{ id: 4, name: "Rating: High to Low" },
	{ id: 5, name: "Name: A to Z" },
	{ id: 6, name: "Name: Z to A" },
];

const SortRefinements = ({ handleSelectedSort }) => {
	const [selectedSortOption, setSelectedSortOption] = useState(sortOptions[0]);

	const handleChecked = (optionId) => {
		return selectedSortOption.id === optionId;
	};

	useEffect(() => {
		handleSelectedSort(selectedSortOption);
	}, [selectedSortOption]);

	const sortFilterOptions = () => {
		return sortOptions.map((option) => (
			<div className="my-5" key={option}>
				<input
					name={option.name}
					id={option.id}
					type="checkbox"
					checked={handleChecked(option.id)}
					onChange={() => setSelectedSortOption(option)}
				/>
				<label className="ms-2 mb-2 text-sm sm:text-lg lg:text-base" htmlFor={option}>
					{option.name}
				</label>
			</div>
		));
	};

	return (
		<>
			<div className="lg:hidden">
				<Disclosure as="div">
					{({ open }) => (
						<>
							<Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 my-5 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
								<h2 className="text-lg">Sort</h2>
								<BsChevronUp
									className={`${
										open ? "rotate-180 transform" : ""
									} h-5 w-5 text-blue-500`}
								/>
							</Disclosure.Button>
							<Disclosure.Panel className="p-2 text-sm">
								{sortFilterOptions()}
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</div>
			<div className="hidden lg:block mt-[7vh]">
				<h2 className="text-xl font-bold text-blue-500">Sort</h2>
				{sortFilterOptions()}
			</div>
		</>
	);
};

export default SortRefinements;
