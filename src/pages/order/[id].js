import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import OrderSummary from "@/components/OrderSummary";
import PageTitle from "@/components/Title/PageTitle";
import PaymentMethod from "@/components/PaymentMethod";
import ShippingAddress from "@/components/ShippingAddress";
import { getError } from "@/utils/error";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import { toast } from "react-toastify";

function reducer(state, action) {
	switch (action.type) {
		case "FETCH_REQUEST":
			return { ...state, loading: true, error: "" };
		case "FETCH_SUCCESS":
			return { ...state, loading: false, order: action.payload, error: "" };
		case "FETCH_FAIL":
			return { ...state, loading: false, error: action.payload };
		case "PAY_REQUEST":
			return { ...state, loadingPay: true };
		case "PAY_SUCCESS":
			return { ...state, loadingPay: false, successPay: true };
		case "PAY_FAIL":
			return { ...state, loadingPay: false, errorPay: action.payload };
		case "PAY_RESET":
			return { ...state, loadingPay: false, successPay: false, errorPay: "" };
		default:
			state;
	}
}

const OrderScreen = () => {
	const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
	const { query } = useRouter();
	const orderId = query.id;
	const [{ loading, error, order, successPay, loadingPay }, dispatch] = useReducer(reducer, {
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
		if (!order._id || successPay || (order._id && order._id !== orderId)) {
			fetchOrder();
			if (successPay) {
				dispatch({ type: "PAY_RESET" });
			}
		} else {
			const loadPaypalScript = async () => {
				const { data: clientId } = await axios.get("/api/keys/paypal");
				paypalDispatch({
					type: "resetOptions",
					value: { "client-id": clientId, currency: "EUR" },
				});
				paypalDispatch({ type: "setLoadingStatus", value: "pending" });
			};
			loadPaypalScript();
		}
	}, [order, orderId, paypalDispatch, successPay]);

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

	const createOrder = (data, actions) => {
		return actions.order
			.create({ purchase_units: [{ amount: { value: totalPrice } }] })
			.then((orderID) => {
				return orderID;
			});
	};

	const onApprove = (data, actions) => {
		return actions.order.capture().then(async function (details) {
			try {
				dispatch({ type: "PAY_REQUEST" });
				const { data } = await axios.put(`/api/orders/${order._id}/pay`, details);
				dispatch({ type: "PAY_SUCCESS", payload: data });
				toast.success("Order is paid successfully");
			} catch (err) {
				dispatch({ type: "PAY_FAIL", payload: getError(err) });
				toast.error(getError(err));
			}
		});
	};

	const onError = (err) => {
		toast.error(getError(err));
	};

	return (
		<div className="flex flex-col">
			{loading ? (
				<Loading />
			) : error ? (
				<div>{error}</div>
			) : (
				<Layout className="mb-[2vh] mt-[20vh] mx-5 sm:mb-0 w-[80vw]">
					<div className="px-4">
						<PageTitle title="Order Summary" />
						<p className="mb-5">{`Order ${orderId.slice(0, 10)}`}</p>
						<div className="md:flex md:flex-row md:justify-around">
							<div className="border-2 bg-slate-400 my-5 p-4 md:w-[45%] flex flex-col">
								<ShippingAddress shippingAddress={shippingAddress} />
								<div className="mt-5 md:mt-5">
									{isDelivered ? (
										<div className="bg-green-200 text-green-600 rounded-full m-3 p-2 text-center md:w-[15vw]">
											Delivered on {deliveredAt}
										</div>
									) : (
										<div className="bg-red-200 text-red-600 rounded-full m-3 p-2 text-center md:w-[15vw]">
											Not delivered
										</div>
									)}
								</div>
							</div>
							<div className="border-2 bg-slate-400 my-5 p-4 md:w-[45%] flex flex-col">
								<PaymentMethod paymentMethod={paymentMethod} />
								<div className="mt-5 md:mt-auto">
									{isPaid ? (
										<div className="bg-green-200 text-green-600 rounded-full m-3 p-2 text-center md:w-[15vw]">
											{paidAt}
										</div>
									) : (
										<div className="bg-red-200 text-red-600 rounded-full m-3 p-2 text-center md:w-[15vw]">
											Not paid
										</div>
									)}
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
												</tr>
											</thead>
											<tbody>
												{orderItems.map((item) => (
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
														<td className="whitespace-nowrap px-3 md:text-lg">
															<p className="bg-slate-400">
																{item.quantity}
															</p>
														</td>
														<td className="whitespace-nowrap px-3 md:text-lg">
															{item.price} €
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
						{!isPaid && (
							<>
								{isPending ? (
									<Loading />
								) : (
									<div className="mt-10 md:w-[50vw] mx-auto">
										<PayPalButtons
											createOrder={createOrder}
											onApprove={onApprove}
											onError={onError}
										></PayPalButtons>
									</div>
								)}
								{loadingPay && <Loading />}
							</>
						)}
					</div>
				</Layout>
			)}
		</div>
	);
};

export default OrderScreen;

OrderScreen.auth = true;
