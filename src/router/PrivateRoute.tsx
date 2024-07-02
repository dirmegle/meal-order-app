import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { getUser } from '../utils/authorizeUser';

interface PrivateRouteProp {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProp) {
  const user = getUser();

  return user ? children : <Navigate to="/login" />;
}
