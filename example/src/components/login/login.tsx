import * as React from 'react';
import { Button, Text, View, ViewProps } from 'react-native';
import { useAuth } from 'react-native-azure-ad-auth';
import styles from './login.styles';

interface Props extends ViewProps {
  isLoggedIn: boolean;
}

export const Login: React.FC<Props> = ({ isLoggedIn, style }) => {
  const { signIn, signOut, isLoading, error } = useAuth();

  if (isLoading) {
    return (
      <View style={style}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={style}>
      {error && <Text style={styles.error}>{error}</Text>}
      {isLoggedIn ? (
        <Button title="Sign Out" onPress={signOut} />
      ) : (
        <Button title="Sign In" onPress={signIn} />
      )}
    </View>
  );
};
