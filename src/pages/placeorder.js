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
import { EmptyCart } from "@/components/EmptyCart";
import ShippingAddress from "@/components/ShippingAddress";
import PaymentMethod from "@/components/PaymentMethod";
import OrderSummary from "@/components/OrderSummary";
import PageTitle from "@/components/Title/PageTitle";
import Layout from "@/components/Layout";

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

			{cartItems.length === 0 ? (
				<EmptyCart />
			) : (
				<Layout className="mb-[2vh] mt-[20vh] mx-5 sm:mb-0 w-[80vw]">
					<div className="px-4">
						<PageTitle title="Your Order" />
						<div className="md:flex md:flex-row md:justify-around">
							<div className="border-2 bg-slate-400 my-5 p-4 md:w-[45%] flex flex-col">
								<ShippingAddress shippingAddress={shippingAddress} />
								<div className="mt-5 md:mt-5">
									<Link
										className="uppercase text-white bg-black rounded-full px-5"
										href="/shipping"
									>
										Edit
									</Link>
								</div>
							</div>
							<div className="border-2 bg-slate-400 my-5 p-4 md:w-[45%] flex flex-col">
								<PaymentMethod paymentMethod={paymentMethod} />
								<div className="mt-5 md:mt-auto">
									<Link
										className="uppercase text-white bg-black rounded-full px-5 "
										href="/payment"
									>
										Edit
									</Link>
								</div>
							</div>
						</div>
						<div className="border-2 bg-slate-400 my-5 md:mx-4">
							<h2 className="text-xl md:text-2xl font-bold uppercase mb-2 px-4 pt-4">
								Order Items
							</h2>
							<div className="overflow-x-auto sm:mx-6 lg:-mx-8">
								<div className="inline-block min-w-full py-2 sm:px-3 lg:px-8 overflow-x-auto">
									<div className="overflow-hidden flex justify-center">
										<table className="w-[90%] text-center text-sm font-light">
											<thead>
												<tr className="md:text-xl">
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
													<tr key={item._id} className="border-t">
														<td className="relative whitespace-nowrap px-3 my-2 font-medium flex justify-center h-[10vh] md:h-[15vh] lg:h-[30vh] ">
															<Link href={`/product/${item.id}`}>
																<Image
																	src={item.image}
																	alt={item.name}
																	fill
																	className="object-contain"
																></Image>
															</Link>
														</td>
														<td className="whitespace-nowrap px-3">
															<select
																value={item.quantity}
																className="bg-slate-400 w-9"
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
														<td className="whitespace-nowrap px-3 md:text-lg">
															{item.price} €
														</td>
														<td className="whitespace-nowrap px-3 md:text-lg">
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
						<div className="md:flex md:justify-end">
							<div className="border-2 bg-slate-400 my-5 p-4 md:mx-4 md:w-[50%] xl:w-[30%]">
								<OrderSummary
									itemsPrice={itemsPrice}
									taxPrice={taxPrice}
									shippingPrice={shippingPrice}
									totalPrice={totalPrice}
								/>
							</div>
						</div>

						<div className="text-center my-10">
							<button
								className="uppercase text-lg text-white bg-black font-bold rounded-full px-5 h-10 sm:w-[30vw]"
								disabled={loading}
								onClick={placeOrderHandler}
							>
								{loading ? "Loading..." : "Place Order"}
							</button>
						</div>
					</div>
				</Layout>
			)}
		</>
	);
};

export default PlaceOrderScreen;

PlaceOrderScreen.auth = true;
