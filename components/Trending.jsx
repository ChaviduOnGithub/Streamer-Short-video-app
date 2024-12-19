import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";

import { icons } from "../constants";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [playPreview, setPlayPreview] = useState(false);
  let longPressTimeout;

  const handlePressIn = () => {
    // Start the timer for a long press
    longPressTimeout = setTimeout(() => {
      setPlayPreview(true); // Start preview 
      // Stop the preview after 2 seconds
      setTimeout(() => {
        setPlayPreview(false);
      }, 3000); // 3 second preview
    }, 500); // long press delay
  };

  const handlePressOut = () => {
    clearTimeout(longPressTimeout); // Clear long press timer if released early
  };

  return (
    <Animatable.View
      style={styles.itemContainer}
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      <TouchableOpacity
        style={styles.touchable}
        activeOpacity={0.7}
        onPressIn={handlePressIn} // Start the long press 
        onPressOut={handlePressOut} // End the long press 
      >
        {playPreview ? (
          <Video
            source={{ uri: item.video }}
            style={styles.imageBackground}
            resizeMode={ResizeMode.COVER}
            shouldPlay
            isMuted
          />
        ) : (
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            style={styles.imageBackground}
            resizeMode="cover"
          />
        )}

        {!playPreview && (
          <Image
            source={icons.play}
            style={styles.playIcon}
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 0 }}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginRight: 20,
  },
  Prevideo: {
    width: 208, 
    height: 488, 
    borderRadius: 33,
    marginTop: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  video: {
    width: 208, 
    height: 288,
    borderRadius: 33,
    marginTop: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  touchable: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    width: 208, 
    height: 288, 
    borderRadius: 33,
    marginVertical: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  playIcon: {
    width: 48, // 12 * 4
    height: 48, // 12 * 4
    position: "absolute",
  },
});

export default Trending;