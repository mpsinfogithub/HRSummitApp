import {
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
  View,
  Text,
} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen, ProfileScreen} from '../screens';
import {COLOR, FONTS, hp, wp} from '../constants/GlobalTheme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useFetch from '../hooks/useFetch';

const Tab = createBottomTabNavigator();

const TabStack = () => {
  const {data: HomeData} = useFetch({
    url: '/home',
    method: 'get',
    reload: false,
  });

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home Main') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={21} color={color} />;
        },
        tabBarStyle: styles.TabContainerStyles,
        tabBarShowLabel: false,
        tabBarItemStyle: Platform.OS === 'ios' && styles.TabIconStyles,
        headerShown: false,
      })}>
      <Tab.Screen name="Home Main" component={HomeScreen} />
      <Tab.Screen
        options={{
          tabBarButton: props => (
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(HomeData?.home?.whatsapp_community_link)
              }
              style={styles.TabMainButton}>
              <Ionicons name="logo-whatsapp" size={15} color={COLOR.white} />
              <View
                style={{
                  position: 'absolute',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 20,
                  width: wp(100),
                  top: hp(5),
                }}>
                <Text style={{fontSize: 12, fontFamily: FONTS.regular}}>
                  Developed by TCP DIGIWORKS
                </Text>
              </View>
            </TouchableOpacity>
          ),
        }}
        name="Add food"
        component={HomeScreen}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  TabContainerStyles: {
    bottom: hp(5.5),
    width: '43%',
    height: 55,
    borderRadius: 50,
    alignSelf: 'center',
    elevation: 0,
    backgroundColor: '#FFF',
  },
  TabIconStyles: {
    top: 15,
  },
  TabMainButton: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginTop: 10,
    marginHorizontal: 9,
    backgroundColor: COLOR.primary,
  },
});

export default TabStack;
