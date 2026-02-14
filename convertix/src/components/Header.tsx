import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Convertix</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems:'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  headerText:{
    fontSize:20,
    fontWeight:'bold'
  }
});

export default Header