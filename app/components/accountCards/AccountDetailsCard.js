import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Image, Alert} from 'react-native';
import globalStyles from '../../../assets/styles/globalStyle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ButtonPlain} from '../Buttons';
import theme from '../../constants/theme';
import DataRow from './DataRow';
import AccountCardHeading from './AccountCardHeading';
import ImageCropPicker from 'react-native-image-crop-picker';
import * as ImagePicker from 'expo-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import {useNavigation} from '@react-navigation/native';
import { BlurView } from 'expo-blur';

const onEditPhotoPressed = async updateProfilePicture => {
  try {
    const file = await showImagePicker();
    let file_extention = file.split('.').pop();
    if (
      file_extention !== 'gif' &&
      file_extention !== 'GIF' &&
      file_extention !== 'svg' &&
      file_extention !== 'SVG'
    ) {
      if (file) {
        const image = await ImageCropPicker.openCropper({
          path: file,
          width: 300,
          height: 300,
        });
        ImgToBase64.getBase64String(image.path)
          .then(base64String => {
            updateProfilePicture({image: base64String});
          })
          .catch(() => {
            Alert.alert('Unable to crop image, please try agin!');
          });
      }
    } else {
      Alert.alert('Image format not supported!');
    }
  } catch (e) {
    //user cancells event
  }
};

const AccountProfile = ({name, image, updateProfilePicture}) => {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  return (
  <View style={styles.imageContainer}>
    {!!image ? (
      <Image source={{uri: image}} style={styles.userImage} />
    ) : (
      <View style={styles.imagePlaceholder} />
    )}
    <View>
      <Text style={[globalStyles.labelMedium, styles.userName]}>{name}</Text>
      <ButtonPlain
        parentLabel="Account"
        buttonLabel="Edit Photo"
        onPress={() => onEditPhotoPressed(updateProfilePicture)}
      />
    </View>
  </View>
)};

const AccountPassword = ({navigation}) => (
  <View style={styles.infoContainer}>
    <View style={styles.linkAsideView}>
      <Text style={[globalStyles.labelMedium, styles.infoLabelPassword]}>
        Password
      </Text>
      <ButtonPlain
        parentLabel="Account"
        buttonLabel="Edit"
        onPress={() => {
          navigation.navigate('ChangePassword');
        }}
      />
    </View>
    <Text style={styles.hiddenPassword}>..........</Text>
  </View>
);

const AccountDetailsCard = ({email, name, image, updateProfilePicture}) => {
  const navigation = useNavigation();
  return (
    <View style={[globalStyles.card, styles.accountsCard]}>
      <BlurView intensity={140}>
        <AccountCardHeading label="Account Details" />
        <View style={styles.accountsCardBody}>
          <AccountProfile
            name={name}
            image={image}
            updateProfilePicture={updateProfilePicture}
          />
          <DataRow label="Email" value={email} />
          <AccountPassword navigation={navigation} />
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  accountsCard: {
    marginTop: 10,
    paddingBottom: hp('3%'),
  },
  accountsCardBody: {
    marginHorizontal: 8,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('2.5%'),
  },

  userImage: {
    width: wp('18%'),
    height: wp('18%'),
    marginRight: wp('5%'),
    resizeMode: 'cover',
    borderRadius: wp('9%'),
  },
  imagePlaceholder: {
    width: wp('18%'),
    height: wp('18%'),
    marginRight: wp('5%'),
    backgroundColor: theme.background.medium,
    borderRadius: wp('9%'),
  },
  userName: {
    textTransform: 'capitalize',
    fontSize: 17,
    marginBottom: hp('0.6%'),
  },
  infoContainer: {
    marginTop: hp('3%'),
  },
  infoLabelPassword: {
    fontWeight: 'bold',
    marginBottom: hp('0%'),
  },
  hiddenPassword: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  linkAsideView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AccountDetailsCard;
