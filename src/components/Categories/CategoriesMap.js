import Image from "next/image";
import Link from "next/link";
import Dress from "../../../public/productImages/red_dress.jpg";
import Tshirt from "../../../public/productImages/black_tshirt.jpeg";
import Pant from "../../../public/productImages/brown_pant.jpg";
import Shirt from "../../../public/productImages/beige_shirt.jpeg";
import Pull from "../../../public/productImages/white_pull.jpeg";
import Accessories from "../../../public/productImages/Neckless.jpg";
import CategoriesCard from "./CategoriesCard";

const CategoriesMap = () => {
	return (
		<div className="mx-2 mt-10">
			<h1 className="text-3xl font-bold text-center mb-10">Visit our products !</h1>
			<div className="grid grid-rows-4 grid-cols-4 auto-rows-min gap-2 mt-10 p-2 bg-slate-100">
				<div className="relative row-span-2 bg-slate-100 text-black h-30 flex justify-center items-center py-2">
					<CategoriesCard categoryText="Dress" image={Dress} width={100} height={150} />
				</div>
				<div className="relative row-span-4 col-span-1 bg-slate-100 text-black flex justify-center items-center">
					<CategoriesCard
						categoryText="T-shirt"
						image={Tshirt}
						width={100}
						height={150}
					/>
				</div>
				<div className="relative row-span-2 bg-slate-100 text-black h-30 flex justify-center items-center">
					<CategoriesCard categoryText="Pant" image={Pant} width={100} height={100} />
				</div>
				<div className="relative row-span-2 bg-slate-100 h-30 text-black flex justify-center items-center">
					<CategoriesCard categoryText="Shirts" image={Shirt} width={100} height={150} />
				</div>
				<div className="relative row-span-2 bg-slate-100 h-30 text-black flex justify-center items-center">
					<CategoriesCard categoryText="Pull" image={Pull} width={110} height={150} />
				</div>
				<div className="relative row-span-2 col-span-2 bg-slate-100 text-black flex justify-center items-center mx-10">
					<CategoriesCard
						categoryText="Accessories"
						image={Accessories}
						width={110}
						height={110}
					/>
				</div>
			</div>
		</div>
	);
};

export default CategoriesMap;
