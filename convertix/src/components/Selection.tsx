import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { getUnitsByType, UnitType } from '../lib/constants';
import { useApp } from '../context/AppContext';

interface SelectionProps {
  selectionType: 'category' | 'inputUnit' | 'outputUnit';
}

const Selection = ({ selectionType }: SelectionProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const { selectedCategory, selectedInputUnit, selectedOutputUnit, setSelectedCategory, setSelectedInputUnit, setSelectedOutputUnit } = useApp();

  const getData = () => {
    if (selectionType === 'category') {
      return getUnitsByType('Cateogy');
    } else if (selectionType === 'inputUnit' && selectedCategory) {
      return getUnitsByType(selectedCategory);
    } else if (selectionType === 'outputUnit' && selectedCategory) {
      return getUnitsByType(selectedCategory);
    }
    return [];
  };

  const getCurrentValue = () => {
    if (selectionType === 'category') return selectedCategory;
    if (selectionType === 'inputUnit') return selectedInputUnit;
    if (selectionType === 'outputUnit') return selectedOutputUnit;
    return null;
  };

  const handleChange = (item: any) => {
    if (selectionType === 'category') {
      setSelectedCategory(item.value);
      setSelectedInputUnit(null);
      setSelectedOutputUnit(null);
    } else if (selectionType === 'inputUnit') {
      setSelectedInputUnit(item.value);
    } else if (selectionType === 'outputUnit') {
      setSelectedOutputUnit(item.value);
    }
    setIsFocus(false);
  };

  const getLabel = () => {
    if (selectionType === 'category') return 'Select Unit Type';
    if (selectionType === 'inputUnit') return 'Select From Unit';
    return 'Select To Unit';
  };

  const data = getData();
  const value = getCurrentValue();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{getLabel()}</Text>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleChange}
      />
    </View>
  );
};

export default Selection;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});