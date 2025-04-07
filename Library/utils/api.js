const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getSubjects = async () => {
  const res = await fetch(`${API_URL}/subjects`);
  return res.json();
};

export const getResourcesBySubject = async (subject) => {
  const res = await fetch(`${API_URL}/resources/${subject}`);
  return res.json();
};