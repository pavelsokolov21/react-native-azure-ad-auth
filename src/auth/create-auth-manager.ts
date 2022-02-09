import {
  AuthConfiguration as AuthConfigurationType,
  authorize,
  refresh,
} from 'react-native-app-auth';
import dayjs from 'dayjs';
import { Auth } from './enums';
import { UNIT, DURATION } from './constants';
import {
  setAuthElementsToStorage,
  removeAuthElementsFromStorage,
  createExpireDate,
  getValueFromStorage,
} from './auth.helpers';

export type AuthConfiguration = AuthConfigurationType;
export type AuthManagerType = ReturnType<typeof createAuthManager>;

export function createAuthManager(config: AuthConfiguration) {
  return {
    signIn: async () => {
      console.log(authorize);
      const result = await authorize(config);

      setAuthElementsToStorage({
        [Auth.ACCESS_TOKEN]: result.accessToken,
        [Auth.REFRESH_TOKEN]: result.refreshToken,
        [Auth.EXPIRE_TIME]: createExpireDate(DURATION, UNIT),
      });
    },
    signOut: async () => {
      await removeAuthElementsFromStorage([
        Auth.ACCESS_TOKEN,
        Auth.REFRESH_TOKEN,
        Auth.EXPIRE_TIME,
      ]);
    },
    getAccessToken: async () => {
      const expire = await getValueFromStorage(Auth.EXPIRE_TIME);

      if (expire) {
        const now = dayjs();

        if (now.isSame(expire) || now.isAfter(expire)) {
          try {
            const refreshToken = await getValueFromStorage(Auth.REFRESH_TOKEN);
            const result = await refresh(config, {
              refreshToken: refreshToken ?? '',
            });

            setAuthElementsToStorage({
              [Auth.ACCESS_TOKEN]: result.accessToken,
              [Auth.REFRESH_TOKEN]: result.refreshToken ?? '',
              [Auth.EXPIRE_TIME]: createExpireDate(DURATION, UNIT),
            });

            return result.accessToken;
          } catch {
            return null;
          }
        }

        const accessToken = await getValueFromStorage(Auth.ACCESS_TOKEN);

        return accessToken;
      }

      return null;
    },
  };
}
