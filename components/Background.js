import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Background = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.circle, styles.largeCircle]} />
      <View style={[styles.circle, styles.smallCircle]} />
      {children} 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF4F3',
    borderWidth: 2,
    borderColor: '#009EFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 174, 255, 0.2)',
    borderRadius: 100,
  },
  largeCircle: {
    width: width * 0.25,
    height: width * 0.25,
    maxWidth: 150,
    maxHeight: 150,
    bottom: '5%',
    right: '5%',
  },
  smallCircle: {
    width: width * 0.15,
    height: width * 0.15,
    maxWidth: 100,
    maxHeight: 100,
    bottom: '2%',
    right: '15%',
  },
});

export default Background;
