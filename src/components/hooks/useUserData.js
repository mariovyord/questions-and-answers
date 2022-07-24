import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

const useUserData = () => {
	const { userData } = useContext(AuthContext);

	return userData;
}

export default useUserData;
