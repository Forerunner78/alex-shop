import Image from "next/image";
import Paypal from "./../../public/img/Paypal.png";
import Visa from "./../../public/img/Visa.png";
import WebsiteTitle from "./Title/WebsiteTitle";

const Footer = () => {
	return (
		<footer className="mt-10 px-4 border-t-2 flex flex-row text-center">
			<div className="basis-2/3 sm:basis-3/4 flex flex-col sm:flex-row items-center justify-evenly">
				<WebsiteTitle />
				<span className="text-xs md:px-5">Copyright &copy; {new Date().getFullYear()}</span>
			</div>
			<div className="basis-1/3 sm:basis-1/4 flex flex-row flex-end items-center ">
				<div className="w-[25vw] sm:w-[15vw]">
					<Image src={Paypal} alt="Paypal logo" className="object-cover" />
				</div>
				<div className="w-[10vw] sm:w-[5vw]">
					<Image src={Visa} alt="Visa logo" className="object-cover" />
				</div>
			</div>
		</footer>
	);
};

export default Footer;
