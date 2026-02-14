export interface Item{
    label: string;
    value: string;
}

export interface Currency {
    code: string;
    label: string;
    flag: string;
}

export type UnitType = 'Cateogy' | 'length' | 'mass' | 'temperature' | 'time' | 'volume' | 'currency';

export const UnitTypes: Item[] = [
  { label: 'Length', value: 'length' },
  { label: 'Mass', value: 'mass' },
  { label: 'Temperature', value: 'temperature' },
  { label: 'Time', value: 'time' },
  { label: 'Volume', value: 'volume' },
  { label: 'Currency', value: 'currency' },
];

export const lengthUnits: Item[] = [
  { label: 'Meter', value: 'meter' },
  { label: 'Kilometer', value: 'kilometer' },
  { label: 'Centimeter', value: 'centimeter' },
  { label: 'Millimeter', value: 'millimeter' },
  { label: 'Mile', value: 'mile' },
  { label: 'Yard', value: 'yard' },
  { label: 'Foot', value: 'foot' },
  { label: 'Inch', value: 'inch' },
];

export const massUnits: Item[] = [
  { label: 'Gram', value: 'gram' },
  { label: 'Kilogram', value: 'kilogram' },
  { label: 'Milligram', value: 'milligram' },
  { label: 'Pound', value: 'pound' },
  { label: 'Ounce', value: 'ounce' },
];

export const temperatureUnits: Item[] = [
  { label: 'Celsius', value: 'celsius' },
  { label: 'Fahrenheit', value: 'fahrenheit' },
  { label: 'Kelvin', value: 'kelvin' },
];

export const timeUnits: Item[] = [
  {label:'Millisecond', value:'millisecond'},
  { label: 'Second', value: 'second' },
  { label: 'Minute', value: 'minute' },
  { label: 'Hour', value: 'hour' },
  { label: 'Day', value: 'day' },
];

export const volumeUnits: Item[] = [
  { label: 'Liter', value: 'liter' },
  { label: 'Milliliter', value: 'milliliter' },
  { label: 'Cubic Meter', value: 'cubic_meter' },
  { label: 'Cubic Centimeter', value: 'cubic_centimeter' },
  { label: 'Gallon', value: 'gallon' },
  { label: 'Pint', value: 'pint' },
  { label: 'Cup', value: 'cup' },
];

export const countryList: Item[] = [
  { label: "AED", value: "AE" },
  { label: "AFN", value: "AF" },
  { label: "XCD", value: "AG" },
  { label: "ALL", value: "AL" },
  { label: "AMD", value: "AM" },
  { label: "ANG", value: "AN" },
  { label: "AOA", value: "AO" },
  { label: "AQD", value: "AQ" },
  { label: "ARS", value: "AR" },
  { label: "AUD", value: "AU" },
  { label: "AZN", value: "AZ" },
  { label: "BAM", value: "BA" },
  { label: "BBD", value: "BB" },
  { label: "BDT", value: "BD" },
  { label: "XOF", value: "BE" },
  { label: "BGN", value: "BG" },
  { label: "BHD", value: "BH" },
  { label: "BIF", value: "BI" },
  { label: "BMD", value: "BM" },
  { label: "BND", value: "BN" },
  { label: "BOB", value: "BO" },
  { label: "BRL", value: "BR" },
  { label: "BSD", value: "BS" },
  { label: "NOK", value: "BV" },
  { label: "BWP", value: "BW" },
  { label: "BYR", value: "BY" },
  { label: "BZD", value: "BZ" },
  { label: "CAD", value: "CA" },
  { label: "CDF", value: "CD" },
  { label: "XAF", value: "CF" },
  { label: "CHF", value: "CH" },
  { label: "CLP", value: "CL" },
  { label: "CNY", value: "CN" },
  { label: "COP", value: "CO" },
  { label: "CRC", value: "CR" },
  { label: "CUP", value: "CU" },
  { label: "CVE", value: "CV" },
  { label: "CYP", value: "CY" },
  { label: "CZK", value: "CZ" },
  { label: "DJF", value: "DJ" },
  { label: "DKK", value: "DK" },
  { label: "DOP", value: "DO" },
  { label: "DZD", value: "DZ" },
  { label: "ECS", value: "EC" },
  { label: "EEK", value: "EE" },
  { label: "EGP", value: "EG" },
  { label: "ETB", value: "ET" },
  { label: "EUR", value: "FR" },
  { label: "FJD", value: "FJ" },
  { label: "FKP", value: "FK" },
  { label: "GBP", value: "GB" },
  { label: "GEL", value: "GE" },
  { label: "GGP", value: "GG" },
  { label: "GHS", value: "GH" },
  { label: "GIP", value: "GI" },
  { label: "GMD", value: "GM" },
  { label: "GNF", value: "GN" },
  { label: "GTQ", value: "GT" },
  { label: "GYD", value: "GY" },
  { label: "HKD", value: "HK" },
  { label: "HNL", value: "HN" },
  { label: "HRK", value: "HR" },
  { label: "HTG", value: "HT" },
  { label: "HUF", value: "HU" },
  { label: "IDR", value: "ID" },
  { label: "ILS", value: "IL" },
  { label: "INR", value: "IN" },
  { label: "IQD", value: "IQ" },
  { label: "IRR", value: "IR" },
  { label: "ISK", value: "IS" },
  { label: "JMD", value: "JM" },
  { label: "JOD", value: "JO" },
  { label: "JPY", value: "JP" },
  { label: "KES", value: "KE" },
  { label: "KGS", value: "KG" },
  { label: "KHR", value: "KH" },
  { label: "KMF", value: "KM" },
  { label: "KPW", value: "KP" },
  { label: "KRW", value: "KR" },
  { label: "KWD", value: "KW" },
  { label: "KYD", value: "KY" },
  { label: "KZT", value: "KZ" },
  { label: "LAK", value: "LA" },
  { label: "LBP", value: "LB" },
  { label: "LKR", value: "LK" },
  { label: "LRD", value: "LR" },
  { label: "LSL", value: "LS" },
  { label: "LTL", value: "LT" },
  { label: "LVL", value: "LV" },
  { label: "LYD", value: "LY" },
  { label: "MAD", value: "MA" },
  { label: "MDL", value: "MD" },
  { label: "MGA", value: "MG" },
  { label: "MKD", value: "MK" },
  { label: "MMK", value: "MM" },
  { label: "MNT", value: "MN" },
  { label: "MOP", value: "MO" },
  { label: "MRO", value: "MR" },
  { label: "MTL", value: "MT" },
  { label: "MUR", value: "MU" },
  { label: "MVR", value: "MV" },
  { label: "MWK", value: "MW" },
  { label: "MXN", value: "MX" },
  { label: "MYR", value: "MY" },
  { label: "MZN", value: "MZ" },
  { label: "NAD", value: "NA" },
  { label: "XPF", value: "NC" },
  { label: "NGN", value: "NG" },
  { label: "NIO", value: "NI" },
  { label: "NPR", value: "NP" },
  { label: "NZD", value: "NZ" },
  { label: "OMR", value: "OM" },
  { label: "PAB", value: "PA" },
  { label: "PEN", value: "PE" },
  { label: "PGK", value: "PG" },
  { label: "PHP", value: "PH" },
  { label: "PKR", value: "PK" },
  { label: "PLN", value: "PL" },
  { label: "PYG", value: "PY" },
  { label: "QAR", value: "QA" },
  { label: "RON", value: "RO" },
  { label: "RSD", value: "RS" },
  { label: "RUB", value: "RU" },
  { label: "RWF", value: "RW" },
  { label: "SAR", value: "SA" },
  { label: "SBD", value: "SB" },
  { label: "SCR", value: "SC" },
  { label: "SDG", value: "SD" },
  { label: "SEK", value: "SE" },
  { label: "SGD", value: "SG" },
  { label: "SKK", value: "SK" },
  { label: "SLL", value: "SL" },
  { label: "SOS", value: "SO" },
  { label: "SRD", value: "SR" },
  { label: "STD", value: "ST" },
  { label: "SVC", value: "SV" },
  { label: "SYP", value: "SY" },
  { label: "SZL", value: "SZ" },
  { label: "THB", value: "TH" },
  { label: "TJS", value: "TJ" },
  { label: "TMT", value: "TM" },
  { label: "TND", value: "TN" },
  { label: "TOP", value: "TO" },
  { label: "TRY", value: "TR" },
  { label: "TTD", value: "TT" },
  { label: "TWD", value: "TW" },
  { label: "TZS", value: "TZ" },
  { label: "UAH", value: "UA" },
  { label: "UGX", value: "UG" },
  { label: "USD", value: "US" },
  { label: "UYU", value: "UY" },
  { label: "UZS", value: "UZ" },
  { label: "VEF", value: "VE" },
  { label: "VND", value: "VN" },
  { label: "VUV", value: "VU" },
  { label: "YER", value: "YE" },
  { label: "ZAR", value: "ZA" },
  { label: "ZMK", value: "ZM" },
  { label: "ZWD", value: "ZW" },
];


export function getUnitsByType(type:UnitType ): Item[] {
  switch (type) {
    case 'Cateogy':
      return UnitTypes;
    case 'length':
      return lengthUnits;
    case 'mass':
      return massUnits;
    case 'temperature':
      return temperatureUnits;
    case 'time':
      return timeUnits;
    case 'volume':
      return volumeUnits;
    case 'currency':
      return countryList;
    default:
      return UnitTypes;
  }
}