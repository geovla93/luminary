import React from 'react';
import {Blockchain, IBlockchain} from '@itypes/blockchain';
import TextField from '@ui/core/components/TextField';
import {colors} from '@ui/core/theme';
import {useIntl} from 'react-intl';
import {
  FlatList,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

interface IProps {
  nftChains: IBlockchain[];
  onPress: (chain: IBlockchain) => void;
  selected: Blockchain;
}

const RenderItem = ({
  item,
  onPress,
  isSelected,
}: {
  item: IBlockchain;
  onPress: () => void;
  isSelected: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item, isSelected ? styles.selected : {}]}>
      <Image style={styles.image} source={item.image} />
    </TouchableOpacity>
  );
};

const NftChainPicker = ({nftChains, onPress, selected}: IProps) => {
  const {formatMessage} = useIntl();
  return (
    <View style={styles.root}>
      <View style={{flex: 1}}>
        <View style={styles.title}>
          <View style={styles.searchContainer}>
            <TextField
              placeholderTextColor={'#49454F'}
              sx={{color: colors.primary}}
              placeholder={formatMessage({id: 'search'})}
              onChangeText={(_value: string) => {}}
            />
          </View>
        </View>
        <FlatList
          data={nftChains}
          horizontal
          style={styles.content}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <RenderItem
              onPress={() => onPress(item)}
              item={item}
              isSelected={selected === item.shortName}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  content: {},
  item: {
    borderRadius: 15,
    marginRight: 10,
  },
  image: {
    width: 30,
    height: 30,
  },
  searchContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  selected: {
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 40,
  },
});

export default NftChainPicker;
