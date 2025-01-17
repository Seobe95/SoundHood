import Container from '@/components/common/Container';
import OpensourceItem from '@/components/mypage/OpensourceItem';
import { opensourceLists } from '@/constants/opensourceLibrary';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

interface OpenSourceInformationScreenProps {}

function OpenSourceInformationScreen({}: OpenSourceInformationScreenProps) {
  return (
    <Container>
      <FlatList
        data={opensourceLists}
        renderItem={({ item }) => {
          const { libraryName, _description, homepage, _licenseContent } = item;
          return (
            <OpensourceItem
              libraryName={libraryName}
              description={_description}
              homepage={homepage}
              licenseContent={_licenseContent}
            />
          );
        }}
      />
    </Container>
  );
}

const styles = StyleSheet.create({});

export default OpenSourceInformationScreen;
