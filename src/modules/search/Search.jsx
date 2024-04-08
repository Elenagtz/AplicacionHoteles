import React, { useContext, useEffect, useState,FlatList } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../../assets/logo.png';
import { Image } from '@rneui/base';
import PaymentHistory from '../paymentHistory/PaymentHistory';

const Search = (props) => {
  const [userData, setUserData] = useState(null);
  const {setUpdate} = props;

 
  //Madre del usuario
  useEffect(() => {
    const getUserData = async () => {
      try {
        const userDataJSON = await AsyncStorage.getItem('dataUser');
        if (userDataJSON) {
          const userData = JSON.parse(userDataJSON);
          setUserData(userData);
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    getUserData();
    


  }, []);

  

  
  
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('dataUser');
      setUpdate(true);
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };

  //La madre  que hace que muestre el hisotiral:
  
 
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {userData ? (
          <ScrollView>
          <View>
            <View style={styles.userInfoContainer}>
            <Image source={Logo} style={{ width: 150, height: 100 }} />
            <Text style={styles.userInfoText}>Nombre: {userData.data.usuario.nombre +" "+ userData.data.usuario.apellidoP +
            " "+ userData.data.usuario.apellidoM }</Text>
            <Text style={styles.userInfoText}>Correo Electrónico: {userData.data.usuario.correo}</Text> 
          </View>
         
            <View>
          <Text style={styles.title}>Historial de pagos</Text>
                              <View contentContainerStyle={styles.paymentHistoryContainer}>

                               </View>
          </View>

          
          
          </View>
          
          </ScrollView>
          
        ) : (
          <Text style={styles.noDataText}>No se han encontrado datos de usuario.</Text>
        )}




        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  content: {
    alignItems: 'center',
  },
  userInfoContainer: {
    backgroundColor: '#4F8585',
    padding: 20,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  userInfoText: {
    fontSize: 20,
    marginBottom: 10,
    color: '#fff',
    fontStyle: 'italic',
  },
  noDataText: {
    fontSize: 16,
    color: 'red',
  },
  paymentHistoryContainer: {
    marginTop: 10,
},
  button: {
    backgroundColor: '#748C73',
    borderRadius: 18,
    padding: 10,
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
},
});

export default Search;
