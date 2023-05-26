import Link from "next/link";
import Logo from "../../public/img/logo.jpg";
import Image from "next/image";
import Layout from "./Layout";
import { useContext, useEffect, useState } from "react";
import { Store } from "@/utils/Store";
import { signOut, useSession } from "next-auth/react";
import { Menu } from "@headlessui/react";
import DropDownLink from "./DropDownLink";
import Cookies from "js-cookie";

const Header = () => {
	const { status, data: session } = useSession();
	const { state, dispatch } = useContext(Store);
	const { cart } = state;
	const [cartItemsCount, setCartItemsCount] = useState(0);

	useEffect(() => {
		setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
	}, [cart.cartItems]);

	const logoutClickHandler = () => {
		Cookies.remove("cart");
		dispatch({ type: "CART_RESET" });
		signOut({ callbackUrl: "/login" });
	};

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
						<Menu as="div">
							<Menu.Button>{session.user.name}</Menu.Button>
							<Menu.Items>
								<Menu.Item>
									<DropDownLink href="/profile">Profile</DropDownLink>
								</Menu.Item>
								<Menu.Item>
									<DropDownLink href="/order-history">Order History</DropDownLink>
								</Menu.Item>
								<Menu.Item>
									<a href="#" onClick={logoutClickHandler}>
										Logout
									</a>
								</Menu.Item>
							</Menu.Items>
						</Menu>
					) : (
						<Link href="/login">Login</Link>
					)}
				</div>
			</Layout>
		</header>
	);
};

export default Header;
