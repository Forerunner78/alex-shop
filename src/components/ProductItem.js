import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./Buttons/AddToCartButton";
import Rating from "./Rating";

const ProductItem = ({ product }) => {
	return (
		<div className="flex flex-col text-center items-center m-2 w-[50vw] sm:w-[30vw] md:w-[20vw]">
			<div className="h-[50vh] sm:h-[40vh] lg:h-[60vh] xl:h-[70vh] w-[50vw] sm:w-[30vw] md:w-[20vw]">
				<Link href={`/product/${product.id}`}>
					<div className="relative h-full w-full">
						<Image
							src={product.image}
							alt={product.name}
							className="object-cover"
							fill
						/>
					</div>
				</Link>
			</div>

			<div className="leading-9 px-2 w-[90%]">
				<Link href={`/product/${product.id}`}>
					<h1 className="uppercase font-bold h-20 flex items-center justify-center break-normal">
						{product.name}
					</h1>
				</Link>
				<Rating value={product.rating} numReview={product.numReviews} />
				<h3 className="underline m-2 font-bold">{`${product.price} €`}</h3>
				<AddToCartButton product={product} className="p-1 w-ful" />
			</div>
		</div>
	);
};

export default ProductItem;
