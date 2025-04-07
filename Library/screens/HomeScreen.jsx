import { View, FlatList } from 'react-native';
import { categories } from '../constants/categories';
import CategoryCard from '../components/CategoryCard';

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <CategoryCard
            title={item.title}
            onPress={() => navigation.navigate('Subjects', { type: item.key })}
          />
        )}
      />
    </View>
  );
}
