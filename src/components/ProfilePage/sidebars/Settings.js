import { useState } from 'react';
import ThemeChanger from '../../common/ThemeChanger';


const Settings = () => {
	const [showSettings, setShowSettings] = useState(false);

	return (
		<div>
			<button
				onClick={() => setShowSettings((x) => !x)}
				className='btn btn-warning btn-outline w-full mb-2'
			>
				{showSettings ? 'Close' : 'Settings'}
			</button>
			{showSettings && <div className=''>
				<ThemeChanger />
			</div>}
		</div>
	)
}

export default Settings;