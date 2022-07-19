import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export const isAuth = (Component) => {
	const WrapperComponent = (props) => {
		const { userData } = useAuth();

		return userData
			? <Component {...props} />
			: <Navigate to="/login" />
	}

	return WrapperComponent;
}

export default isAuth;