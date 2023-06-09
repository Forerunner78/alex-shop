import ErrorMessage from "../ErrorMessage";

const FullNameInput = ({ register, errors }) => {
	return (
		<div className="flex flex-col mb-6 px-4">
			<label className="uppercase font-bold mb-2" htmlFor="fullName">
				Full Name :
			</label>
			<input
				type="text"
				id="fullName"
				className="rounded border-2"
				autoFocus
				placeholder="Enter your full name"
				{...register("fullName", { required: "Please enter your full name" })}
			/>
			{errors.fullName && <ErrorMessage errorMessage={errors.fullName.message} />}
		</div>
	);
};

export default FullNameInput;
