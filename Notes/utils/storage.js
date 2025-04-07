import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'NOTES';

export async function saveNotes(notes) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (e) {
    console.error('Failed to save notes:', e);
  }
}

export async function loadNotes() {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Failed to load notes:', e);
    return [];
  }
}
