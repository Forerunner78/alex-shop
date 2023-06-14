import { useState } from "react";
import image1 from "./../../../public/img/carouselImage1.jpeg";
import image1rZ from "./../../../public/img/carouselImage1Rz.jpeg";
import image2 from "../../../public//img/carouselImage2.jpeg";
import image3 from "./../../../public/img/carouselImage3.jpeg";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import CarouselCard from "./CarouselCard";

const Carousel = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const prevSlide = () => {
		setCurrentSlide(currentSlide === 0 ? 2 : currentSlide - 1);
	};
	const nextSlide = () => {
		setCurrentSlide(currentSlide === 2 ? 0 : currentSlide + 1);
	};

	return (
		<div className="relative">
			<div
				className={`transition ease-in-out duration-500`}
				style={{
					transform: `translateX(-${currentSlide * 100}vw)`,
				}}
			>
				<div className="flex flex-row w-[300vw]">
					<div className="relative w-[100vw] xl:hidden">
						<CarouselCard image={image1rZ} text="Discover the newest products" />
					</div>
					<div className="relative w-[100vw] hidden xl:inline-block">
						<CarouselCard image={image1} text="Discover the newest products" />
					</div>
					<div className="relative w-[100vw]">
						<CarouselCard image={image2} text="Discover the best sells" />
					</div>
					<div className="relative w-[100vw]">
						<CarouselCard image={image3} text="Uncover the latest trends" />
					</div>
				</div>
			</div>
			<div className="absolute top-[50%] -translate-y-[50%] -translate-x-[50%] left-[50%] z-30 w-full flex justify-between p-5">
				<div
					className="bg-slate-100/50 rounded-xl cursor-pointer text-xl md:text-2xl"
					onClick={prevSlide}
				>
					<AiOutlineArrowLeft />
				</div>
				<div
					className="bg-slate-100/25 rounded-xl cursor-pointer text-xl md:text-2xl"
					onClick={nextSlide}
				>
					<AiOutlineArrowRight />
				</div>
			</div>
			<div className="absolute bottom-[10%] translate-y-[30%] -translate-x-[50%] left-[50%] flex flex-row justify-center items-center">
				<span
					className={`w-5 mx-2 border-b-2  ${
						currentSlide === 0 ? "border-b-zinc-100" : "border-b-zinc-500"
					}`}
				/>
				<span
					className={`w-5 mx-2 border-b-2 ${
						currentSlide === 1 ? "border-b-zinc-100" : "border-b-zinc-500"
					}`}
				/>
				<span
					className={`w-5 mx-2 border-b-2 ${
						currentSlide === 2 ? "border-b-zinc-100" : "border-b-zinc-500"
					}`}
				/>
			</div>
		</div>
	);
};

export default Carousel;
