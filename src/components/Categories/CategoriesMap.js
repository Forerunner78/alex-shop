import Dress from "../../../public/productImages/red_dress.jpg";
import Tshirt from "../../../public/productImages/black_tshirt.jpeg";
import Pant from "../../../public/productImages/brown_pant.jpg";
import Shirt from "../../../public/productImages/beige_shirt.jpeg";
import Pull from "../../../public/productImages/white_pull.jpeg";
import Accessories from "../../../public/productImages/neckless.jpg";
import CategoriesCard from "./CategoriesCard";

const CategoriesMap = () => {
	return (
		<div className="mx-5 md:mx-10 mt-10">
			<h1 className="text-3xl font-bold text-center mb-10">Visit our products !</h1>
			<div className="grid grid-rows-4 md:grid-rows-2 grid-cols-4 md:grid-cols-6 gap-2 md:gap-5 lg:gap-10 mt-10 p-5 bg-slate-100">
				<div className="relative row-span-2 ">
					<CategoriesCard category="Dress" image={Dress} />
				</div>
				<div className="relative row-span-4 md:row-span-2 col-span-1">
					<CategoriesCard category="T-shirt" image={Tshirt} />
				</div>
				<div className="relative row-span-2  ">
					<CategoriesCard category="Pant" image={Pant} />
				</div>
				<div className="relative row-span-4 md:row-span-2 col-span-1">
					<CategoriesCard category="Accessories" image={Accessories} />
				</div>
				<div className="relative row-span-2">
					<CategoriesCard category="Shirts" image={Shirt} />
				</div>
				<div className="relative row-span-2">
					<CategoriesCard category="Pull" image={Pull} />
				</div>
			</div>
		</div>
	);
};

export default CategoriesMap;
