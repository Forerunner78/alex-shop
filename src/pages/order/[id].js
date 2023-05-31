import { getError } from "@/utils/error";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";

function reducer(state, action) {
	switch (action.type) {
		case "FETCH_REQUEST":
			return { ...state, loading: true, error: "" };
		case "FETCH_SUCCESS":
			return { ...state, loading: false, order: action.payload, error: "" };
		case "FETCH_FAIL":
			return { ...state, loading: false, error: action.payload };
		default:
			state;
	}
}

const OrderScreen = () => {
	const { query } = useRouter();
	const orderId = query.id;
	console.log(orderId);
	const [{ loading, error, order }, dispatch] = useReducer(reducer, {
		loading: true,
		order: {},
		error: "",
	});

	useEffect(() => {
		const fetchOrder = async () => {
			try {
				dispatch({ type: "FETCH_REQUEST" });
				const { data } = await axios.get(`/api/orders/${orderId}`);
				dispatch({ type: "FETCH_SUCCESS", payload: data });
			} catch (err) {
				dispatch({ type: "FETCH_FAIL", payload: getError(err) });
			}
		};
		if (!order._id || (order._id && order._id !== orderId)) {
			fetchOrder();
		}
	}, [order, orderId]);

	const {
		shippingAddress,
		paymentMethod,
		orderItems,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		isPaid,
		paidAt,
		isDelivered,
		deliveredAt,
	} = order;

	return (
		<>
			<h1>{`${orderId}`}</h1>
			{loading ? (
				<div>Loading...</div>
			) : error ? (
				<div>{error}</div>
			) : (
				<div>
					<div>
						<div>
							<h2>Shipping Address</h2>
							<div>
								{shippingAddress.fullName}, {shippingAddress.address},{" "}
								{shippingAddress.city}, {shippingAddress.postalCode},{" "}
								{shippingAddress.country}
							</div>
							{isDelivered ? (
								<div>Delivered at {deliveredAt}</div>
							) : (
								<div>Not delivered</div>
							)}
						</div>
						<div>
							<h2>Payment Method</h2>
							<div>{paymentMethod}</div>
							{isPaid ? <div>Paid at {paidAt}</div> : <div>Not paid</div>}
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
									{orderItems.map((item) => (
										<tr key={item.id}>
											<td>
												<Link href={`/product/${item.id}`}>
													<Image
														src={item.image}
														alt={item.name}
														width={50}
														height={50}
													></Image>
													$nbsp; {item.name}
												</Link>
											</td>
											<td>{item.quantity}</td>
											<td>{`${item.price} €`}</td>
											<td>{`${item.price * item.quantity} €`}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					<div>
						<div>
							<h2>Order Summary</h2>
							<ul>
								<li>
									<div>
										<div>Items</div>
										<div>{`${itemsPrice} €`}</div>
									</div>
								</li>
								<li>
									<div>
										<div>Tax</div>
										<div>{`${taxPrice} €`}</div>
									</div>
								</li>
								<li>
									<div>
										<div>Shipping</div>
										<div>{`${shippingPrice} €`}</div>
									</div>
								</li>
								<li>
									<div>
										<div>Total</div>
										<div>{`${totalPrice} €`}</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default OrderScreen;

OrderScreen.auth = true;
