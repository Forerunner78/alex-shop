import { Store } from "@/utils/Store";
import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { toast } from "react-toastify";

const CartScreen = () => {
	const { state, dispatch } = useContext(Store);
	const router = useRouter();
	const {
		cart: { cartItems },
	} = state;

	const removeItemHandler = (item) => {
		dispatch({ type: "CART_REMOVE_ITEM", payload: item });
	};

	const updateCartHandler = async (item, qty) => {
		console.log(item);
		const quantity = Number(qty);
		const { data } = await axios.get(`/api/products/${item._id}`);
		if (data.countInStock < quantity) {
			toast.error("Sorry. Product is out of stock");
		}
		dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
		toast.success("Product updated to the cart");
	};

	return (
		<>
			<h1>Shopping Cart</h1>
			{cartItems.length === 0 ? (
				<div>
					Cart is empty. <Link href="/">Go shopping</Link>
				</div>
			) : (
				<div>
					<table>
						<thead>
							<tr>
								<th>Item</th>
								<th>Quantity</th>
								<th>Price</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{cartItems.map((item) => (
								<tr key={item.id}>
									<td>
										<Link href={`/product/${item.id}`}>
											<Image
												src={item.image}
												alt={item.name}
												width={50}
												height={50}
											></Image>
										</Link>
									</td>
									<td>
										<select
											value={item.quantity}
											onChange={(e) =>
												updateCartHandler(item, e.target.value)
											}
										>
											{[...Array(item.countInStock).keys()].map((x) => (
												<option key={x + 1} value={x + 1}>
													{x + 1}
												</option>
											))}
										</select>
									</td>
									<td>{item.quantity}</td>
									<td>{item.price} €</td>
									<td>
										<button onClick={() => removeItemHandler(item)}>X</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div>
						<ul>
							<li>
								<div>
									Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) :{" "}
									{cartItems.reduce((a, c) => a + c.quantity * c.price, 0)} €
								</div>
							</li>
							<li>
								<button onClick={() => router.push("login?redirect=/shipping")}>
									Check Out
								</button>
							</li>
						</ul>
					</div>
				</div>
			)}
		</>
	);
};

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
