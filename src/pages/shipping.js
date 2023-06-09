import Button from "@/components/Buttons/ButtonComponent";
import CheckoutWizard from "@/components/CheckoutWizard";
import { Store } from "@/utils/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

const ShippingScreen = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
	} = useForm();

	const { state, dispatch } = useContext(Store);
	const { cart } = state;
	const { shippingAddress } = cart;
	const router = useRouter();

	useEffect(() => {
		setValue("fullName", shippingAddress.fullName);
		setValue("address", shippingAddress.address);
		setValue("city", shippingAddress.city);
		setValue("postalCode", shippingAddress.postalCode);
		setValue("country", shippingAddress.country);
	}, [setValue, shippingAddress]);

	const submitHandler = ({ fullName, address, city, postalCode, country }) => {
		dispatch({
			type: "SAVE_SHIPPING_ADDRESS",
			payload: { fullName, address, city, postalCode, country },
		});
		Cookies.set(
			"cart",
			JSON.stringify({
				...cart,
				shippingAddress: { fullName, address, city, postalCode, country },
			})
		);
		router.push("/payment");
	};
	return (
		<>
			<CheckoutWizard activeStep={1} />
			<h1 className="text-3xl font-bold text-center mb-10">Your Shipping Address</h1>
			<form className="grid grid-cols-2" onSubmit={handleSubmit(submitHandler)}>
				<div className="flex flex-col mb-6 px-4">
					<label className="uppercase font-bold" htmlFor="fullName">
						Name :
					</label>
					<input
						id="fullName"
						className="rounded border-2"
						placeholder="Full Name"
						autoFocus
						{...register("fullName", { required: "Please enter a full name" })}
					/>
					{errors.fullName && (
						<div className="text-xs text-red-500">{errors.fullName.message}</div>
					)}
				</div>
				<div className="flex flex-col mb-6 px-4">
					<label className="uppercase font-bold" htmlFor="address">
						Address :
					</label>
					<input
						id="address"
						className="rounded border-2"
						placeholder="Address"
						autoFocus
						{...register("address", {
							required: "Please enter an address",
							minLength: {
								value: 3,
								message: "Address should be more than 2 characters",
							},
						})}
					/>
					{errors.address && (
						<div className="text-xs text-red-500">{errors.address.message}</div>
					)}
				</div>
				<div className="flex flex-col mb-6 px-4">
					<label className="uppercase font-bold" htmlFor="city">
						City :
					</label>
					<input
						id="city"
						className="rounded border-2"
						placeholder="City"
						autoFocus
						{...register("city", {
							required: "Please enter a city",
						})}
					/>
					{errors.city && (
						<div className="text-xs text-red-500">{errors.city.message}</div>
					)}
				</div>
				<div className="flex flex-col mb-6 px-4">
					<label className="uppercase font-bold" htmlFor="postalCode">
						Postal Code :
					</label>
					<input
						id="postalCode"
						className="rounded border-2"
						placeholder="Postal code"
						autoFocus
						{...register("postalCode", {
							required: "Please enter a postal code",
						})}
					/>
					{errors.postalCode && (
						<div className="text-xs text-red-500">{errors.postalCode.message}</div>
					)}
				</div>
				<div className="flex flex-col mb-6 px-4">
					<label className="uppercase font-bold" htmlFor="country">
						Country :
					</label>
					<input
						id="country"
						className="rounded border-2"
						placeholder="Country"
						autoFocus
						{...register("country", {
							required: "Please enter a country",
						})}
					/>
					{errors.country && (
						<div className="text-xs text-red-500">{errors.country.message}</div>
					)}
				</div>
				<div className="relative">
					<Button className="absolute -left-[50%] -bottom-[100%] w-full" text="Next" />
				</div>
			</form>
		</>
	);
};

ShippingScreen.auth = true;

export default ShippingScreen;
