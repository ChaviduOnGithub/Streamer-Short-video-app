import { View, Text, ScrollView, StyleSheet, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import { createUser } from '../../lib/appwrite';

const SignUp = () => {
  const [form, setform] = useState({
    username:"",
    email: "",
    password: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
  if (!form.username || !form.email || !form.password) {
    Alert.alert('Error', 'Please fill in all the fields');
    return;
  }
  
  setIsSubmitting(true);

  try {
    const result = await createUser(form.email, form.password, form.username);
    console.log('User created:', result); // Debugging log

    Alert.alert('Success', 'User created successfully!');
    router.replace('/home');
  } catch (error) {
    console.error('Error creating user:', error); // Debugging log

    Alert.alert('Error', error.message || 'Something went wrong!');
  } finally {
    setIsSubmitting(false);
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
          <Text style={styles.heading}>Sign up to Streamer</Text>
          <FormField 
            title="Username"
            value={form.username}
            handleChangeText={(e) => setform({ ...form, username: e })}
          />
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
            title="Sign Up"
            handlePress={submit}
            containerStyle={styles.button}
            isLoading={isSubmitting}
          />
          <View style={styles.signUpContainer}>
            <Text style={styles.text}>Have an account already?</Text>
              <Link href="/sign-in" style={styles.signUpLink}>Sign In</Link>
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
    paddingHorizontal: 16,
  },
  logo: {
    width: 100,
    height: 120,
  },
  heading: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    marginTop: 30,
    width: '200%',
  },
  signUpContainer: {
    marginTop: 30,
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

export default SignUp;
