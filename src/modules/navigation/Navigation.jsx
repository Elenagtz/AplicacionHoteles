import React from 'react';
import { Image, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from "../auth/adapters/screens/Login";
import CreateAccount from "../auth/adapters/screens/CreateAccount";
import Logo from "../../../assets/logo.png"
import HomeStack from '../stack/owner/HomeStack.jsx'
import { Icon } from '@rneui/base'
import Profile from '../auth/adapters/screens/Profile.jsx'
import AuthStack from '../../modules/stack/AuthStack.jsx'
import LoginStack from '../stack/LoginStack.jsx';
import UserLogged from '../auth/adapters/screens/UserLogged.jsx';

const Tab = createBottomTabNavigator();

const CustomHeaderTitle = ({ title }) => {

  return (

    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={Logo}
        style={{ width: 30, height: 30, marginRight: 8 }}
      />
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{title}</Text>
    </View>
  );
};

export default function Navigation(props) {
  const {setUpdate} = props;
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
          name="AuthStack"
          component={() => <AuthStack setUpdate={setUpdate} />}
          options={{
            headerShown: false,
            headerTitle: props => <CustomHeaderTitle title="Real del Valle" />,
            headerTitleAlign: 'center',
            title: "Inicia Sesión"
          }}
        />

<Tab.Screen
          name="CreateAccount"
          component={() => <CreateAccount setUpdate={setUpdate} />}
          options={{
            headerShown: false,
            headerTitle: props => <CustomHeaderTitle title="Real del Valle" />,
            headerTitleAlign: 'center',
            title: "Crea tu cuenta"
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
    case 'LoginStack':
      iconName = focused ? 'login' : 'login';
      break;
    case 'CreateAccount':
      iconName = focused ? 'account' : 'account-outline';
      break;
    case 'AuthStack':
      iconName = focused ? 'login' : 'login';
      break;
  }

  return { iconName, iconType };
};