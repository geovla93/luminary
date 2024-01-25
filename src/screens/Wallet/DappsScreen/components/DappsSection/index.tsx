import React from 'react';
import {ScrollView, View} from 'react-native';
import DappsSectionItem from '../DappSectionItem';
import {Typography} from '@ui/core/components';
import {IDapp} from '@itypes/dapps';
const DappsSection = ({
  title,
  items,
  openDapp,
}: {
  title: string;
  items: IDapp[];
  openDapp: (dapp: IDapp) => void;
}) => {
  return (
    <View style={styles.root}>
      <Typography
        variant="bodyLarge"
        fontWeight="bold"
        sx={{fontSize: 22, color: 'white'}}>
        {title}
      </Typography>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.sectionRoot}>
        {items.map((item: IDapp) => (
          <DappsSectionItem
            key={`${item.id}-${title}`}
            item={item}
            openDapp={openDapp}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = {
  root: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  sectionRoot: {
    marginVertical: 10,
  },
};

export default DappsSection;
