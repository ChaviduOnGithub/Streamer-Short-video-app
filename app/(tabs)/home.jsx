import { FlatList, Text, View, StyleSheet, Image, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import { LinearGradient } from 'expo-linear-gradient';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import useAppwrite from '../../lib/UseAppwrite';
import { getAllPosts, getLatestPosts } from '../../lib/appwrite';
import VideoCard from '../../components/VideoCard';

const Home = () => {
  
  const { data: posts, refetch } = useAppwrite(getAllPosts);

  const { data: latestPosts} = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  return (
    <LinearGradient
      colors={['#020024', '#170e34', '#402781']} // Gradient colors
      style={styles.gradientBackground} // Full-screen gradient
    >
      <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
          )}
          ListHeaderComponent={() => (
            <View style={styles.headerContainer}>
              <View style={styles.headerTopRow}>
                <View>
                  <Text style={styles.welcomeText}>Welcome Back!</Text>
                  <Text style={styles.userName}>Chacha</Text>
                </View>
                <Image source={images.logo} style={styles.logo} />
              </View>
              <SearchInput />
              <View>
                <Text style={styles.latestText}>Trending Videos</Text>
              </View>
              <Trending posts={latestPosts ?? []}/>
            </View>

          )}
          ListEmptyComponent={() => 
            <EmptyState
              tile='No Videos Found'
              subtitle='Be the first to create a video!'
            />
          }
          refreshControl={<RefreshControl  refreshing={refreshing} onRefresh={onRefresh}/>}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1, 
  },
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    // backgroundColor: '#886ef5', // Purple background for header
    padding: 20,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff', 
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f4f4f4', 
    marginTop: 5,
  },
  itemContainer: {
    backgroundColor: '#ffffff', 
    padding: 16,
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // Shadow for Android
  },
  itemText: {
    fontSize: 16,
    color: '#333', 
    fontWeight: '500',
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  latestText: {
    color: '#ffff',
    fontSize: 20,
    marginTop: 20
  }
});
