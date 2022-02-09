import dayjs from 'dayjs';
import * as Keychain from 'react-native-keychain';

export const createExpireDate = (duration: number, unit: string): string =>
  dayjs().add(duration, unit).toString();

/**
 * Keychain returns object with "username" and "password" by "service" or false.
 * In our case, "username" is useless, "service" is a key.
 * Keychain.getGenericPassword may return "false". We need to check it on an object.
 *
 * See more here: https://github.com/oblador/react-native-keychain#api
 */
export const getValueFromStorage = async (
  service: string
): Promise<string | null> => {
  const storage = await Keychain.getGenericPassword({
    service,
  });

  return typeof storage === 'object' ? storage.password : null;
};

// There is the parameter "service" is used instead of key in the Keychain.setGenericPassword.
export const setAuthElementsToStorage = (
  authElements: Record<string, string>
) => {
  Object.keys(authElements).map(async (authElementKey) => {
    await Keychain.setGenericPassword(
      authElementKey,
      authElements[authElementKey],
      {
        service: authElementKey,
      }
    );
  });
};

export const removeAuthElementsFromStorage = async (authElements: string[]) => {
  const promises = authElements.map((service) => {
    return Keychain.resetGenericPassword({
      service,
    });
  });

  await Promise.all(promises);
};
