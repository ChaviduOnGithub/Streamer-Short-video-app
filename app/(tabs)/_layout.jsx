import { View, Text, Image } from 'react-native';
import { Tabs, Redirect} from 'expo-router';
import { icons } from '../../constants'

const TabIcon = ({ icon, color, name, focused }) => {
  return(
    <View className="items-center justify-center gap-2">
        <Image
          source={icon}
          resizeMode="contain"
          tintColor={color}
          className="w-6 h-6"
          style={{ marginTop: 15}}
        />

        <Text className={`{$focused ? 'font-psemibol' : 'font-pregular'} text-xs `}
        style={{color: color, width: 50, textAlign: 'center'}}>
          {name}
        </Text>

    </View>
  )
}

const TabsLayout = () => {
  return (
  <>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#eae9f1",
        tabBarInactiveTintColor: "#8078ac",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#402781",
          borderColor: "#402781",
          borderTopWidth: 5,
          height: 54,
        },
      }}
    >
        <Tabs.Screen 
          name='home'
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon 
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen 
          name='bookmark'
          options={{
            title: 'Bookmark',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon 
                icon={icons.bookmark}
                color={color}
                name="Bookmark"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen 
          name='create'
          options={{
            title: 'Create',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon 
                icon={icons.plus}
                color={color}
                name="Create"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen 
          name='profile'
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon 
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            )
          }}
        />

    </Tabs>
    
  </>
  )
}

export default TabsLayout