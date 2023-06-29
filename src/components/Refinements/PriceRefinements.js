import { Disclosure } from "@headlessui/react";
import { useEffect, useState } from "react";
import { BsChevronUp } from "react-icons/bs";

const PriceRefinements = ({ handleSelectedPriceRange }) => {
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(100);
	const [range, setRange] = useState([]);

	const handleMinPriceChange = (e) => {
		setMinPrice(e.target.value);
	};
	const handleMaxPriceChange = (e) => {
		setMaxPrice(e.target.value);
	};

	useEffect(() => {
		const priceRange = [minPrice, maxPrice];
		setRange(priceRange);
	}, [maxPrice, minPrice]);

	useEffect(() => {
		handleSelectedPriceRange(range);
	}, [range]);

	return (
		<Disclosure as="div" className="mt-2">
			{({ open }) => (
				<>
					<Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
						<span>Price</span>
						<BsChevronUp
							className={`${
								open ? "rotate-180 transform" : ""
							} h-5 w-5 text-blue-500`}
						/>
					</Disclosure.Button>
					<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
						<div className="flex flex-row items-center">
							<div className="flex flex-col me-2">
								<label
									className=" text-sm sm:text-lg text-left mb-2"
									htmlFor="minPrice"
								>
									Min
								</label>
								<label className=" text-sm sm:text-lg text-left" htmlFor="maxPrice">
									Max
								</label>
							</div>
							<div className="flex flex-col max-w-[60%]">
								<input
									id="minPrice"
									type="number"
									value={minPrice}
									className="rounded border-2 px-2 text-center mb-2"
									placeholder="Minimum Price"
									onChange={handleMinPriceChange}
								/>
								<input
									id="maxPrice"
									type="number"
									value={maxPrice}
									className="rounded border-2 px-2 text-center"
									placeholder="Maximum Price"
									onChange={handleMaxPriceChange}
								/>
							</div>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};

export default PriceRefinements;
