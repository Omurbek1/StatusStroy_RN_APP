declare module 'radio-buttons-react-native';
declare module '*.png' {
  const content: string;
  export default content;
}
declare module '*.png';

declare module '*.jpeg';
declare module '*.jpg';
declare module 'react-native-grid-component';
declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
