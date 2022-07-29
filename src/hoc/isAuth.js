import { Navigate } from 'react-router-dom';
import useUserData from '../hooks/useUserData';

export const isAuth = (Component) => {
	const WrapperComponent = (props) => {
		const userData = useUserData();

		return userData
			? <Component {...props} />
			: <Navigate to="/auth" />
	}

	return WrapperComponent;
}

export default isAuth;