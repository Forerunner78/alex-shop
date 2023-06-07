import CheckoutWizard from "@/components/CheckoutWizard";
import { Store } from "@/utils/Store";
import { getError } from "@/utils/error";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { HiOutlineTrash } from "react-icons/hi2";

const PlaceOrderScreen = () => {
	const { state, dispatch } = useContext(Store);
	const { cart } = state;
	const { cartItems, shippingAddress, paymentMethod } = cart;

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
			<h1 className="text-3xl font-bold text-center mb-10">Your Order</h1>
			{cartItems.length === 0 ? (
				<div>
					Cart is empty. <Link href="/">Go to Home</Link>
				</div>
			) : (
				<div>
					<div className="px-4">
						<div className="border-2 my-5">
							<h2 className="text-lg font-bold uppercase mb-2">Shipping Address</h2>
							<ul>
								<li>{shippingAddress.fullName}</li>
								<li>{shippingAddress.address}</li>
								<li>{shippingAddress.postalCode}</li>
								<li className="uppercase">{shippingAddress.city}</li>
								<li className="uppercase">{shippingAddress.country}</li>
							</ul>
							<div className="mt-5">
								<Link
									className="uppercase text-white bg-black rounded-full px-5"
									href="/shipping"
								>
									Edit
								</Link>
							</div>
						</div>
						<div className="border-2 my-5">
							<h2 className="text-lg font-bold uppercase mb-2">Payment Method</h2>
							<div>{paymentMethod}</div>
							<div className="mt-5">
								<Link
									className="uppercase text-white bg-black rounded-full px-5"
									href="/payment"
								>
									Edit
								</Link>
							</div>
						</div>
						<div className="border-2 my-5">
							<h2 className="text-lg font-bold uppercase mb-2">Order Items</h2>
							<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
								<div className="inline-block min-w-full py-2 sm:px-3 lg:px-8">
									<div className="overflow-hidden">
										<table className="min-w-full text-center text-sm font-light">
											<thead className="border-b font-medium dark:border-neutral-500">
												<tr>
													<th scope="col" className="px-3 py-4">
														Item
													</th>
													<th scope="col" className="px-3 py-4">
														Quantity
													</th>
													<th scope="col" className="px-3 py-4">
														Price
													</th>
													<th scope="col" className="px-3 py-4">
														Action
													</th>
												</tr>
											</thead>
											<tbody>
												{cartItems.map((item) => (
													<tr
														key={item._id}
														className="border-t dark:border-neutral-500"
													>
														<td className="whitespace-nowrap px-3 py-4 font-medium">
															<Link href={`/product/${item.id}`}>
																<Image
																	src={item.image}
																	alt={item.name}
																	width={50}
																	height={50}
																></Image>
															</Link>
														</td>
														<td className="whitespace-nowrap px-3 py-4">
															<select
																value={item.quantity}
																onChange={(e) =>
																	updateCartHandler(
																		item,
																		e.target.value
																	)
																}
															>
																{[
																	...Array(
																		item.countInStock
																	).keys(),
																].map((x) => (
																	<option
																		key={x + 1}
																		value={x + 1}
																	>
																		{x + 1}
																	</option>
																))}
															</select>
														</td>
														<td className="whitespace-nowrap px-3 py-4">
															{item.price} €
														</td>
														<td className="whitespace-nowrap px-3 py-4">
															<button
																onClick={() =>
																	removeItemHandler(item)
																}
															>
																<HiOutlineTrash />
															</button>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
						<div className="border-2 my-5">
							<h2 className="text-lg font-bold uppercase mb-2">Order Summary</h2>
							<ul>
								<li>
									<div className="flex flex-row justify-between mx-10 my-2">
										<div>Items</div>
										<div>{itemsPrice} €</div>
									</div>
								</li>
								<li>
									<div className="flex flex-row justify-between mx-10 my-2">
										<div>Tax</div>
										<div>{taxPrice} €</div>
									</div>
								</li>
								<li>
									<div className="flex flex-row justify-between mx-10 my-2">
										<div>Shipping</div>
										<div>{shippingPrice} €</div>
									</div>
								</li>
								<li>
									<div className="flex flex-row justify-between mx-10 my-2">
										<div>Total</div>
										<div>{totalPrice} €</div>
									</div>
								</li>
								<li className="text-center my-10">
									<button
										className="uppercase text-lg text-white bg-black font-bold rounded-full px-5 h-10"
										disabled={loading}
										onClick={placeOrderHandler}
									>
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
