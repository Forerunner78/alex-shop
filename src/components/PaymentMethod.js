const PaymentMethod = ({ paymentMethod }) => {
	return (
		<>
			<h2 className="text-lg font-bold uppercase mb-2">Payment Method</h2>
			<div>{paymentMethod}</div>
		</>
	);
};

export default PaymentMethod;
