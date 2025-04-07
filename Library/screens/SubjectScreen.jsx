import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { getSubjects } from '../utils/api';
import SubjectCard from '../components/SubjectCard';

export default function SubjectScreen({ navigation, route }) {
  const { type } = route.params;
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    getSubjects().then(setSubjects);
  }, []);

  return (
    <View>
      {subjects.length === 0 ? (
        <ActivityIndicator size="large" />
      ) : (
        subjects.map((subject, index) => (
          <SubjectCard
            key={index}
            subject={subject}
            onPress={() => navigation.navigate('Resources', { subject, type })}
          />
        ))
      )}
    </View>
  );
}
