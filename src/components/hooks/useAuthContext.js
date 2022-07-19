import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

const useAuthContext = () => {
	const { userData } = useContext(AuthContext);
	return userData;
}

export default useAuthContext;
