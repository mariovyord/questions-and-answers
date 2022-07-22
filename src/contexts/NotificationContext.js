import { createContext, useCallback, useEffect, useState } from "react";

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
	const [notification, setNotification] = useState('Hello World');
	const [type, setType] = useState('alert');

	const handleNotification = (type, value) => {
		setType(type);
		setNotification(value);
	}

	const handleHide = () => {
		setType('alert');
		setNotification('');
	}

	const autoHide = useCallback(() => {
		setTimeout(() => {
			handleHide();
		}, 3000)
	}, [])

	useEffect(() => {
		if (notification) {
			autoHide()
		}
	}, [notification, autoHide])

	const icons = {
		alert: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
		info: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
		success: <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
		warning: <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
		error: <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
	}

	const notificationBody = <>
		<div onClick={handleHide} className="flex justify-center w-full pt-16 fixed z-50">
			<div class={`alert ${`alert-${type}`} shadow-lg  max-w-md`}>
				<div>
					{icons[type]}
					<span>{notification}</span>
				</div>
			</div>
		</div>
	</>

	return (
		<NotificationContext.Provider value={{ handleNotification }}>
			{notification && notificationBody}
			{children}
		</NotificationContext.Provider>
	)
}