import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import Rating from "./Rating";

const ProductItem = ({ product }) => {
	return (
		<div className="flex flex-col text-center m-2">
			<Link href={`/product/${product.id}`}>
				<Image src={product.image} alt={product.name} width={200} height={300} />
			</Link>
			<div className="leading-9">
				<Link href={`/product/${product.id}`}>
					<h1 className="uppercase font-bold">{product.name}</h1>
				</Link>
				<Rating value={product.rating} numReview={product.numReviews} />
				<h3 className="underline">{`${product.price} €`}</h3>
				<AddToCartButton product={product} />
			</div>
		</div>
	);
};

export default ProductItem;
