import React, {useMemo} from 'react';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';
import {StyleSheet, View} from 'react-native';
import SquareButton from '@ui/core/components/SquareButton';
import derivationPaths from 'src/blockchain/derivationPath';
import Typography from '@ui/core/components/Typography';

import HandleComponent from '@components/BottomSheetHandler';
import {useIntl} from 'react-intl';
import {Divider} from 'react-native-paper';

interface IProps {
  selectedIndex: number;
  onChangePath: (index: number) => void;
  onClose: () => void;
  bottomSheetRef: any;
}

const RenderItem = ({item, onPress, itemIndex, selected}: any) => {
  return (
    <TouchableOpacity onPress={() => onPress(itemIndex)} style={styles.item}>
      <View style={styles.info}>
        <Typography fontWeight="bold">{item.name}</Typography>
        <Typography variant="bodySmall">{item.path}</Typography>
      </View>
      <View style={styles.isSelected}>
        {selected === itemIndex && (
          <SquareButton icon="check" onPress={() => {}} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const DerivationPathModal = ({
  selectedIndex,
  onChangePath,
  onClose,
  bottomSheetRef,
}: IProps) => {
  const {formatMessage} = useIntl();
  const snapPoints = useMemo(() => ['70%'], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      handleComponent={() => (
        <HandleComponent
          title={formatMessage({id: 'select_derivation_path'})}
          onClose={onClose}
        />
      )}
      handleStyle={styles.handle}
      backgroundStyle={styles.content}
      snapPoints={snapPoints}>
      <BottomSheetView style={styles.btshView}>
        <BottomSheetFlatList
          data={derivationPaths}
          style={styles.list}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={item => {
            return (
              <RenderItem
                item={item.item}
                index={item}
                itemIndex={item.index}
                onPress={(index: number) => onChangePath(index)}
                selected={selectedIndex}
              />
            );
          }}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    backgroundColor: '#2D2A24',
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  handle: {
    display: 'none',
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  info: {},
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  isSelected: {
    alignItems: 'flex-end',
  },
  btshView: {
    flex: 1,
  },
});

export default DerivationPathModal;
