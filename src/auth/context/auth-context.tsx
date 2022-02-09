import React, { FC, useEffect, useState } from 'react';
import type { AuthManagerType } from '../create-auth-manager';

export interface AuthContextInterface {
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextInterface>(
  {} as AuthContextInterface
);

export interface AuthProps {
  AuthManager: AuthManagerType;
}

export const Provider: FC<AuthProps> = ({ children, AuthManager }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);

    AuthManager.getAccessToken()
      .then((token) => {
        if (token) {
          setIsLoggedIn(true);
        }
      })
      .catch(() => setError('Error due getting an access token'))
      .finally(() => setIsLoading(false));
  }, [AuthManager]);

  const signIn = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await AuthManager.signIn();

      setIsLoggedIn(true);
    } catch (err) {
      console.error(err);
      setError('Error due sign in');
    }

    setIsLoading(false);
  };

  const signOut = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await AuthManager.signOut();

      setIsLoggedIn(false);
    } catch {
      setError('Error due sign out');
    }

    setIsLoading(false);
  };

  const value = {
    isLoggedIn,
    isLoading,
    error,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
