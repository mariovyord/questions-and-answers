import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

const useUserDataContext = () => {
	const { userData } = useContext(AuthContext);

	return userData;
}

export default useUserDataContext;
