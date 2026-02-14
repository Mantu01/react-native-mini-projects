import { UnitType } from "./constants";

const lengthToMeters: { [key: string]: number } = {
  meter: 1,
  kilometer: 1000,
  centimeter: 0.01,
  millimeter: 0.001,
  mile: 1609.34,
  yard: 0.9144,
  foot: 0.3048,
  inch: 0.0254,
};

const massToGrams: { [key: string]: number } = {
  gram: 1,
  kilogram: 1000,
  milligram: 0.001,
  pound: 453.592,
  ounce: 28.3495,
};

const timeToSeconds: { [key: string]: number } = {
  millisecond: 0.001,
  second: 1,
  minute: 60,
  hour: 3600,
  day: 86400,
};

const volumeToLiters: { [key: string]: number } = {
  liter: 1,
  milliliter: 0.001,
  cubic_meter: 1000,
  cubic_centimeter: 0.001,
  gallon: 3.78541,
  pint: 0.473176,
  cup: 0.236588,
};

export async function convertCurrency(value: number, fromCode: string, toCode: string): Promise<number> {
  const fromCodeLower = fromCode.toLowerCase();
  
  const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCodeLower}.json`);
  const data = await response.json();
  const rates = data[fromCodeLower];
  
  if (!rates || !rates[toCode.toLowerCase()]) {
    return 0;
  }
  
  return value * rates[toCode.toLowerCase()];
}

export function convertValue(value: number, type: UnitType, fromUnit: string, toUnit: string): number {
  if (!value || isNaN(value)) return 0;

  if (type === 'length') {
    const meters = value * (lengthToMeters[fromUnit] || 1);
    return meters / (lengthToMeters[toUnit] || 1);
  } else if (type === 'mass') {
    const grams = value * (massToGrams[fromUnit] || 1);
    return grams / (massToGrams[toUnit] || 1);
  } else if (type === 'temperature') {
    return convertTemperature(value, fromUnit, toUnit);
  } else if (type === 'time') {
    const seconds = value * (timeToSeconds[fromUnit] || 1);
    return seconds / (timeToSeconds[toUnit] || 1);
  } else if (type === 'volume') {
    const liters = value * (volumeToLiters[fromUnit] || 1);
    return liters / (volumeToLiters[toUnit] || 1);
  }

  return 0;
}

function convertTemperature(value: number, fromUnit: string, toUnit: string): number {
  let celsius = value;

  if (fromUnit === 'fahrenheit') {
    celsius = (value - 32) * (5 / 9);
  } else if (fromUnit === 'kelvin') {
    celsius = value - 273.15;
  }

  if (toUnit === 'fahrenheit') {
    return celsius * (9 / 5) + 32;
  } else if (toUnit === 'kelvin') {
    return celsius + 273.15;
  }

  return celsius;
}