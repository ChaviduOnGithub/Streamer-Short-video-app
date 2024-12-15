import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';

const SignIn = () => {
  const [form, setform] = useState({
    email: "",
    password: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const opacity = useSharedValue(1); // Initial opacity value

  useEffect(() => {
    // Loop animation: fade in and out
    opacity.value = withRepeat(
      withTiming(0.5, { duration: 1000 }), // Fade to 50% opacity in 1 second
      -1, // Infinite repetitions
      true // Reverse on each iteration
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const submit = () => {
    // Your submit logic here
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <Image 
            source={images.logo}
            style={styles.logo}
          />
          <Text style={styles.heading}>Log in to Streamer</Text>
          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e) => setform({ ...form, email: e })}
            keyboardType="email-address"
          />
          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setform({ ...form, password: e })}
            keyboardType="default"
            secureTextEntry={true}
          />
          <CustomButton 
            title="Sign in"
            handlePress={submit}
            containerStyle={styles.button}
            isLoading={isSubmitting}
          />
          <View style={styles.signUpContainer}>
            <Text style={styles.text}>Don't have an account?</Text>
            <Animated.View style={animatedStyle}>
              <Link href="/sign-up" style={styles.signUpLink}>Sign Up</Link>
            </Animated.View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#886ef5',
    flex: 1,
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 46,
  },
  logo: {
    width: 100,
    height: 120,
    marginBottom: 20,
  },
  heading: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 50,
  },
  button: {
    marginTop: 30,
    width: '200%',
  },
  signUpContainer: {
    marginTop: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginRight: 5,
  },
  signUpLink: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SignIn;
