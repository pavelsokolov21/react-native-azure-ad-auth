import { useContext } from 'react';
import { AuthContext } from '../context';

export const useCheckLogin = (): boolean => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn;
};
