import {
  createAuthManager,
  AuthConfiguration,
} from 'react-native-azure-ad-auth-2';

export const authConfig: AuthConfiguration = {
  clientId: 'a5dde74c-5a29-43fc-a43c-df766dc6a230',
  redirectUrl: 'bakplan://bakplan-auth/',
  scopes: ['openid', 'offline_access', 'profile'],
  additionalParameters: { prompt: 'select_account' },
  serviceConfiguration: {
    authorizationEndpoint:
      'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    tokenEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
  },
};

export const AuthManager = createAuthManager(authConfig);
