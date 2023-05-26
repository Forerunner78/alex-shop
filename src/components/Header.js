import Link from "next/link";
import Logo from "../../public/img/logo.jpg";
import Image from "next/image";
import Layout from "./Layout";
import { useContext, useEffect, useState } from "react";
import { Store } from "@/utils/Store";
import { useSession } from "next-auth/react";

const Header = () => {
	const { status, data: session } = useSession();
	const { state } = useContext(Store);
	const { cart } = state;
	const [cartItemsCount, setCartItemsCount] = useState(0);

	useEffect(() => {
		setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
	}, [cart.cartItems]);

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
						Cart {cartItemsCount > 0 && <span>{cartItemsCount}</span>}
					</Link>

					{status === "loading" ? (
						"Loading"
					) : session?.user ? (
						"Welcome" + " " + session.user.name + "!"
					) : (
						<Link href="/login">Login</Link>
					)}
				</div>
			</Layout>
		</header>
	);
};

export default Header;
