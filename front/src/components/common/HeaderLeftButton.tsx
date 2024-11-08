import React from 'react';
import { Button, StyleSheet } from 'react-native';
import {
  HeaderBackButton,
  HeaderBackButtonProps,
} from '@react-navigation/elements';

function HeaderLeftButton({ style, ...props }: HeaderBackButtonProps) {
  return <HeaderBackButton {...props} style={[style]} label={props.label} />;
}

const styles = StyleSheet.create({});

export default HeaderLeftButton;
