import { Store } from "@/utils/Store";
import Image from "next/image";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useContext } from "react";

const CartScreen = () => {
	const { state, dispatch } = useContext(Store);
	const router = useRouter();
	const {
		cart: { cartItems },
	} = state;

	const removeItemHandler = (item) => {
		dispatch({ type: "CART_REMOVE_ITEM", payload: item });
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
								<button onClick={() => router.push("/shipping")}>Check Out</button>
							</li>
						</ul>
					</div>
				</div>
			)}
		</>
	);
};

export default CartScreen;
