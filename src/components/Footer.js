import Layout from "./Layout";

const Footer = () => {
	return (
		<footer>
			<Layout>
				<div>Copyright &copy; {new Date().getFullYear()} - Alex&apos;s Shop</div>
			</Layout>
		</footer>
	);
};

export default Footer;
