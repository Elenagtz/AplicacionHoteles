    import React, { useState } from 'react';
    import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Platform } from 'react-native';
    import { Image, Icon } from '@rneui/base';
    import Hotel from "../../../assets/hotelAfuera.jpg";
    import { Picker } from '@react-native-picker/picker';
    import DateTimePicker from '@react-native-community/datetimepicker';
    
    
    const { height, width } = Dimensions.get('window');

    export default function Home(props) {
        const { navigation } = props;
        const [checkInDate, setCheckInDate] = useState(null);
        const [checkOutDate, setCheckOutDate] = useState(null);
        const [rooms, setRooms] = useState(1);
        const [guests, setGuests] = useState(1);
        const [showCheckInDatePicker, setShowCheckInDatePicker] = useState(false);
        const [showCheckOutDatePicker, setShowCheckOutDatePicker] = useState(false);
        const [errorMessage, setErrorMessage] = useState('');
        
        const handleCheckInDateChange = (event, selectedDate) => {
            setShowCheckInDatePicker(Platform.OS === 'ios');
            if (selectedDate) {
                setCheckInDate(selectedDate);
                const currentDate = new Date();
                const maxCheckOutDate = new Date(selectedDate);
                maxCheckOutDate.setDate(maxCheckOutDate.getDate() + 7); // Permitir un máximo de 7 días de estadía
                
                // Verificar si la fecha de llegada es válida
                if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
                    setErrorMessage('La fecha de llegada debe ser posterior o igual a la fecha actual.');
                } else {
                    setErrorMessage('');
                }
                
                // Verificar si la fecha de salida seleccionada es mayor al máximo permitido
                if (checkOutDate && checkOutDate > maxCheckOutDate) {
                    setCheckOutDate(null);
                }
            }
        };
        
        const handleCheckOutDateChange = (event, selectedDate) => {
            setShowCheckOutDatePicker(Platform.OS === 'ios');
            if (selectedDate) {
                const maxCheckOutDate = new Date(checkInDate);
                maxCheckOutDate.setDate(maxCheckOutDate.getDate() + 7); // Permitir un máximo de 7 días de estadía
                
                // Verificar si la fecha de salida es válida
                if (selectedDate <= checkInDate || selectedDate > maxCheckOutDate) {
                    setErrorMessage('La fecha de salida debe ser posterior a la fecha de llegada y dentro de los 7 días siguientes.');
                } else {
                    setCheckOutDate(selectedDate);
                    setErrorMessage('');
                }
            }
        };
        
        const showCheckInDatePickerModal = () => {
            setShowCheckInDatePicker(true);
            setShowCheckOutDatePicker(false); // Cerrar el selector de fecha de salida si está abierto
        };

        const showCheckOutDatePickerModal = () => {
            setShowCheckOutDatePicker(true);
            setShowCheckInDatePicker(false); // Cerrar el selector de fecha de llegada si está abierto
        };

        const isDatesSelected = checkInDate && checkOutDate;


        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source={Hotel}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
        
                <View style={styles.reservationContainer}>
                    <Text style={styles.reservationText}>Reserva</Text>
                    <View style={styles.dateContainer}>
                        <TouchableOpacity style={styles.datePicker} onPress={showCheckInDatePickerModal}>
                            <Text>{checkInDate ? checkInDate.toLocaleDateString() : "Llegada"}</Text>
                        </TouchableOpacity>
                        {showCheckInDatePicker && (
                            <DateTimePicker
                                value={checkInDate || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleCheckInDateChange}
                            />
                        )}
                        <TouchableOpacity style={styles.datePicker} onPress={showCheckOutDatePickerModal}>
                            <Text>{checkOutDate ? checkOutDate.toLocaleDateString() : "Salida"}</Text>
                        </TouchableOpacity>
                        {showCheckOutDatePicker && (
                            <DateTimePicker
                                value={checkOutDate || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleCheckOutDateChange}
                            />
                        )}
                    </View>
                    {errorMessage !== '' && (
                        <Text style={styles.errorMessage}>{errorMessage}</Text>
                    )}
                </View>
        
                {isDatesSelected && errorMessage === '' && (  // Nueva condición para mostrar el botón
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Rooms')}>
                        <Text style={styles.buttonText}>Ver disponibilidad</Text>
                    </TouchableOpacity>
                )}
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Hotel Real del Valle</Text>
                    <Text style={styles.description}>Somos un hotel familiar, ofrecemos los servicios de
                        restaurante y spa, ven y conocénos, haz tu reservación.</Text>
                </View>
                <View style={styles.iconsContainer}>
                    <TouchableOpacity style={styles.textIcon} onPress={() => navigation.navigate('Restaurant')}>
                        <Icon name="restaurant-menu" size={50} color="#000" />
                        <Text>Restaurante</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textIcon} onPress={() => navigation.navigate('Spa')}>
                        <Icon name="spa" size={50} color="#000" />
                        <Text>Spa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textIcon} onPress={() => navigation.navigate('Miscellaneous')}>
                        <Icon name="soap" size={50} color="#000" />
                        <Text>Miscelaneos</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        );
        
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        imageContainer: {
            width: '100%',
            height: height / 4,
        },
        image: {
            width: '100%',
            height: '100%',
        },
        reservationContainer: {
            width: width, // Cambiado a width para ocupar todo el ancho
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            padding: 10,
            borderRadius: 10,
            marginBottom: 10, // Añadido marginBottom para espacio
        },
        reservationText: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        dateContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
        },
        datePicker: {
            flex: 1,
            marginRight: 10,
            backgroundColor: '#fff',
            borderRadius: 5,
            padding: 10,
        },
        pickerContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
        },
        pickerWrapper: {
            flex: 1,
            marginRight: 10,
        },
        textContainer: {
            alignItems: 'center',
        },
        text: {
            marginTop: 10,
            fontSize: 22,
            fontWeight: 'bold',
            alignItems: 'center'
        },
        description: {
            padding: 16,
            textAlign: 'center',
            fontSize: 14

        },
        iconsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20,
        },
        textIcon: {
            alignItems: 'center'
        },
        errorMessage: {
            color: 'red',
            marginTop: 5,
            textAlign: 'center'
        },
        button: {
            backgroundColor: '#7E8D56',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 16,
            marginTop: 20,
            alignItems: 'center',
            alignSelf: 'center', // Alinea el botón al centro
        },
        buttonText: {
            color: '#fff',
            fontSize: 16,
        },
    });
