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
				<h1>Update Profile</h1>
				<div>
					<label htmlFor="name">Name</label>
					<input
						type="text"
						id="name"
						autoFocus
						{...register("name", { required: "Please enter name" })}
					/>
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
					<button>Update Profile</button>
				</div>
			</form>
		</>
	);
};

export default ProfileScreen;
ProfileScreen.auth = true;
