import ErrorMessage from "../ErrorMessage";

const EmailInput = ({ register, errors }) => {
	return (
		<div className="flex flex-col mb-6 px-4">
			<label className="uppercase font-bold mb-2" htmlFor="email">
				Email :
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
			{errors.email && <ErrorMessage errorMessage={errors.email.message} />}
		</div>
	);
};

export default EmailInput;
