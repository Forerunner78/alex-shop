import Image from "next/image";
import Link from "next/link";
import Dress from "../../public/productImages/red_dress.jpg";
import Tshirt from "../../public/productImages/black_tshirt.jpeg";
import Pant from "../../public/productImages/brown_pant.jpg";
import Shirt from "../../public/productImages/beige_shirt.jpeg";
import Pull from "../../public/productImages/white_pull.jpeg";
import Neckless from "../../public/productImages/Neckless.jpg";

const CategoriesMap = () => {
	return (
		<div className="m-2 mt-10">
			<h1 className="text-3xl font-bold text-center mb-10">Visit our products !</h1>
			<div className="grid grid-rows-4 grid-cols-4 gap-2 mt-10 p-2 bg-slate-100">
				<div className="relative row-span-2 bg-black text-black h-20 flex justify-center items-center">
					<Link href="/">
						<Image src={Dress} alt="product image" fill></Image>
					</Link>
					<span className="absolute bg-slate-400/75 text-xs">Dress</span>
				</div>
				<div className="relative row-span-4 col-span-1 bg-slate-100 text-black flex justify-center items-center">
					<Link href="/">
						<Image src={Tshirt} alt="product image"></Image>
					</Link>
					<span className="absolute bg-slate-400/75 text-xs">T-shirt</span>
				</div>
				<div className="relative row-span-2 bg-black h-20 text-black flex justify-center items-center">
					<Link href="/">
						<Image src={Pant} alt="product image" fill></Image>
					</Link>
					<span className="absolute bg-slate-400/75 text-xs">Pant</span>
				</div>
				<div className="relative row-span-2 bg-black h-20 text-black flex justify-center items-center">
					<Link href="/">
						<Image src={Shirt} alt="product image" fill></Image>
					</Link>
					<span className="absolute bg-slate-400/75 text-xs">Shirts</span>
				</div>
				<div className="relative row-span-2 bg-black h-20 text-black flex justify-center items-center">
					<Link href="/">
						<Image src={Pull} alt="product image" fill></Image>
					</Link>
					<span className="absolute bg-slate-400/75 text-xs">Pull</span>
				</div>
				<div className="relative row-span-2 col-span-2 bg-slate-100 text-black flex justify-center items-center">
					<Link href="/">
						<Image src={Neckless} alt="product image" width={50}></Image>
					</Link>
					<span className="absolute bg-slate-400/75 text-xs">Accessories</span>
				</div>
			</div>
		</div>
	);
};

export default CategoriesMap;
