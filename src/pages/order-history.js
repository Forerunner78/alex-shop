import { getError } from "@/utils/error";
import axios from "axios";
import Link from "next/link";
import { useEffect, useReducer } from "react";

function reducer(state, action) {
	switch (action.type) {
		case "FETCH_REQUEST":
			return { ...state, loading: true, error: "" };
		case "FETCH_SUCCESS":
			return { ...state, loading: false, orders: action.payload, error: "" };
		case "FETCH_FAIL":
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
}

const OrderHistoryScreen = () => {
	const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
		loading: true,
		orders: [],
		error: "",
	});
	useEffect(() => {
		const fetchOrders = async () => {
			try {
				dispatch({ type: "FETCH_REQUEST" });
				const { data } = await axios.get(`/api/orders/history`);
				dispatch({ type: "FETCH_SUCCESS", payload: data });
			} catch (err) {
				dispatch({ type: "FETCH_FAIL", payload: getError(err) });
			}
		};
		fetchOrders();
	}, []);
	console.log(orders);
	return (
		<>
			<h1>Order History</h1>
			{loading ? (
				<div>Loading...</div>
			) : error ? (
				<div>{error}</div>
			) : (
				<div>
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAID</th>
								<th>DELIVERED</th>
								<th>ACTION</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order._id}>
									<td>{order._id.substring(20, 24)}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>{order.totalPrice} €</td>
									<td>{order.isPaid ? `${order.paidAt}` : "Not paid"}</td>
									<td>
										{order.isDelivered
											? `${order.deliveredAt.substring(0, 10)}`
											: "Not delivered"}
									</td>
									<td>
										<Link href={`/order/${order._id}`}>Details</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
};

export default OrderHistoryScreen;
OrderHistoryScreen.auth = true;
