import Image from "next/image";

const CarouselCard = ({ image, text }) => {
	return (
		<>
			<Image src={image} alt="Carousel image" className="h-[100vh] object-cover"></Image>
			<div className="absolute w-[100vw] bottom-6 flex justify-center items-center">
				<span className="w-[85vw] xl:w-[50vw] bg-zinc-100/50 rounded-lg px-2 text-center md:text-xl">
					{text}
				</span>
			</div>
		</>
	);
};

export default CarouselCard;
