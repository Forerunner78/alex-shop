const Button = ({ className, text }) => {
	return (
		<button className={`h-10 bg-black text-white text-xl uppercase rounded-full ${className}`}>
			{text}
		</button>
	);
};

export default Button;
