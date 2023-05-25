import { Store } from "@/utils/Store";
import { useContext } from "react";

const AddToCartButton = ({ product }) => {
	const { state, dispatch } = useContext(Store);

	const addToCartHandler = () => {
		const existItem = state.cart.cartItems.find((x) => x.id == product.id);
		const quantity = existItem ? existItem.quantity + 1 : 1;

		if (product.countInStock < quantity) {
			alert("Sorry. Product is out of stock");
			return;
		}

		dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
	};

	return <button onClick={addToCartHandler}>Add To Cart</button>;
};

export default AddToCartButton;
