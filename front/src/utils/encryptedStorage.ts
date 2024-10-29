import EncryptedStorage from 'react-native-encrypted-storage';

const storeEncryptedStorage = async <T>(key: string, value: T) => {
  try {
    const stringifyValue = JSON.stringify(value);
    await EncryptedStorage.setItem(key, stringifyValue);
  } catch (error) {
    console.log(error);
  }
};

const removeEncryptedStorage = async (key: string) => {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

const getEncryptedStorage = async (key: string): Promise<string | null> => {
  try {
    const result = await EncryptedStorage.getItem(key);
    if (result) {
      return JSON.parse(result);
    }
    return null;
  } catch (error) {
    return null;
  }
};

export { storeEncryptedStorage, removeEncryptedStorage, getEncryptedStorage };
