import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Search() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('usuario');
            if (userData !== null) {
                setUser(JSON.parse(userData));
            }
        } catch (error) {
            console.error('Error al obtener los datos del usuario:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nombre: {user ? user.nombre : 'Cargando...'}</Text>
            <Text style={styles.label}>Apellido Paterno: {user ? user.apellidoP : 'Cargando...'}</Text>
            <Text style={styles.label}>Apellido Materno: {user ? user.apellidoM : 'Cargando...'}</Text>
            <Text style={styles.label}>Correo electrónico: {user ? user.correo : 'Cargando...'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16
    },
    label: {
        fontSize: 18,
        marginBottom: 8
    }
});
