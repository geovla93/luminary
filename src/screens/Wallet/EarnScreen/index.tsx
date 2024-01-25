import React from 'react';
import {useNavigation} from '@react-navigation/native';
import NftSlider from '../../../components/NftSlider';
import {Typography} from '@ui/core/components';
import {View, StyleSheet, SafeAreaView, Image, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-paper';
// import LottieView from 'lottie-react-native';

const EarnScreen = () => {
  const navigation = useNavigation<any>();
  const [isClaiming, setIsClaiming] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);

  const handleClaim = () => {
    setIsClaiming(true);
    setTimeout(() => {
      setCompleted(true);
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    }, 3000);
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <Typography
        sx={{fontWeight: 'bold', marginVertical: 10}}
        variant="titleLarge"
        textAlign="center">
        Earn
      </Typography> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.nftContainer}>
          <Image
            source={{
              uri: 'https://iluminary.ai/wp-content/uploads/2023/06/creative_conclave.jpg',
            }}
            style={styles.nftImage}
          />
          <LinearGradient
            colors={['#6b411d', '#b3812d', '#e3c426']}
            style={styles.nftTitle}>
            <Image
              source={require('./logo.png')}
              style={{width: 25, height: 25, marginRight: 5}}
            />
            <Typography variant="titleSmall">iLuminary</Typography>
          </LinearGradient>
          <LinearGradient
            colors={['#6b411d', '#b3812d', '#e3c426']}
            style={styles.aprContainer}>
            <Typography sx={styles.apr} variant="bodyLarge">
              APR +30%
            </Typography>
          </LinearGradient>
        </View>

        <View style={styles.actionClaimable}>
          <Typography variant="bodyMedium">
            Claimable
            <Typography variant="bodyMedium" sx={{fontWeight: 'bold'}}>
              {' '}
              688.35 ILMT
            </Typography>
          </Typography>
        </View>
        <View style={{marginHorizontal: 10}}>
          <NftSlider title="Your Staked Collectibles" />
        </View>
        <View style={styles.actionsContainer}>
          <Button
            buttonColor="#e30e77"
            icon="download-circle-outline"
            mode="contained"
            onPress={() => handleClaim()}
            style={styles.button}>
            <Typography variant="bodyMedium">Claim</Typography>
          </Button>
          <Button
            icon="emoticon-sad-outline"
            mode="contained"
            style={[styles.button, styles.disabled]}>
            <Typography variant="bodyMedium">Unstake</Typography>
          </Button>
        </View>
      </ScrollView>
      {isClaiming && (
        <View style={styles.transactionContainer}>
          <View style={styles.panel}>
            <Typography
              sx={{fontWeight: 'bold'}}
              variant="titleLarge"
              textAlign="center">
              Processing Transaction
            </Typography>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  transactionContainer: {
    position: 'absolute',
    width: '100%',
    height: 1000,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    elevation: 100,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  panel: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: '90%',

    borderRadius: 20,
    padding: 20,
  },

  // this
  container: {
    flex: 1,
    padding: 10,
  },
  actionClaimable: {
    backgroundColor: '#b3812d',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 20,
  },

  button: {
    backgroundColor: '#e30e77',
  },
  disabled: {
    backgroundColor: '#000',
    opacity: 0.5,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  nftContainer: {
    height: 400,
    position: 'relative',
  },
  nftTitle: {
    position: 'absolute',
    color: '#fff',
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 10,
    left: 10,
  },
  nftImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  aprContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  apr: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default EarnScreen;
