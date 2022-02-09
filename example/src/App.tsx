import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider as AuthProvider } from 'react-native-azure-ad-auth-2';
import { AuthManager } from './auth';
import { HomeScreen } from './screens/home';

export default function App() {
  return (
    <AuthProvider AuthManager={AuthManager}>
      <View style={styles.container}>
        <HomeScreen />
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
