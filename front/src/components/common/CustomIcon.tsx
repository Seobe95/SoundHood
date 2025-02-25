import { StyleSheet } from 'react-native';
import { IconButtonProps } from 'react-native-vector-icons/Icon';
import Icon from 'react-native-vector-icons/Ionicons';

interface CustomIconProps extends IconButtonProps {}

function CustomIcon({ ...props }: CustomIconProps) {
  return <Icon {...props} />;
}

const styles = StyleSheet.create({});

export default CustomIcon;
