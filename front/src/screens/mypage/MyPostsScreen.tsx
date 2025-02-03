import Container from '@/components/common/Container';
import CustomFont from '@/components/common/CustomFont';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface MyPostsScreenProps {}

function MyPostsScreen({}: MyPostsScreenProps) {
  return (
    <Container>
      <CustomFont>내가 등록한 음악</CustomFont>
    </Container>
  );
}

const styles = StyleSheet.create({});

export default MyPostsScreen;
