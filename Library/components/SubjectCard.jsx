import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function SubjectCard({ subject, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.text}>{subject}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 20,
    backgroundColor: '#6f42c1',
    borderRadius: 12,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
