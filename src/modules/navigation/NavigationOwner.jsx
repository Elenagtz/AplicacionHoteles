import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from '../stack/owner/HomeStack';
import SearchStack from '../stack/owner/SearchStack';
import CartStack from '../stack/owner/CartShopStack';
import { Icon } from '@rneui/base';
const Tab = createBottomTabNavigator();

export default function NavigationOwner() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const { iconName, iconType } = getIconName(route.name, focused);
            // Retornar un Icon de React Native Elements
            return <Icon name={iconName} type={iconType} size={size} color={color} />;
            console.log('navegacion bien');
          },
          tabBarActiveTintColor: '#7E8D56',
          tabBarInactiveTintColor: 'gray',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#7E8D56',
          },
        })}
      >
         <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            headerShown: false,
            headerTitle: props => <CustomHeaderTitle title="Real del Valle" />,
            headerTitleAlign: 'center',
            title: "Cuenta"
          }}
        />
         <Tab.Screen
          name="SearchStack"
          component={SearchStack}
          options={{
            headerShown: false,
            headerTitle: props => <CustomHeaderTitle title="Real del Valle" />,
            headerTitleAlign: 'center',
            title: "Cuenta"
          }}
        />
        <Tab.Screen
          name="CartStack"
          component={CartStack}
          options={{
            headerShown: false,
            headerTitle: props => <CustomHeaderTitle title="Real del Valle" />,
            headerTitleAlign: 'center',
            title: "Cuenta"
          }}
        />
      </Tab.Navigator>
      </NavigationContainer>
  )
}
const getIconName = (routeName, focused) => {
    let iconName = '';
    let iconType = 'material-community';
  
    switch (routeName) {
      case 'HomeStack':
        iconName = focused ? 'home' : 'home-outline';
        break;
      case 'SearchStack':
        iconName = focused ? 'magnify' : 'magnify';
        break;
      case 'CartStack':
        iconName = focused ? 'cart' : 'cart-outline';
        break;
    }
  
    return { iconName, iconType };
  };