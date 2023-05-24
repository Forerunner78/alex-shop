import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import { Roboto } from "next/font/google";
import Head from "next/head";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export default function App({ Component, pageProps }) {
	return (
		<>
			<main className={roboto.className}>
				<Head>
					<title>Alex&apos;s Shop</title>
					<meta name="description" content="Ecommerce website built with MERN" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Header />
				<Layout>
					<Component {...pageProps} />
				</Layout>

				<Footer />
			</main>
		</>
	);
}
