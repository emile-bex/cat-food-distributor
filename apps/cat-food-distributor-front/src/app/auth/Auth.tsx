import { QRScanner } from './QRScanner';
import { Spinner } from '../components';
import { NotificationAlert } from '../components/NotificationAlert';
import { useAuth } from './useAuth';

export default function Auth() {
  const { isLoading, error } = useAuth();

  if (isLoading) {
    return <Spinner />;
  }

  return (<>
    <QRScanner />
    <NotificationAlert message={error} type="error" />
  </>);
};
