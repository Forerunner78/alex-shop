import Image from "next/image";
import Link from "next/link";

const CategoriesCard = ({ categoryText, image }) => {
	return (
		<div className="h-[30vh] md:h-[50vh]">
			<Link href="/">
				<Image src={image} alt={categoryText} fill></Image>
			</Link>
			<span className="absolute top-[50%] -translate-y-[50%] -translate-x-[50%] left-[50%] bg-slate-400/75 p-1 text-xs lg:text-lg">
				{categoryText}
			</span>
		</div>
	);
};

export default CategoriesCard;
