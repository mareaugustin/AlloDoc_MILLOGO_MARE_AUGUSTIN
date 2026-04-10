import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (error) {
    console.log('Erreur sauvegarde token:', error);
  }
};

export const getData = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log('Erreur lecture token:', error);
  }
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('Erreur suppression token:', error);
  }
};