const Layout = ({ children, className = "" }) => {
	return (
		<div className={`${className} mt-[20vh] mx-10 lg:mx-[20vw] bg-slate-200 p-10`}>
			{children}
		</div>
	);
};

export default Layout;
