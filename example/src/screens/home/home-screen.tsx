import * as React from 'react';
import { Text, View } from 'react-native';
import { useCheckLogin } from 'react-native-azure-ad-auth';
import { Login } from '../../components/login';

export const HomeScreen: React.FC = () => {
  const isLoggedIn = useCheckLogin();

  return (
    <View>
      <Text>Your status is {isLoggedIn ? 'Signed In' : 'Signed Out'}</Text>
      <Login isLoggedIn={isLoggedIn} />
    </View>
  );
};
