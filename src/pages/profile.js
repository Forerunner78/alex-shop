import Button from "@/components/Buttons/ButtonComponent";
import { getError } from "@/utils/error";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ProfileScreen = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const {
		handleSubmit,
		register,
		getValues,
		setValue,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		setValue("name", session.user.name);
		setValue("email", session.user.email);
	}, [session.user, setValue]);

	const submitHandler = async ({ name, email, password }) => {
		try {
			await axios.put("/api/auth/update", { name, email, password });
			const result = await signIn("credentials", { redirect: false, email, password });
			toast.success("Profile updated successfully");
			router.push("/");

			if (result.error) {
				toast.error(result.error);
			}
		} catch (err) {
			toast.error(getError(err));
		}
	};
	return (
		<>
			<form onSubmit={handleSubmit(submitHandler)}>
				<h1 className="text-3xl font-bold text-center mb-10">Update Your Profile</h1>
				<div className="flex flex-col mb-6 px-4">
					<label className="uppercase font-bold mb-2" htmlFor="name">
						Name
					</label>
					<input
						type="text"
						id="name"
						className="rounded border-2"
						autoFocus
						placeholder="Enter your full name"
						{...register("name", { required: "Please enter name" })}
					/>
					{errors.name && (
						<div className="text-xs text-red-500">{errors.name.message}</div>
					)}
				</div>
				<div className="flex flex-col mb-6 px-4">
					<label className="uppercase font-bold mb-2" htmlFor="email">
						Email
					</label>
					<input
						type="email"
						id="email"
						className="rounded border-2"
						placeholder="Enter your email"
						autoFocus
						{...register("email", {
							required: "Please enter email",
							pattern: {
								value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+\.[a-zA-Z]/i,
								message: "Please enter valid email",
							},
						})}
					></input>
					{errors.email && (
						<div className="text-xs text-red-500">{errors.email.message}</div>
					)}
				</div>
				<div className="flex flex-col mb-6 px-4">
					<label className="uppercase font-bold mb-2" htmlFor="password">
						Password
					</label>
					<input
						type="password"
						id="password"
						className="rounded border-2"
						placeholder="Enter your password"
						{...register("password", {
							required: "Please enter password",
							minLength: {
								value: 8,
								message: "Password should have at least 8 characters",
							},
						})}
					></input>
					{errors.password && (
						<div className="text-xs text-red-500">{errors.password.message}</div>
					)}
				</div>
				<div className="flex flex-col mb-6 px-4">
					<label className="uppercase font-bold mb-2" htmlFor="confirmPassword">
						Confirm Password
					</label>
					<input
						type="password"
						id="confirmPassword"
						className="rounded border-2"
						placeholder="Confirm your password"
						{...register("confirmPassword", {
							required: "Please enter your password a second time",
							validate: (value) => value === getValues("password"),
							minLength: {
								value: 8,
								message: "Password should have at least 8 characters",
							},
						})}
					></input>
					{errors.confirmPassword && (
						<div className="text-xs text-red-500">{errors.confirmPassword.message}</div>
					)}
					{errors.confirmPassword && errors.confirmPassword.type === "validate" && (
						<div className="text-xs text-red-500">Passwords do not match</div>
					)}
				</div>
				<div className="flex justify-center m-10">
					<Button className="w-[100%]" text="Update your profile" />
				</div>
			</form>
		</>
	);
};

export default ProfileScreen;
ProfileScreen.auth = true;
