import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import { StoreProvider } from "@/utils/Store";
import { SessionProvider } from "next-auth/react";
import { Roboto } from "next/font/google";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export default function App({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<>
			<main className={roboto.className}>
				<Head>
					<title>Alex&apos;s Shop</title>
					<meta name="description" content="Ecommerce website built with MERN" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<SessionProvider session={session}>
					<StoreProvider>
						<ToastContainer limit={1} />
						<Header />
						<Layout>
							<Component {...pageProps} />
						</Layout>

						<Footer />
					</StoreProvider>
				</SessionProvider>
			</main>
		</>
	);
}
