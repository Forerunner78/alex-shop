import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { getError } from "@/utils/error";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/router";

const LoginScreen = () => {
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
		formState: { errors },
	} = useForm();

	const submitHandler = async ({ email, password }) => {
		try {
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
			<h1>Login</h1>
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
				<button>Login</button>
			</div>
			<div>
				Don&apos;t have an account? &nbsp;
				<Link href="/register">Register</Link>
			</div>
		</form>
	);
};

export default LoginScreen;
