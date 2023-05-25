import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

const ProductItem = ({ product }) => {
	return (
		<>
			<Link href={`/product/${product.id}`}>
				<Image src={product.image} alt={product.name} width={200} height={300} />
			</Link>
			<div>
				<Link href={`/product/${product.id}`}>
					<h2>{product.name}</h2>
				</Link>
				<div value={product.rating} text={`${product.numReviews} reviews`} />
				<h3>{`${product.price} €`}</h3>
				<AddToCartButton product={product} />
			</div>
		</>
	);
};

export default ProductItem;
