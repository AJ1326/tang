import React from "react";
import { StyleSheet, View, Linking, Alert, BackHandler } from "react-native";
import Swiper from "react-native-swiper";
import * as AsyncStorageUtil from "../utils/AsyncStorageUtil";
import { connect } from "react-redux";
import { ButtonPrimary, ButtonSecondary } from "../components/Buttons";
import SlideOne from "../components/onBoardingSlides/SlideOne";
import SlideTwo from "../components/onBoardingSlides/SlideTwo";
import SlideThree from "../components/onBoardingSlides/SlideThree";
import SlideFour from "../components/onBoardingSlides/SlideFour";
import theme from "../constants/theme";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Loading from "./Loading";
import SplashScreen from "react-native-splash-screen";

let swiperDotMarginBottom = { marginBottom: 142 };

class OnBoarding extends React.Component {
  componentDidMount() {
    // SplashScreen.hide();
  }

  UNSAFE_componentWillMount() { }

  render() {
    return (
      <View style={styles.container}>
        <Loading />
        <Swiper
          dotStyle={swiperDotMarginBottom}
          activeDotColor="#6675DD"
          dotColor="#E9ECFF"
          activeDotStyle={swiperDotMarginBottom}
          autoplay
          autoplayTimeout={4}
        >
          <SlideOne />
          <SlideTwo />
          <SlideThree />
          <SlideFour />
        </Swiper>
        <View style={styles.buttonContainer}>
          <ButtonPrimary
            parentLabel="OnBoarding"
            buttonLabel="Sign up for free"
            onPress={() => {
              this.props.navigation.navigate("Signup");
            }}
          />
          <ButtonSecondary
            parentLabel="OnBoarding"
            buttonLabel="Login"
            onPress={() => {
              this.props.navigation.navigate("Login");
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },

  buttonContainer: {
    position: "absolute",
    zIndex: 3,
    width: wp("100%"),
    bottom: 20,
    paddingHorizontal: 24,
  },
});

export default connect(
  ({ user }) => ({
    user,
  }),
  {}
)(OnBoarding);
