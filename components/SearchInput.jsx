import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert, StyleSheet } from "react-native";

import { icons } from "../constants";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        placeholder="Search for a video"
        placeholderTextColor="#ffff"
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity
        onPress={() => {
          if (query === "") {
            Alert.alert(
              "Missing Query",
              "Please input something to search results across database"
            );
            return;
          }

          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} style={styles.icon} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 64,
    backgroundColor: "#1E1E2E", // Replaced `black-100`
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#fff", // Replaced `black-200`
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginTop: 2,
    color: "#FFFF",
    fontFamily: "sans-serif", // Replace with your custom font if needed
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: "#FFFFFF", // Optional: Ensure the icon blends with your theme
  },
});
