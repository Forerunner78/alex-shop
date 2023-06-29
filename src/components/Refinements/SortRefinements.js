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

	return (
		<Disclosure as="div" className="mt-2">
			{({ open }) => (
				<>
					<Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
						<span>Sort</span>
						<BsChevronUp
							className={`${
								open ? "rotate-180 transform" : ""
							} h-5 w-5 text-blue-500`}
						/>
					</Disclosure.Button>
					<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
						{sortOptions.map((option) => (
							<div className="my-5" key={option}>
								<input
									name={option.name}
									id={option.id}
									type="checkbox"
									checked={handleChecked(option.id)}
									onChange={() => setSelectedSortOption(option)}
								/>
								<label className="ms-2 mb-2 text-sm sm:text-lg" htmlFor={option}>
									{option.name}
								</label>
							</div>
						))}
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};

export default SortRefinements;
