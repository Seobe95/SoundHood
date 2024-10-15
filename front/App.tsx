import React from 'react';
import {Platform, SafeAreaView, StyleSheet, Text} from 'react-native';
import Config from 'react-native-config';

function App() {
  const test = Config.DEVICE_UUID ?? 'none';
  return (
    <SafeAreaView>
      <Text style={styles.text}>{test}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Platform.OS === 'android' ? 'black' : 'white',
  },
});

export default App;
