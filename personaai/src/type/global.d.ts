export {};

declare global {
  interface RootStackParamList {
    Home:undefined;
    Chat: {
      key:string;
      name: string;
      role: string;
      image: string;
    };
    [key: string]: undefined | object;
  }
}