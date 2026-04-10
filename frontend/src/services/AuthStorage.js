import * as Keychain from 'react-native-keychain';

export const saveToken = async (token) => {
  try {
    await Keychain.setGenericPassword('@_auth_token_rdv', token);
  } catch (error) {
    console.log('Erreur sauvegarde token:', error);
  }
};

export const getToken = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return credentials.password;
    }
    return null;
  } catch (error) {
    console.log('Erreur récupération token:', error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await Keychain.resetGenericPassword();
  } catch (error) {
    console.log('Erreur suppression token:', error);
  }
};
