import Link from "next/link";
import Logo from "../../public/img/logo.jpg";
import Image from "next/image";
import Layout from "./Layout";
import { useContext } from "react";
import { Store } from "@/utils/Store";

const Header = () => {
	const { state } = useContext(Store);
	const { cart } = state;
	return (
		<header>
			<Layout>
				<Link href="/">
					<Image
						src={Logo}
						alt="Logo of the website"
						className="absolute rounded-circle"
						width={70}
						height={70}
						priority
					/>
				</Link>
				<span>
					<h1>Alex&apos;s Shop</h1>
				</span>
				<div>
					<Link href="/cart">
						Cart{" "}
						{cart.cartItems.length > 0 && (
							<span>{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</span>
						)}
					</Link>
					<Link href="/login">Login</Link>
				</div>
			</Layout>
		</header>
	);
};

export default Header;
