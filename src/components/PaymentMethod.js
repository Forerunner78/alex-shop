const PaymentMethod = ({ paymentMethod }) => {
	return (
		<>
			<h2 className="text-xl md:text-2xl font-bold uppercase mb-2">Payment Method</h2>
			<div>{paymentMethod}</div>
		</>
	);
};

export default PaymentMethod;
