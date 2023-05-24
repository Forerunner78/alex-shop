import Link from "next/link";
import Logo from "../../public/img/logo.jpg";
import Image from "next/image";
import Layout from "./Layout";

const Header = () => {
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
					<Link href="/cart">Cart</Link>
					<Link href="/login">Login</Link>
				</div>
			</Layout>
		</header>
	);
};

export default Header;
