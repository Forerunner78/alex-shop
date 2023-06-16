import Image from "next/image";
import Link from "next/link";

const CategoriesCard = ({ category, image }) => {
	return (
		<div className="h-[25vh] xs:h-[30vh] sm:h-[40vh] md:h-[50vh] overflow-hidden">
			<Link href={`/search/${category}`}>
				<Image src={image} alt={category} className="object-cover" fill></Image>
			</Link>
			<span className="absolute top-[50%] -translate-y-[50%] -translate-x-[50%] left-[50%] bg-slate-400/75 p-1 text-[50%] sm:text-[75%] text-center lg:text-lg">
				{category}
			</span>
		</div>
	);
};

export default CategoriesCard;
