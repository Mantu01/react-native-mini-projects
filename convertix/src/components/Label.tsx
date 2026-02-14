import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getUnitsByType } from '../lib/constants';

interface LabelProps {
  lableType: 'input' | 'output';
}

const Label = ({ lableType }: LabelProps) => {
  const [isFocus, setIsFocus] = useState(false);

  const {inputValue,outputValue,setInputValue,selectedInputUnit,selectedOutputUnit,setSelectedInputUnit,setSelectedOutputUnit,selectedCategory,selectedInputCurrency,selectedOutputCurrency,setSelectedInputCurrency,setSelectedOutputCurrency,} = useApp();

  if (!selectedCategory) return null;

  const units = getUnitsByType(selectedCategory);
  const isCurrency = selectedCategory === 'currency';
  const isInput = lableType === 'input';

  const label = isInput ? 'From' : 'To';
  const selectedUnit = isInput ? selectedInputUnit : selectedOutputUnit;
  const selectedCurrency = isInput ? selectedInputCurrency : selectedOutputCurrency;

  const handleUnitChange = (item: any) => {
    if (isCurrency) {
      const currency = {
        code: item.label,
        label: item.label,
        flag: item.value,
      };
      if (isInput) {
        setSelectedInputCurrency(currency);
      } else {
        setSelectedOutputCurrency(currency);
      }
    } else {
      if (isInput) {
        setSelectedInputUnit(item.value);
      } else {
        setSelectedOutputUnit(item.value);
      }
    }
    setIsFocus(false);
  };

  const getFlagUrl = () => {
    if (isCurrency && selectedCurrency) {
      return `https://flagsapi.com/${selectedCurrency.flag}/flat/64.png`;
    }
    return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR41JLZkqd7yHG1v_tfkt8RANNR7ZKTLimb7Q&s';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.row}>
        {isCurrency && selectedCurrency && (
          <Image
            source={{ uri: getFlagUrl() }}
            style={styles.flag}
          />
        )}

        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }, isCurrency && { flex: 0.5 }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={units}
          search
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Unit' : '...'}
          searchPlaceholder="Search..."
          value={isCurrency ? selectedCurrency?.code : selectedUnit}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={handleUnitChange}
        />

        {isInput ? (
          <TextInput
            style={[styles.input, isCurrency && { flex: 0.35 }]}
            placeholder="Value"
            keyboardType="decimal-pad"
            value={inputValue}
            onChangeText={setInputValue}
          />
        ) : (
          <View style={[styles.outputBox, isCurrency && { flex: 0.35 }]}>
            <Text style={styles.outputText}>{outputValue}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  flag: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  dropdown: {
    flex: 0.4,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  input: {
    flex: 0.6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  outputBox: {
    flex: 0.6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  outputText: {
    fontSize: 16,
    color: '#333',
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 16,
    height: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
});

export default Label;
