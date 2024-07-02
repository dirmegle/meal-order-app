import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContextValue } from '../../../store/ToastContext';
import SuccessIcon from '../../../assets/icons/toast/infoOutline.svg?react';

interface RegistrationToastHandlerProps {
  addToast: ToastContextValue['addToast'];
}

export default function RegistrationToastHandler({ addToast }: RegistrationToastHandlerProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const toastShownRef = useRef(false);

  useEffect(() => {
    if (location.state && !toastShownRef.current) {
      addToast({
        icon: <SuccessIcon />,
        children: 'Your account has been created, you can now log in.',
        toastType: 'success',
        onClose: () => {
          toastShownRef.current = false;
        },
      });

      toastShownRef.current = true;

      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location, addToast, navigate]);
  return null;
}
