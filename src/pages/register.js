import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { getError } from "@/utils/error";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const RegisterScreen = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const { redirect } = router.query;

	useEffect(() => {
		if (session?.user) {
			router.push(redirect || "/");
		}
	}, [router, session, redirect]);

	const {
		handleSubmit,
		register,
		getValues,
		formState: { errors },
	} = useForm();

	const submitHandler = async ({ name, email, password }) => {
		try {
			await axios.post("/api/auth/signup", { name, email, password });
			const result = await signIn("credentials", { redirect: false, email, password });
			if (result.error) {
				toast.error(result.error);
			}
		} catch (err) {
			toast.error(getError(err));
		}
	};

	return (
		<form onSubmit={handleSubmit(submitHandler)}>
			<h1>Create Account</h1>
			<div>
				<label htmlFor="name">Name</label>
				<input
					type="text"
					id="name"
					autoFocus
					{...register("name", {
						required: "Please enter your name",
					})}
				></input>
				{errors.name && <div>{errors.name.message}</div>}
			</div>
			<div>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					id="email"
					autoFocus
					{...register("email", {
						required: "Please enter email",
						pattern: {
							value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+\.[a-zA-Z]/i,
							message: "Please enter valid email",
						},
					})}
				></input>
				{errors.email && <div>{errors.email.message}</div>}
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					{...register("password", {
						required: "Please enter password",
						minLength: {
							value: 8,
							message: "Password should have at least 8 characters",
						},
					})}
				></input>
				{errors.password && <div>{errors.password.message}</div>}
			</div>
			<div>
				<label htmlFor="confirmPassword">Confirm Password</label>
				<input
					type="password"
					id="confirmPassword"
					{...register("confirmPassword", {
						required: "Please enter your password a second time",
						validate: (value) => value === getValues("password"),
						minLength: {
							value: 8,
							message: "Password should have at least 8 characters",
						},
					})}
				></input>
				{errors.confirmPassword && <div>{errors.confirmPassword.message}</div>}
				{errors.confirmPassword && errors.confirmPassword.type === "validate" && (
					<div>Passwords do not match</div>
				)}
			</div>
			<div>
				<button>Register</button>
			</div>
		</form>
	);
};

export default RegisterScreen;
