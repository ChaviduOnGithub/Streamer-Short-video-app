import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Redirect, router } from 'expo-router';

const CustomButton = ({ title, handlePress, containerStyle, isLoading }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity 
        style={styles.button} 
        onPress={handlePress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, // Add some spacing
  },
  button: {
    backgroundColor: '#03b1ed', // background color
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 24, // Horizontal padding
    borderRadius: 8, // Rounded corners
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.25, // Shadow opacity for iOS
    shadowRadius: 4, // Shadow radius for iOS
  },
  buttonText: {
    color: '#fff', // White text color
    fontSize: 16, // Font size
    fontWeight: 'bold', // Bold text
    textAlign: 'center', // Center the text
  },
});
