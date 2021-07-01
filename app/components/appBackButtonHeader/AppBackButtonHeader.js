import React from 'react';
import theme from '../../constants/theme';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CareLogReportTypeEnum from '../../constants/enums/careLogReportTypeEnum';
import {isNotEmpty} from '../../utils/ObjectUtil.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
IconAntDesign.loadFont();
Icon.loadFont();

const displayCareLogIcon = careTypeStatus => {
  switch (careTypeStatus) {
    case CareLogReportTypeEnum.RISK:
      return (
        <View style={[styles.iconCircleView]}>
          <Image
            style={styles.careLogIconIncident}
            source={require('../../../assets/images/careReport/riskIcon.png')}
          />
        </View>
      );
    case CareLogReportTypeEnum.INCIDENT:
      return (
        <View style={[styles.iconCircleView]}>
          <Image
            style={styles.careLogIconRisk}
            source={require('../../../assets/images/careReport/incidentIcon.png')}
          />
        </View>
      );
    case CareLogReportTypeEnum.CARE:
      return (
        <View style={[styles.iconCircleView]}>
          <Image
            style={styles.careLogIcon}
            source={require('../../../assets/images/careReport/careIcon.png')}
          />
        </View>
      );
  }
};

const AppBackButtonHeader = ({
  navigation,
  heading = '',
  isHideBackButton = false,
  isHideCloseButton = true,
  onClose,
  isBgStyleRequired = false,
  displayHeaderIconType = '',
  isEditButtonDisplay = false,
  onEdit,
}) => {
  return (
    <SafeAreaView>
      <View
        style={[
          styles.backContainer,
          isBgStyleRequired && styles.backContainerStyle,
        ]}>
        {!isHideBackButton && (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={styles.backIcon}>
              <IconEvilIcons
                name={'chevron-left'}
                size={43}
                color={theme.icons.darkgray}
              />
            </Text>
          </TouchableOpacity>
        )}
        {isNotEmpty(heading) && (
          <View
            style={[
              styles.pageTitle,
              isBgStyleRequired && styles.pageTitleStyle,
              !isHideBackButton &&
                !isEditButtonDisplay &&
                styles.pageTitleCenterAlign,
              !isHideCloseButton && styles.pageTitleCenterAlignWithCloseButton,
            ]}>
            {isNotEmpty(displayHeaderIconType) && (
              <View style={styles.headerIcon}>
                {displayCareLogIcon(displayHeaderIconType)}
              </View>
            )}
            <Text
              style={[
                styles.pageTextHeading,
                styles.textAlignCenter,
                isBgStyleRequired && styles.pageTextHeadingStyle,
              ]}>
              {heading}
            </Text>
          </View>
        )}
        {!isHideCloseButton && (
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>
              <IconAntDesign
                name={'close'}
                size={24}
                color={theme.icons.darkgray}
              />
            </Text>
          </TouchableOpacity>
        )}
        {isEditButtonDisplay && (
          <TouchableOpacity
            onPress={() => {
              !!onEdit && onEdit();
            }}>
            <Text style={[styles.textAlignCenter, styles.editButtonDisplay]}>
              Edit
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backContainer: {
    marginTop: hp('2%'),
    marginBottom: 21,
    flexDirection: 'row',
    marginHorizontal: wp('0%'),
    alignItems: 'center',
  },
  backContainerStyle: {
    marginBottom: 10,
  },
  backIcon: {
    width: wp('7%'),
  },
  closeButton: {
    width: wp('10%'),
    paddingRight: wp('3%'),
    textAlign: 'right',
  },
  pageTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  pageTextHeading: {
    color: theme.text.dark,
    fontFamily: 'Bitter-Regular',
    fontSize: 26,
    letterSpacing: 0,
    lineHeight: 30,
  },
  pageTextHeadingStyle: {
    fontSize: 20,
    lineHeight: 22,
    fontFamily: 'Bitter-Regular',
  },
  headerIcon: {
    marginHorizontal: wp('3%'),
  },
  editButtonDisplay: {
    color: theme.text.dark,
    fontFamily: 'Open Sans',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0,
    lineHeight: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('15%'),
    paddingRight: wp('5%'),
    textAlign: 'right',
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  iconCircleView: {
    height: 29,
    width: 29,
    borderRadius: 64,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9,
  },
  careLogIconIncident: {
    width: 12,
    height: 9,
  },
  careLogIconRisk: {
    width: 11,
    height: 15,
  },
  careLogIcon: {
    height: 29,
    width: 29,
  },
  pageTitleCenterAlign: {
    marginRight: wp('7%'),
  },
  pageTitleCenterAlignWithCloseButton: {
    marginLeft: wp('7%'),
  },
});

export default AppBackButtonHeader;
