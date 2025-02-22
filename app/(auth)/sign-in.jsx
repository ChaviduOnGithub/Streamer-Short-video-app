import { View, Text, ScrollView, StyleSheet, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import { getCurrentUser, signIn } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
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
            handleChangeText={(e) => setForm({ ...form, email: e })}
            keyboardType="email-address"
          />
          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            keyboardType="default"
          />
          <CustomButton 
            title="Sign in"
            handlePress={submit}
            containerStyle={styles.button}
            isLoading={isSubmitting}
          />
          <View style={styles.signUpContainer}>
            <Text style={styles.text}>Don't have an account?</Text>
              <Link href="/sign-up" style={styles.signUpLink}>Sign Up</Link>
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
