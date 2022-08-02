import React, { useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
	const [visible, setVisible] = useState(false)

	const toggleVisible = () => {
		const scrolled = document.documentElement.scrollTop;
		if (scrolled > 300) {
			setVisible(true)
		}
		else if (scrolled <= 300) {
			setVisible(false)
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};

	window.addEventListener('scroll', toggleVisible);

	return (
		visible && <button
			onClick={scrollToTop}
			className={`fixed bottom-6 right-20 btn-circle text-5xl leading-20 tooltip tooltip-top text-primary`}
			data-tip='Back to top'
		>
			<FaArrowCircleUp />
		</button>
	);
}

export default ScrollToTopButton;
