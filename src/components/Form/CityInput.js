import ErrorMessage from "../ErrorMessage";

const CityInput = ({ register, errors }) => {
	return (
		<div className="flex flex-col mb-6 px-4">
			<label className="uppercase font-bold mb-2" htmlFor="city">
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
			{errors.city && <ErrorMessage errorMessage={errors.city.message} />}
		</div>
	);
};

export default CityInput;
