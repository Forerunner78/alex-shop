import { ImStarEmpty } from "react-icons/im";
import { ImStarFull } from "react-icons/im";
import { ImStarHalf } from "react-icons/im";

const Rating = ({ value, numReview }) => {
	const regex = /[.,]/;

	const displayStars = (value) => {
		var hasDecimal = false;
		if (value === null || value == 0) {
			return getEmptyStar(5);
		}
		if (value > 0 && value < 1) {
			return getMidStar();
		}
		if (regex.test(value)) {
			hasDecimal = true;
			value = value.toString().split(regex)[0];
		}
		return getStars(value, hasDecimal);
	};

	const getStars = (value, hasDecimal) => {
		let stars = [];
		for (var i = 1; i < value; i++) {
			stars.push(
				<span key={i}>
					<ImStarFull />
				</span>
			);
		}
		if (hasDecimal) {
			stars.push(
				<span>
					<ImStarHalf />
				</span>
			);
		}
		return stars;
	};

	const getInteger = (value) => {
		if (regex.test(value)) {
			const decimalString = value.toString();
			const decimal = decimalString.split(regex);
			return displayFullStar(decimal[0]);
		} else {
			return displayFullStar(value);
		}
	};

	const displayFullStar = (value) => {
		let stars = [];
		for (var i = 0; i < value; i++) {
			stars.push(
				<span key={i}>
					<ImStarFull />
				</span>
			);
		}
		return stars;
	};

	const getDecimals = (value) => {
		if (regex.test(value)) {
			return getMidStar();
		}
	};

	const getMidStar = () => {
		return (
			<span>
				<ImStarHalf />
			</span>
		);
	};

	const getEmptyStar = (value) => {
		let stars = [];
		for (var i = 0; i < value; i++) {
			stars.push(
				<span key={i}>
					<ImStarEmpty />
				</span>
			);
		}
		return stars;
	};

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
