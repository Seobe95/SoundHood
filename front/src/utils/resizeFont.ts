import { Dimensions } from 'react-native';

const defaultHeight = 852;

const RFValue = (
  fontSize: number,
  safeAreaTop: number,
  standardScreenHeight = defaultHeight,
) => {
  const { height } = Dimensions.get('window');
  const deviceHeight = height - safeAreaTop;
  const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;

  return Math.round(heightPercent);
};
export { RFValue };
