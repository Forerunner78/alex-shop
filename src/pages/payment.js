import Button from "@/components/Buttons/ButtonComponent";
import CheckoutWizard from "@/components/CheckoutWizard";
import Layout from "@/components/Layout";
import PageTitle from "@/components/Title/PageTitle";
import { Store } from "@/utils/Store";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const PaymentScreen = () => {
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
	const { state, dispatch } = useContext(Store);
	const { cart } = state;
	const { shippingAddress, paymentMethod } = cart;
	const router = useRouter();

	const submitHandler = (e) => {
		e.preventDefault();
		if (!selectedPaymentMethod) {
			return toast.error("Payment method is required");
		}
		dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
		Cookies.set("cart", JSON.stringify({ ...cart, paymentMethod: selectedPaymentMethod }));
		router.push("/placeorder");
	};

	useEffect(() => {
		if (!shippingAddress.address) {
			return router.push("/shipping");
		}
		setSelectedPaymentMethod(paymentMethod || "");
	}, [paymentMethod, router, shippingAddress.address]);

	return (
		<>
			<CheckoutWizard activeStep={2} />
			<Layout className="mb-[2vh] mt-[15vh] mx-5 sm:mb-0 w-[80vw]">
				<PageTitle title="Payment Method" />
				<form className="px-4" onSubmit={submitHandler}>
					{["Paypal", "Stripe", "CashOnDelivery"].map((payment) => (
						<div className="my-5" key={payment}>
							<input
								name="paymentMethod"
								id={payment}
								type="checkbox"
								checked={selectedPaymentMethod === payment}
								onChange={() => setSelectedPaymentMethod(payment)}
							/>
							<label className="ms-2 mb-2 text-sm sm:text-lg" htmlFor={payment}>
								{payment}
							</label>
						</div>
					))}
					<div className="relative ">
						<div className="absolute top-10 flex justify-around w-full">
							<Link
								className="w-[30vw] lg:mx-10 px-5 py-1.5 flex justify-center item-center h-10 bg-black text-white text-xl uppercase rounded-full"
								href="/shipping"
							>
								Back
							</Link>
							<Button
								className="w-[30vw] lg:mx-10 px-5 py-1.5 flex justify-center"
								text="Next"
							/>
						</div>

						{/* <div className="relative flex justify-center w-full">
							<Button
								className="absolute sm:-left-[35%] -bottom-[9vh] sm:-bottom-[130%] w-full xs:w-[70%]"
								text="Next"
							/>
						</div> */}
					</div>
				</form>
			</Layout>
		</>
	);
};

export default PaymentScreen;

PaymentScreen.auth = true;
