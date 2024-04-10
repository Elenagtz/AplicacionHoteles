import React, { useState } from "react";
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Input, Button, Image, Icon } from "@rneui/base"
import Fondo from '../../../../../assets/hotel.jpg'
import Logo from '../../../../../assets/logo.png'
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isEmpty } from 'lodash';
import Loading from "../../../../kernel/components/Loading";


export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [showMessage, setShowMessage] = useState('');
    const [loadingVisible, setLoadingVisible] = useState(false); // Estado para controlar la visibilidad del componente de carga
    const { navigation, setUpdate } = props;     
    const obtenerIdDeUsuarioAlgunMetodo = () => {
        // Obtener el id de usuario desde alguna fuente, como una respuesta de autenticación
        return 1;
    };

    const login = async () => {
        if (!isEmpty(email) && !isEmpty(password)) {
            setShowMessage("");
            setLoadingVisible(true); // Mostrar el componente de carga al inicio de la solicitud
            enviarDatos(email, password);
        } else {
            setShowMessage('Campo obligatorio');
        }
    }
    


    const enviarDatos = async (email, password) => {
        const url = 'http://192.168.0.10:8080/api/auth/signin';

        const data = {
            correo: email,
            contrasena: password
        };

        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.data) {
                throw new Error('No se recibieron datos del servidor');
            }

            const token = response.data.data.token;
            const dataUser = response.data;

            await AsyncStorage.setItem('token', `Bearer ${token}`);
            await AsyncStorage.setItem('dataUser', JSON.stringify(dataUser));
            setUpdate(true);
        } catch (error) {
            console.error('Error:', error.message);
        } finally {
            setLoadingVisible(false); // Ocultar el componente de carga al finalizar la solicitud
        }
    };

    // Obtener el id de usuario desde alguna fuente, como una respuesta de autenticación
const id_usuario = obtenerIdDeUsuarioAlgunMetodo();

// Guardar el id de usuario en AsyncStorage
const guardarIdUsuarioEnAsyncStorage = async (id_usuario) => {
  try {
    await AsyncStorage.setItem('id_usuario', id_usuario.toString()); // Guardar como string
    console.log('Id de usuario guardado correctamente en AsyncStorage.');
  } catch (error) {
    console.error('Error al guardar el id de usuario en AsyncStorage:', error);
  }
};

// Llamar a la función para guardar el id de usuario
guardarIdUsuarioEnAsyncStorage(id_usuario);
    return (
        <ImageBackground source={Fondo} style={styles.background}>
            <View style={styles.container}>
                <Image
                    source={Logo}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Input
                    placeholder="example@example.com"
                    label="Correo electrónico: *"
                    keyboardType="email-address"
                    onChange={({ nativeEvent: { text } }) => setEmail(text)}
                    labelStyle={styles.label}
                    containerStyle={styles.input}
                    inputStyle={{ color: '#fff' }}
                    errorMessage={showMessage}
                    rightIcon={
                        <Icon
                            type="material-community"
                            name="email-outline"
                            color='#fff'
                        />
                    }
                />

                <Input
                    placeholder="*******"
                    label="Contraseña: *"
                    onChange={({ nativeEvent: { text } }) => setPassword(text)}
                    labelStyle={styles.label}
                    containerStyle={styles.input}
                    inputStyle={{ color: '#fff' }}
                    secureTextEntry={showPassword}
                    errorMessage={showMessage}
                    rightIcon={
                        <Icon
                            type="material-community"
                            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                            color='#fff'
                            onPress={() => setShowPassword(!showPassword)}
                        />
                    }
                />

                <Button
                    title='Iniciar sesión'
                    onPress={login}
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.buttonStyle}
                    titleStyle={{ color: "black" }}
                />

                {/* Componente de carga */}
                <Loading visible={loadingVisible} title="Cargando..." />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 8
    },
    input: {
        paddingHorizontal: 16,
        marginVertical: 8
    },
    label: {
        color: '#fff'
    },
    buttonStyle: {
        backgroundColor: '#CB9813',
        borderRadius: 18
    },
    btnContainer: {
        width: '80%'
    },
});