import React, {useState} from 'react';
import MessengerHeader from '@components/MessengerHeader';
import {Typography} from '@ui/core/components';
import {
  View,
  SafeAreaView,
  VirtualizedList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {colors} from '@ui/core/theme';

import {BlurView} from '@react-native-community/blur';
import {SCREENS} from '@screens/screens';
import {useNavigation} from '@react-navigation/native';

const contacts = [
  {
    id: 1,
    avatar: 'https://i.imgur.com/UPrs1EWl.jpg',
    name: 'John Doe',
    lastMessage: 'Hey! What’s up?',
    date: '6 May 2023',
  },
  {
    id: 2,
    avatar: 'https://i.imgur.com/UPrs1EWl.jpg',
    name: 'John Doe',
    lastMessage: 'Hey! What’s up?',
    date: '6 May 2023',
  },
  {
    id: 3,
    avatar: 'https://i.imgur.com/UPrs1EWl.jpg',
    name: 'John Doe',
    lastMessage: 'Hey! What’s up?',
    date: '6 May 2023',
  },
];

const ContactEntry = ({contact, onPress}: any) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: 5,
          marginBottom: 5,
        }}>
        <Image
          source={{uri: contact.avatar}}
          style={{width: 50, height: 50, borderRadius: 50, marginRight: 10}}
        />
        <View style={{width: '56%'}}>
          <Typography variant={'titleMedium'} sx={{color: 'white'}}>
            {contact.name}
          </Typography>
          <Typography variant={'bodySmall'}>{contact.lastMessage}</Typography>
        </View>
        <View style={{alignSelf: 'center'}}>
          <Typography variant={'bodySmall'}>{contact.date}</Typography>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ContactsScreen = () => {
  const [showContact, setShowContacts] = useState(true);
  const navigation = useNavigation<any>();
  const privacyAction = () => {
    setShowContacts(prevState => !prevState);
  };

  const handleContactMessage = () => {
    navigation.navigate(SCREENS.APP_MESSENGER_SCREEN);
  };

  return (
    <SafeAreaView style={{backgroundColor: colors.surface}}>
      <MessengerHeader
        privacyAction={privacyAction}
        privacyActive={showContact}
      />
      <View
        style={{
          paddingTop: 15,
          paddingHorizontal: 15,
          position: 'relative',
        }}>
        <Typography
          sx={{fontSize: 32, fontFamily: 'Roboto-Medium'}}
          variant={'titleLarge'}>
          Messages
        </Typography>
        <Typography
          variant={'titleSmall'}
          sx={{fontFamily: 'Roboto-Medium', fontWeight: '400'}}>
          Connect now with friends who share your interests
        </Typography>

        <View
          style={{
            backgroundColor: colors.backdrop,
            borderRadius: 16,
            marginTop: 10,
            paddingVertical: 20,
            paddingHorizontal: 10,
            position: 'relative',
          }}>
          <View>
            <VirtualizedList
              data={contacts}
              getItem={(data, index) => data[index]}
              keyExtractor={(item, index) => index.toString()}
              getItemCount={items => items.length}
              renderItem={item => (
                <ContactEntry
                  contact={item.item}
                  onPress={handleContactMessage}
                />
              )}
            />

            {showContact && (
              <BlurView
                style={styles.absolute}
                blurType="extraDark"
                blurAmount={3}
                reducedTransparencyFallbackColor="black"
              />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ContactsScreen;

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: '100%',
  },
});
