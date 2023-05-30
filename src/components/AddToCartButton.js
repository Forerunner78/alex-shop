import { Store } from "@/utils/Store";
import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";

const AddToCartButton = ({ product }) => {
	const { state, dispatch } = useContext(Store);

	const addToCartHandler = async () => {
		const existItem = state.cart.cartItems.find((x) => x.id == product.id);
		const quantity = existItem ? existItem.quantity + 1 : 1;
		const { data } = await axios.get(`/api/products/${product._id}`);

		if (data.countInStock < quantity) {
			return toast.error("Sorry. Product is out of stock");
		}

		dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
		toast.success("Product added to the cart");
	};

	return <button onClick={addToCartHandler}>Add To Cart</button>;
};

export default AddToCartButton;
