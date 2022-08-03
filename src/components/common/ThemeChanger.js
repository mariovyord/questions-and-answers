import { useEffect } from 'react';
import { themeChange } from 'theme-change';

const ThemeChanger = () => {
	useEffect(() => {
		// Needed for the theme change lib to work!
		themeChange(false);
	});
	return (
		<div className='p-2'>
			<h3 className='text-xl font-bold'>Select theme</h3>
			<div className='flex py-2 gap-2'>
				<button className='btn btn-outline' data-set-theme="dark" data-act-class="btn-success">Dark</button>
				<button className='btn btn-outline' data-set-theme="cmyk" data-act-class="btn-success">Light</button>
			</div>
		</div>
	)
}

export default ThemeChanger