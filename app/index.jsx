import { ScrollView, View, StyleSheet, Image } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat, 
  withSequence 
} from 'react-native-reanimated';
import "../global.css";
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

const RootLayout = () => {
  const waveAnimation = useSharedValue(0);

  useEffect(() => {
    waveAnimation.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 500 }),
        withTiming(-10, { duration: 500 })
      ),
      -1,
      true
    );
  }, []);

  const animatedLogoStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: waveAnimation.value }],
    };
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Animated.View style={[animatedLogoStyle]}>
            <Image source={images.logo} style={styles.logo} />
          </Animated.View>
          {/* <Image source={images.streamer} style={styles.streamer} /> */}
          <CustomButton
            title="Continue with email"
            handlePress={() => {router.push('/sign-in')}}
            containerStyle={styles.customButtonContainer} 
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#574699' style='light'/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#886ef5',
    flex: 1,
  },
  scrollView: {
    height: '100%',
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 16,
  },
  logo: {
    width: 180,
    height: 180,
  },
  streamer: {
    width: 150,
    height: 20,
  },
  customButtonContainer: {
    marginTop: 40, 
    alignItems: 'center' 
  },
});

export default RootLayout;
