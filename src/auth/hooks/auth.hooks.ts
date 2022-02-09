import { useContext } from 'react';
import { AuthContext, AuthContextInterface } from '../context';

export type UseAuth = Pick<
  AuthContextInterface,
  'isLoading' | 'signIn' | 'signOut' | 'error'
>;

export const useAuth = (): UseAuth => {
  const { signIn, signOut, isLoading, error } = useContext(AuthContext);

  return {
    isLoading,
    error,
    signIn,
    signOut,
  };
};
