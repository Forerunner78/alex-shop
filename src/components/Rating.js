import { ImStarEmpty } from "react-icons/im";
import { ImStarFull } from "react-icons/im";
import { ImStarHalf } from "react-icons/im";

const Rating = ({ value, numReview }) => {
	return (
		<div className="flex flex-row justify-center">
			<span>
				{value >= 1 ? <ImStarFull /> : value >= 0.5 ? <ImStarHalf /> : <ImStarEmpty />}
			</span>
			<span>
				{value >= 2 ? <ImStarFull /> : value >= 1.5 ? <ImStarHalf /> : <ImStarEmpty />}
			</span>
			<span>
				{value >= 3 ? <ImStarFull /> : value >= 2.5 ? <ImStarHalf /> : <ImStarEmpty />}
			</span>
			<span>
				{value >= 4 ? <ImStarFull /> : value >= 3.5 ? <ImStarHalf /> : <ImStarEmpty />}
			</span>
			<span>
				{value >= 5 ? <ImStarFull /> : value >= 4.5 ? <ImStarHalf /> : <ImStarEmpty />}
			</span>

			<span className="text-xs ps-2">{`(${numReview})`}</span>
		</div>
	);
};

export default Rating;
