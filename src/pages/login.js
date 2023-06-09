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
			<h1 className="text-3xl font-bold text-center mb-10">Login</h1>
			<div className="flex flex-col mb-6 px-4">
				<label className="uppercase font-bold mb-2" htmlFor="email">
					Email
				</label>
				<input
					type="email"
					id="email"
					className="rounded border-2"
					autoFocus
					placeholder="Enter your email"
					{...register("email", {
						required: "Please enter email",
						pattern: {
							value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+\.[a-zA-Z]/i,
							message: "Please enter valid email",
						},
					})}
				></input>
				{errors.email && <div className="text-xs text-red-500">{errors.email.message}</div>}
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
			<div className="flex justify-center m-10">
				<button className=" w-[50%] h-10 bg-black text-white text-xl uppercase rounded-full">
					Login
				</button>
			</div>

			<div className="text-sm text-center">
				Don&apos;t have an account? &nbsp;
				<Link className="underline" href={`/register?redirect=${redirect || "/"}`}>
					Register
				</Link>
			</div>
		</form>
	);
};

export default LoginScreen;
