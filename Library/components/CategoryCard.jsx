import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CategoryCard({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 20,
    backgroundColor: '#0d6efd',
    borderRadius: 12,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
