import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Restaurant from '../../restaurant/Restaurant.jsx'
import Spa from '../../spa/Spa.jsx'
import Miscellaneous from '../../miscellaneous/Miscellaneous.jsx'
import Home from '../../home/Home.jsx'
import Rooms from '../../rooms/Rooms.jsx'
import Logo from '../../../../assets/logo.png'
import RoomDetail from "../../rooms/RoomDetail.jsx"
import { Image } from '@rneui/base'
import PayInfo from '../../pay/PayInfo.jsx'
import CartShop from '../../cartshop/CartShop.jsx'



const Stack = createStackNavigator();

export default function HomeStack(props) {
    const { setUpdate, navigation, route } = props;

    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen
                name='Restaurant'
                component={Restaurant}
                options={{
                    title: 'Restaurante',
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

            <Stack.Screen
                name='Spa'
                component={Spa}
                options={{
                    title: 'Spa',
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


            <Stack.Screen
                name='Miscellaneous'
                component={Miscellaneous}
                options={{
                    title: 'Miscelaneos',
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

            <Stack.Screen
                name='Home'
                component={Home}
                options={{
                    title: 'Inicio',
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


            <Stack.Screen
                name='Rooms'
                component={Rooms}
                options={{
                    title: 'Rooms',
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

            <Stack.Screen
                name='RoomDetail'
                component={RoomDetail}
                options={{
                    title: 'Detalles',
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
           <Stack.Screen
                name='CartShop'
                component={() => <CartShop {...props} setUpdate={setUpdate} navigation={navigation}/>}

                options={{
                    title: 'Carrito',
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
           
            <Stack.Screen
                name='PayInfo'
                component={(props) => <PayInfo {...props} setUpdate={setUpdate} navigation={navigation}/>}
                options={{
                    title: 'Pago',
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