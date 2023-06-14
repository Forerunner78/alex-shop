import { useState } from "react";
import image1 from "../../public//img/carousel1.jpeg";
import image2 from "./../../public/img/carouselImage2.jpeg";
import image3 from "./../../public/img/carouselImage3.jpeg";
import Image from "next/image";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";

const Carousel = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const prevSlide = () => {
		setCurrentSlide(currentSlide === 0 ? 2 : currentSlide - 1);
	};
	const nextSlide = () => {
		setCurrentSlide(currentSlide === 2 ? 0 : currentSlide + 1);
	};
	console.log(currentSlide);

	return (
		<div className="relative">
			<div
				className={`transition ease-in-out duration-500`}
				style={{
					transform: `translateX(-${currentSlide * 100}vw)`,
				}}
			>
				<div className="flex flex-row w-[300vw] h-[110vh]">
					<Image
						src={image1}
						alt="image"
						className="w-[100vw] h-auto object-cover"
					></Image>
					<Image
						src={image2}
						alt="image"
						className="w-[100vw] h-auto object-cover"
					></Image>
					<Image
						src={image3}
						alt="image"
						className="w-[100vw] h-auto object-cover"
					></Image>
				</div>
			</div>
			<div className="absolute top-[50%] -translate-y-[50%] -translate-x-[50%] left-[50%] z-30 w-full flex justify-between p-5">
				<div className="bg-slate-100/50 rounded-xl cursor-pointer" onClick={prevSlide}>
					<AiOutlineArrowLeft />
				</div>
				<div className="bg-slate-100/25 rounded-xl cursor-pointer" onClick={nextSlide}>
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
