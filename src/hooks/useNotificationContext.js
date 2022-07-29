import { NotificationContext } from '../contexts/NotificationContext';
import { useContext } from 'react';

const useNotificationContext = () => {
	const { handleNotification } = useContext(NotificationContext);

	return handleNotification;
}

export default useNotificationContext;
