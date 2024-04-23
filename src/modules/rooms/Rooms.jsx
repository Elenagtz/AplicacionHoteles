import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { Image } from '@rneui/base'
import { FlatList } from 'react-native-gesture-handler'
import FlatListRoom from './componentsRoom/FlatListRoom'
import Habitaciones from "../../../assets/hotel.jpg"
import {DataContext} from '../cartshop/DataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { height } = Dimensions.get('window')
export default function Rooms(props) {
    const {navigation} = props;

    const [elements, setElements] = useState([]);

    const { cartItems, addItemToCart, updateCartItem } = useContext(DataContext); 

                    const agregarCarrito = (item, quantity) => {
                        const itemIndex = cartItems.findIndex(cartItem => cartItem.id_habitacion === item.id_habitacion);
                        if (itemIndex !== -1) {
                            const updatedCartIntems = [...cartItems];
                           
                            updatedCartIntems[itemIndex].quantity += quantity;
                            
                            updateCartItem(updatedCartIntems[itemIndex]);
                            
                        } else {
                            addItemToCart({ ...item, quantity });
                        }
                        navigation.navigate('CartShop');
                    };
  
    
    useEffect(() => {
        const fetchElements = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                console.log('Token:', token);
                const response = await axios.get('http://192.168.108.193:8080/api/habitacion/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
    
                console.log('Response:', response);
    
                if (response && response.status === 200 && response.data && response.data.data && Array.isArray(response.data.data)) {
                    console.log('Data received:', response.data.data);
    
                    // Mapeamos los datos para extraer solo el nombre de la habitación
                    const mappedData = response.data.data.map(item => ({
                        ...item,
                        nombreHabitacion: item.tipoHabitacion.nombrehabitacion
                    }));
    
                    // Asignamos los datos mapeados al estado
                    setElements(mappedData);
    
                    console.log('Filtered Elements:', mappedData);
                } else {
                    console.error('Error: No se recibieron datos válidos del servidor.');
                }
            } catch (error) {
                console.error('Error fetching elements:', error);
            }
        };
    
        fetchElements();
    }, []);
    
    
    const navigateToRoomDetail = (item) => {
        navigation.navigate('RoomDetail', { 
            t_habitacion: item.nombreHabitacion,
            cant_camas: `Cant. de camas: ${item.cant_camas}`,
            capacidad: `Capacidad: ${item.capacidad}`,
            num_habitacion: `Num. de habitacion: ${item.num_habitacion}`,
            precio: `$${item.precio}`,
            imagen_hab: item.imagen_hab
        });
    };

  return (
    <View style={styles.container}>
             <View style={styles.imageContainer}>
                <Image
                    source={Habitaciones}
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Habitaciones</Text>
                </View>
            </View>
            <FlatList
                data={elements}
                renderItem={({ item }) => (
                    <FlatListRoom
                    tipoHabitacion={item.nombreHabitacion}
                    cant_camas={`Cant. de camas${item.cant_camas}`}
                    capacidad={`Capacidad ${item.capacidad}`}
                    num_habitacion={`Num. de habitacion: ${item.num_habitacion}`}
                    precio={`$${item.precio}`}
                    imagen_hab={item.imagen_hab}
                    action={() => navigateToRoomDetail(item)}
                    customAction={(quantity) => agregarCarrito(item, quantity)}                    />
            )}

                
                //keyExtractor={item => item.id}
                keyExtractor={item => item.id_habitacion.toString()}
                style={[styles.scrollView, { paddingHorizontal: 12 }]}
            />
            </View>
  )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: height / 4,
    },
    textContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    text: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },

})