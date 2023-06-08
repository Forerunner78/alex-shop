import { Store } from "@/utils/Store";
import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { toast } from "react-toastify";
import { HiOutlineTrash } from "react-icons/hi2";
import { EmptyCart } from "@/components/EmptyCart";

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
		<div className="w-full min-h-screen">
			<h1 className="text-3xl font-bold text-center mb-10">Your Shopping Cart</h1>
			{cartItems.length === 0 ? (
				<EmptyCart />
			) : (
				<div className="flex flex-col">
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
												className="border-b dark:border-neutral-500"
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
															updateCartHandler(item, e.target.value)
														}
													>
														{[...Array(item.countInStock).keys()].map(
															(x) => (
																<option key={x + 1} value={x + 1}>
																	{x + 1}
																</option>
															)
														)}
													</select>
												</td>
												<td className="whitespace-nowrap px-3 py-4">
													{item.price} €
												</td>
												<td className="whitespace-nowrap px-3 py-4">
													<button onClick={() => removeItemHandler(item)}>
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
					<div className="flex justify-end me-5">
						<ul className="flex flex-col text-lg font-bold">
							<li className="my-5">
								Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) :{" "}
								{cartItems.reduce((a, c) => a + c.quantity * c.price, 0)} €
							</li>
							<li className="grid justify-items-stretch h-10 mt-5 bg-black text-white rounded-full">
								<button onClick={() => router.push("login?redirect=/shipping")}>
									Check Out
								</button>
							</li>
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
