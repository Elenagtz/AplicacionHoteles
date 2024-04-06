import React from "react";
import { View, Text } from 'react-native';

export default function Search({ route }) {
    const { dataUser } = route.params;

    return (
        <View>
            <Text>Nombre: {dataUser.nombre}</Text>
            <Text>Correo electrónico: {dataUser.correo}</Text>
            {/* Mostrar otros datos del usuario según sea necesario */}
        </View>
    );
}
