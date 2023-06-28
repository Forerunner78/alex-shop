import { useEffect, useState } from "react";

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
		<>
			Refinements by price
			<div>
				<label className="uppercase font-bold mb-2 lg:text-xl" htmlFor="minPrice">
					Min
				</label>
				<input
					id="minPrice"
					type="number"
					value={minPrice}
					className="rounded border-2"
					placeholder="Minimum Price"
					onChange={handleMinPriceChange}
				/>
				<label className="uppercase font-bold mb-2 lg:text-xl" htmlFor="maxPrice">
					Max
				</label>
				<input
					id="maxPrice"
					type="number"
					value={maxPrice}
					className="rounded border-2"
					placeholder="Maximum Price"
					onChange={handleMaxPriceChange}
				/>
			</div>
		</>
	);
};

export default PriceRefinements;
