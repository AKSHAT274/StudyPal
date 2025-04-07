import { FlatList, Text, TouchableOpacity, Linking } from 'react-native';

const getFilename = (url) => {
  try {
    const parts = url.split('/');
    const fileWithExt = parts[parts.length - 1].split('?')[0];
    const withoutExt = fileWithExt.replace(/\.[^/.]+$/, ''); // removes .pdf
    const cleanName = withoutExt.substring(0, withoutExt.lastIndexOf('_')); // removes last _suffix
    return decodeURIComponent(cleanName);
  } catch {
    return 'File';
  }
};



export default function ResourceList({ data }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => Linking.openURL(item)}>
          <Text style={{ margin: 10, color: '#0d6efd' }}>
            {getFilename(item)}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}
