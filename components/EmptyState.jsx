import { router } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { images } from "../constants";
import CustomButton from "./CustomButton";


const EmptyState = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      <LottieView
        source = {require('../assets/animations/Animation-not-found.json')}
        autoPlay
        loop
        style={styles.animation}>
      </LottieView>

      <CustomButton
        title="Create Video"
        handlePress={() => router.push("/home")}
        containerStyles={styles.buttonContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  animation: {
    width: 290,
    height: 296,
  },
  image: {
    width: 270,
    height: 216,
  },
  title: {
    fontSize: 20,
    color: "#ffff",
  },
  subtitle: {
    fontSize: 18, // Equivalent to `text-xl`
    textAlign: "center",
    color: "#FFFFFF", // Equivalent to `text-white`
    marginTop: 8, // Equivalent to `mt-2`
  },
  buttonContainer: {
    width: "100%",
    marginVertical: 20, // Equivalent to `my-5`
  },
});

export default EmptyState;
