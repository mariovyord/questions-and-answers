import { useEffect, useState } from "react";

const useIsDesktop = () => {
	const [isDesktop, setDesktop] = useState(window.innerWidth > 768);

	useEffect(() => {
		window.addEventListener("resize", updateMedia);
		return () => window.removeEventListener("resize", updateMedia);
	});

	const updateMedia = () => {
		setDesktop(window.innerWidth > 768);
	};

	return [isDesktop];
}

export default useIsDesktop;