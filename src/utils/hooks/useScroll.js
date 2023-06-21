import { useEffect, useState } from "react";

export const useScroll = () => {
	const [scrollPosition, setScrollPosition] = useState(0);
	const [scrolled, isScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const position = window.scrollY;
			setScrollPosition(position);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		if (scrollPosition > 0) {
			isScrolled(true);
		} else {
			isScrolled(false);
		}
	}, [scrollPosition]);

	return scrolled;
};
