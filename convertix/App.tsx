import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './src/components/Header';
import Selection from './src/components/Selection';
import Label from './src/components/Label';
import { AppProvider, useApp } from './src/context/AppContext';

function AppContent() {
  const { selectedCategory } = useApp();

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.body}>
        <Selection selectionType="category" />
        {selectedCategory && (
          <View style={styles.valueContainer}>
            <Label lableType="input" />
            <Label lableType="output" />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    paddingVertical: 16,
  },
  valueContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
