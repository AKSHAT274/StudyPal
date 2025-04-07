import { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { getResourcesBySubject } from '../utils/api';
import ResourceList from '../components/ResourceList';

export default function ResourceScreen({ route }) {
  const { subject, type } = route.params;
  const [resources, setResources] = useState([]);

  useEffect(() => {
    getResourcesBySubject(subject).then((data) => setResources(data[type]));
  }, []);

  return (
    <View style={styles.container}>
      {resources.length === 0 ? (
        <ActivityIndicator size="large" color="#0d6efd" />
      ) : (
        <ResourceList data={resources} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', // you can change to a light tone like '#f9f9f9'
  },
});
