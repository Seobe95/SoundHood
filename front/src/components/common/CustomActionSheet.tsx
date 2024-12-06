import React, { ReactNode, useContext } from 'react';
import { View, StyleSheet, Modal, Pressable, Platform } from 'react-native';
import { ThemeContext } from '@/context/CustomThemeContext.tsx';
import { ColorsType } from '@/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useCustomActionSheetStore from '@/stores/useCustomActionSheetStore.ts';

type CustomActionSheetProps = {
  isOpen: boolean;
  hide: () => void;
  children: ReactNode;
};

function CustomActionSheet({ isOpen, hide, children }: CustomActionSheetProps) {
  const { bottom } = useSafeAreaInsets();
  const theme = useContext(ThemeContext);
  const styles = makeStyle(theme);
  const isAndroid = Platform.OS === 'android';

  return (
    <Modal animationType={'slide'} transparent={true} visible={isOpen}>
      <Pressable onPress={hide} style={styles.transportContainer} />
      <View
        style={[
          styles.bottomSheetContainer,
          { height: 'auto', paddingBottom: isAndroid ? bottom + 16 : bottom },
        ]}>
        {children}
      </View>
    </Modal>
  );
}

const makeStyle = (color: ColorsType) =>
  StyleSheet.create({
    transportContainer: {
      height: '100%',
    },
    bottomSheetContainer: {
      backgroundColor: color.backgroundColorSecondary,
      position: 'absolute',
      width: '100%',
      overflow: 'hidden',
      bottom: 0,
      gap: 16,
      padding: 16,
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
    },
    font: {
      color: color.fontColorPrimary,
      fontSize: 68,
    },
  });

export default CustomActionSheet;
