import Link from "next/link";
import { useRouter } from "next/router";

const Unauthorized = () => {
	const router = useRouter();
	const { message } = router.query;
	return (
		<>
			<h1>Access Denied</h1>
			{message && <div>{message}</div>}
			<Link href="/login">Click here to login!</Link>
		</>
	);
};

export default Unauthorized;
