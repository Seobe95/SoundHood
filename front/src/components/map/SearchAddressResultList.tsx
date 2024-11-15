import React, { useContext } from 'react';
import { View, StyleSheet, Keyboard, FlatList, Text } from 'react-native';
import SearchBar from '@/components/post/SearchInput.tsx';
import useKakaoRestAPI from '@/hooks/queries/useKakaoRestAPI.ts';
import {
  ColorsType,
  postStackNavigations,
  rootStackNavigations,
} from '@/constants';
import { ThemeContext } from '@/context/CustomThemeContext.tsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AddressResultItem from '@/components/map/AddressResultItem.tsx';
import { CompositeScreenProps, useNavigation } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigators/root/RootNavigator.tsx';
import { PostStackParamList } from '@/navigators/post/PostNavigator.tsx';

type SearchAddressNavigate = CompositeScreenProps<
  StackScreenProps<RootStackParamList, typeof rootStackNavigations.MAIN_TAP>,
  StackScreenProps<PostStackParamList, typeof postStackNavigations.SEARCH>
>;

function SearchAddressResultList() {
  const { searchAddressQuery } = useKakaoRestAPI();
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const theme = useContext(ThemeContext);
  const styles = makeStyles(theme, top);
  return (
    <FlatList
      data={searchAddressQuery.data?.documents || []}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <SearchBar
            placeholder="음악이 궁금한 동네를 검색해보세요!"
            onChangeText={searchAddressQuery.onChangeText}
          />
        </View>
      }
      renderItem={({ item }) => {
        const addressName = item.address.address_name;
        const location = {
          latitude: parseFloat(item.address.y),
          longitude: parseFloat(item.address.x),
        };
        return (
          <AddressResultItem
            addressName={addressName}
            onPress={() => {
              navigation.replace('MainTapNavigator', {
                screen: 'Map',
                params: {
                  ...location,
                  addressName,
                },
              });
            }}
          />
        );
      }}
      stickyHeaderIndices={[0]}
      onScrollBeginDrag={() => Keyboard.dismiss()}
    />
  );
}

const makeStyles = (color: ColorsType, top = 0) =>
  StyleSheet.create({
    headerContainer: {
      backgroundColor: color.backgroundColor,
      paddingHorizontal: 16,
      paddingBottom: 8,
    },
    separator: {
      borderTopWidth: 0.5,
      borderColor: color.fontColorSecondary,
    },
  });

export default SearchAddressResultList;
