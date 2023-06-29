import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { BsCheck } from "react-icons/bs";

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

	useEffect(() => {
		handleSelectedSort(selectedSortOption);
	}, [selectedSortOption]);

	return (
		<div className="fixed top-16 w-72">
			<Listbox value={selectedSortOption} onChange={setSelectedSortOption}>
				<div className="relative mt-1">
					<Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
						<span className="block truncate">{selectedSortOption.name}</span>
						<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
							<BsChevronDown />
						</span>
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{sortOptions.map((option, optionId) => (
								<Listbox.Option
									key={optionId}
									className={({ active }) =>
										`relative cursor-default select-none py-2 pl-10 pr-4 ${
											active ? "bg-amber-100 text-amber-900" : "text-gray-900"
										}`
									}
									value={option}
								>
									{({ active }) => (
										<>
											<span
												className={`block truncate ${
													active ? "font-2xl" : "font-normal"
												}`}
											>
												{option.name}
											</span>

											{active ? (
												<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
													<BsCheck />
												</span>
											) : null}
										</>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		</div>
	);
};

export default SortRefinements;
