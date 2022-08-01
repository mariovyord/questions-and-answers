import { Navigate } from 'react-router-dom';
import useUserData from '../hooks/useUserData';

export const isGuest = (Component) => {
	const WrapperComponent = (props) => {
		const userData = useUserData();

		return !userData
			? <Component {...props} />
			: <Navigate to="/" />
	}

	return WrapperComponent;
}

export default isGuest;