import ErrorMessage from "../ErrorMessage";

const PasswordInput = ({ register, errors }) => {
	return (
		<div className="flex flex-col mb-6 px-4 lg:w-[25vw]">
			<label className="uppercase font-bold mb-2 lg:text-xl" htmlFor="password">
				Password :
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
			{errors.password && <ErrorMessage errorMessage={errors.password.message} />}
		</div>
	);
};

export default PasswordInput;
