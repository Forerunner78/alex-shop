import data from "@/utils/data";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const ProductScreen = () => {
	const { query } = useRouter();
	const { id } = query;
	const product = data.products.find((x) => x.id == id);
	if (!product) {
		return <div>Product not found!</div>;
	}
	return (
		<>
			<Link href="/">Back to Home</Link>
			<div>
				<Image
					src={product.image}
					alt={product.name}
					width={400}
					height={500}
					priority={true}
				/>
			</div>
			<ul>
				<li>
					<h1>{product.name}</h1>
				</li>
				<li>Category: {product.category}</li>
				<li>
					{product.rating} of {product.numReviews} reviews{" "}
				</li>
				<li>Description {product.description}</li>
			</ul>
			<div>
				<div>
					<div>Price:</div>
					<div>
						<strong>{product && product.price} €</strong>
					</div>
					<div>
						<div>Status:</div>
						<div>{product.countInStock > 0 ? "In Stock" : "Unavailable"}</div>
					</div>
					<button>Add To Cart</button>
				</div>
			</div>
		</>
	);
};

export default ProductScreen;
