import { Navigate } from 'react-router-dom';
import useNotificationContext from '../hooks/useNotificationContext';
import useUserData from '../hooks/useUserData';

export const isAuth = (Component) => {
	const WrapperComponent = (props) => {
		const userData = useUserData();
		const handleNotifications = useNotificationContext();

		if (!userData) {
			handleNotifications('warning', 'Please login.')
		}

		return userData
			? <Component {...props} />
			: <Navigate to="/auth" />
	}

	return WrapperComponent;
}

export default isAuth;