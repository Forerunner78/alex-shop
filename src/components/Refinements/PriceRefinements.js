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

	const priceFilterOptions = () => {
		return (
			<div className="flex flex-row items-center justify-evenly my-5">
				<div className="flex flex-col text-center text-sm sm:text-lg lg:text-base mx-1">
					<label className="mb-2" htmlFor="minPrice">
						Min
					</label>
					<label className="mt-2" htmlFor="maxPrice">
						Max
					</label>
				</div>
				<div className="flex flex-col w-[40vw] text-sm sm:text-lg lg:text-base mx-1">
					<input
						id="minPrice"
						type="number"
						value={minPrice}
						className="rounded border-2 text-center mb-2 lg:w-[14vw]"
						placeholder="Minimum Price"
						onChange={handleMinPriceChange}
					/>
					<input
						id="maxPrice"
						type="number"
						value={maxPrice}
						className="rounded border-2 text-center mt-2 lg:w-[14vw]"
						placeholder="Maximum Price"
						onChange={handleMaxPriceChange}
					/>
				</div>
			</div>
		);
	};

	return (
		<>
			<div className="lg:hidden">
				<Disclosure as="div">
					{({ open }) => (
						<>
							<Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 my-5 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
								<h2 className="text-lg">Price</h2>
								<BsChevronUp
									className={`${
										open ? "rotate-180 transform" : ""
									} h-5 w-5 text-blue-500`}
								/>
							</Disclosure.Button>
							<Disclosure.Panel className="p-2 text-sm">
								{priceFilterOptions()}
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</div>
			<div className="hidden lg:block my-[7vh]">
				<h2 className="text-xl font-bold text-blue-500">Price</h2>
				{priceFilterOptions()}
			</div>
		</>
	);
};

export default PriceRefinements;
