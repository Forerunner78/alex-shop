import Image from "next/image";
import Link from "next/link";

const CategoriesCard = ({ categoryText, image, height }) => {
	return (
		<>
			<Link href="/">
				<Image src={image} alt={categoryText} height={height}></Image>
			</Link>
			<span className="absolute bg-slate-400/75 text-[65%]">{categoryText}</span>
		</>
	);
};

export default CategoriesCard;
