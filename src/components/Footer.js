import Image from "next/image";
import Paypal from "./../../public/img/Paypal.png";
import Visa from "./../../public/img/Visa.png";

const Footer = () => {
	return (
		<footer className="mt-10 px-5 flex flex-row justify-between text-center">
			<div className="flex flex-col items-center justify-center">
				<h1 className="uppercase text-xl">Alex Shop</h1>
				<span className="text-xs">Copyright &copy; {new Date().getFullYear()}</span>
			</div>
			<div className="flex flex-row flex-end items-center">
				<span>
					<Image src={Paypal} width={100} alt="Paypal logo" />
				</span>
				<span>
					<Image src={Visa} width={50} alt="Visa logo" />
				</span>
			</div>
		</footer>
	);
};

export default Footer;
