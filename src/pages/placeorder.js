import CheckoutWizard from "@/components/CheckoutWizard";
import { Store } from "@/utils/Store";
import { getError } from "@/utils/error";
import axios from "axios";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const PlaceOrderScreen = () => {
	const { state, dispatch } = useContext(Store);
	const { cart } = state;
	const { cartItems, shippingAddress, paymentMethod } = cart;
	const session = useSession();
	const user = session.data._id;

	const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
	const itemsPrice = round2(cartItems.reduce((a, c) => a + c.quantity * c.price, 0));

	const shippingPrice = itemsPrice > 200 ? 0 : 15;
	const taxPrice = round2(itemsPrice * 0.15);
	const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

	const router = useRouter();
	useEffect(() => {
		if (!paymentMethod) {
			router.push("/payment");
		}
	}, [paymentMethod, router]);

	useEffect(() => {
		if (!user) {
			router.push("/login");
			toast.info("You must be logged to place an order");
		}
	}, [user, router]);

	const [loading, setLoading] = useState(false);

	const placeOrderHandler = async () => {
		try {
			setLoading(true);

			const { data } = await axios.post("/api/orders", {
				orderItems: cartItems,
				shippingAddress,
				paymentMethod,
				itemsPrice,
				shippingAddress,
				taxPrice,
				totalPrice,
				user,
			});
			setLoading(false);
			dispatch({ type: "CART_CLEAR_ITEMS" });
			Cookies.set("cart", JSON.stringify({ ...cart, cartItems: [] }));
			router.push(`/order/${data._id}`);
		} catch (err) {
			setLoading(false);
			toast.error(getError(err));
		}
	};

	return (
		<>
			<CheckoutWizard activeStep={3} />
			<h1>Place Order</h1>
			{cartItems.length === 0 ? (
				<div>
					Cart is empty. <Link href="/">Go to Home</Link>
				</div>
			) : (
				<div>
					<div>
						<div>
							<h2>Shipping Address</h2>
							<div>
								{shippingAddress.fullName},{shippingAddress.address},
								{shippingAddress.city},{shippingAddress.postalCode},
								{shippingAddress.country}
							</div>
							<div>
								<Link href="/shipping">Edit</Link>
							</div>
						</div>
						<div>
							<h2>Payment Method</h2>
							<div>{paymentMethod}</div>
							<div>
								<Link href="/payment">Edit</Link>
							</div>
						</div>
						<div>
							<h2>Order Items</h2>
							<table>
								<thead>
									<tr>
										<th>Item</th>
										<th>Quantity</th>
										<th>Price</th>
										<th>Subtotal</th>
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
													></Image>{" "}
													&nbsp; {item.name}
												</Link>
											</td>
											<td>{item.quantity}</td>
											<td>{item.price} €</td>
											<td>{item.quantity * item.price} €</td>
										</tr>
									))}
								</tbody>
							</table>
							<div>
								<Link href="/cart">Edit Cart</Link>
							</div>
						</div>
					</div>
					<div>
						<div>
							<h2>Order Summary</h2>
							<ul>
								<li>
									<div>
										<div>Items</div>
										<div>{itemsPrice} €</div>
									</div>
								</li>
								<li>
									<div>
										<div>Tax</div>
										<div>{taxPrice} €</div>
									</div>
								</li>
								<li>
									<div>
										<div>Shipping</div>
										<div>{shippingPrice} €</div>
									</div>
								</li>
								<li>
									<div>
										<div>Total</div>
										<div>{totalPrice} €</div>
									</div>
								</li>
								<li>
									<button disabled={loading} onClick={placeOrderHandler}>
										{loading ? "Loading..." : "Place Order"}
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default PlaceOrderScreen;

PlaceOrderScreen.auth = true;
