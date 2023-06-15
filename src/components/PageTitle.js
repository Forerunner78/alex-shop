const PageTitle = ({ className = "", title }) => {
	return (
		<h1 className={`text-3xl md:text-4xl font-bold text-center mb-10 ${className}`}>{title}</h1>
	);
};

export default PageTitle;
