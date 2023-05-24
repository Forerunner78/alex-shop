import { Store } from "@/utils/Store";
import data from "@/utils/data";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

const ProductScreen = () => {
	const { state, dispatch } = useContext(Store);
	const { query } = useRouter();
	const { id } = query;
	const product = data.products.find((x) => x.id == id);
	if (!product) {
		return <div>Product not found!</div>;
	}
	const addToCartHandler = () => {
		const existItem = state.cart.cartItems.find((x) => x.id == product.id);
		const quantity = existItem ? existItem.quantity + 1 : 1;

		if (product.countInStock < quantity) {
			alert("Sorry. Product is out of stock");
			return;
		}

		dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
	};

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
					<button onClick={addToCartHandler}>Add To Cart</button>
				</div>
			</div>
		</>
	);
};

export default ProductScreen;
