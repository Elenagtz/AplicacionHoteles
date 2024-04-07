import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Search from '../../search/Search';
import { Image } from '@rneui/base';
import Logo from '../../../../assets/logo.png';
const Stack = createStackNavigator();


export default function SearchStack(props) {
    const { setUpdate } = props;    
  return (
    <Stack.Navigator initialRouteName='Search'>
    <Stack.Screen
        name='Search'
        component={() => <Search setUpdate={setUpdate} />}
        options={{
            title: 'Buscar',
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