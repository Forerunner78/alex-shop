import ErrorMessage from "../ErrorMessage";

const CityInput = ({ register, errors }) => {
	return (
		<div className="flex flex-col mb-6 px-4 lg:w-[30vw]">
			<label className="uppercase font-bold mb-2 lg:text-xl" htmlFor="city">
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
