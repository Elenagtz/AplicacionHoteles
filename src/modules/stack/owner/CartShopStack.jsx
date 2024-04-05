import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Search from '../../search/Search';
import CartShop from '../../cartshop/CartShop';
import { Image } from '@rneui/base';
import Logo from '../../../../assets/logo.png';
const Stack = createStackNavigator();


export default function CartStack() {
  return (
    <Stack.Navigator initialRouteName='Cart'>
    <Stack.Screen
        name='Cart'
        component={CartShop}
        options={{
            title: 'Carrito de compras',
            headerStyle: {
                backgroundColor: '#7E8D56'
            },
            headerRight: () => (
                <Image
                    source={Logo}
                    style={{ width: 40, height: 30, marginRight: 10 }}
                />
            )
        }}
    />
    </Stack.Navigator>
  )
}