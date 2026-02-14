import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { UnitType, Currency } from "../lib/constants";
import { convertValue, convertCurrency } from "../lib/calculation";

interface AppContextType {
  selectedCategory: UnitType | null;
  selectedInputUnit: string | null;
  selectedOutputUnit: string | null;
  inputValue: string;
  outputValue: string;
  selectedInputCurrency: Currency | null;
  selectedOutputCurrency: Currency | null;
  setSelectedCategory: (category: UnitType) => void;
  setSelectedInputUnit: (unit: string | null) => void;
  setSelectedOutputUnit: (unit: string | null) => void;
  setInputValue: (value: string) => void;
  setSelectedInputCurrency: (currency: Currency | null) => void;
  setSelectedOutputCurrency: (currency: Currency | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<UnitType | null>(null);
  const [selectedInputUnit, setSelectedInputUnit] = useState<string | null>(null);
  const [selectedOutputUnit, setSelectedOutputUnit] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedInputCurrency, setSelectedInputCurrency] = useState<Currency | null>(null);
  const [selectedOutputCurrency, setSelectedOutputCurrency] = useState<Currency | null>(null);
  const [outputValue, setOutputValue] = useState<string>("0");

  useEffect(() => {
    calculateOutput();
  }, [selectedCategory, selectedInputUnit, selectedOutputUnit, inputValue, selectedInputCurrency, selectedOutputCurrency]);

  const calculateOutput = async (): Promise<void> => {
    if (!selectedCategory || !inputValue) {
      setOutputValue("0");
      return;
    }

    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) {
      setOutputValue("0");
      return;
    }

    if (selectedCategory === "currency") {
      if (!selectedInputCurrency || !selectedOutputCurrency) {
        setOutputValue("0");
        return;
      }
      const result = await convertCurrency(numValue, selectedInputCurrency.code, selectedOutputCurrency.code);
      setOutputValue(result.toFixed(2));
    } else {
      if (!selectedInputUnit || !selectedOutputUnit) {
        setOutputValue("0");
        return;
      }
      const result = convertValue(numValue, selectedCategory, selectedInputUnit, selectedOutputUnit);
      setOutputValue(result.toFixed(6).replace(/\.?0+$/, ""));
    }
  };

  const handleSetCategory = (category: UnitType) => {
    setSelectedCategory(category);
    setSelectedInputUnit(null);
    setSelectedOutputUnit(null);
    setSelectedInputCurrency(null);
    setSelectedOutputCurrency(null);
    setInputValue("");
    setOutputValue("0");
  };

  return (
    <AppContext.Provider
      value={{
        selectedCategory,
        selectedInputUnit,
        selectedOutputUnit,
        inputValue,
        outputValue,
        selectedInputCurrency,
        selectedOutputCurrency,
        setSelectedCategory: handleSetCategory,
        setSelectedInputUnit,
        setSelectedOutputUnit,
        setInputValue,
        setSelectedInputCurrency,
        setSelectedOutputCurrency,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};