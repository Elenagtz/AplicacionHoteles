import React from 'react'
import CreateAccount from '../auth/adapters/screens/CreateAccount'
import Login from '../auth/adapters/screens/Login'
import UserGuest from '../auth/adapters/screens/UserGuest'
import UserLogged from '../auth/adapters/screens/UserLogged'
import { createStackNavigator } from '@react-navigation/stack'
import LoginStack from './LoginStack'

const Stack = createStackNavigator();


export default function AuthStack(props) {
    const {setUpdate, navigation} = props;
    
  return (
   <Stack.Navigator initialRouteName= "Login">
        <Stack.Screen
        name='Login'
        component={() => <Login navigation={navigation} setUpdate={setUpdate} />}
        options={
          {
          title: 'Login',
          headerShown: false,
        }}
      />
        <Stack.Screen
            name="CreateAccount"
            component={CreateAccount}
            options={{ title: "Crear Cuenta", headerShown: false}}
        />
        <Stack.Screen
            name="UserGuest"
            component={UserGuest}
            options={{ title: "User Guest", headerShown: false}}
        />
        <Stack.Screen
            name="UserLogged"
            component={UserLogged}
            options={{ title: "Cuenta", headerShown: false}}
        />

        </Stack.Navigator>

  )
}

