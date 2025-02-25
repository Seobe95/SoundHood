import { ColorsType } from '@/constants';
import { ThemeContext } from '@/context/CustomThemeContext';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface OpensourceItemProps {
  libraryName: string;
  description: string;
  homepage: string;
  licenseContent: string;
}

function OpensourceItem({
  libraryName,
  description,
  homepage,
  licenseContent,
}: OpensourceItemProps) {
  const theme = useContext(ThemeContext);
  const styles = makeStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={[styles.font, styles.libraryNameFont]}>{libraryName}</Text>
      <Text style={[styles.font]}>{homepage}</Text>
      <Text style={[styles.font]}>{description}</Text>
      <Text style={[styles.font]}>{licenseContent}</Text>
    </View>
  );
}

const makeStyles = (color: ColorsType) =>
  StyleSheet.create({
    container: {
      gap: 8,
    },
    font: {
      color: color.fontColorPrimary,
      fontSize: 12,
    },
    libraryNameFont: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default OpensourceItem;
