import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import Logo from '../../../assets/logo.png';
import { Image } from '@rneui/base';
import PaymentHistory from '../paymentHistory/PaymentHistory';
import Loading from '../../kernel/components/Loading';
const Search = (props) => {
  const [userData, setUserData] = useState(null);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { setUpdate } = props;

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

  const toggleLogoutModal = () => {
    setLogoutModalVisible(!isLogoutModalVisible);
  };

  const handleLogout = async () => {
    setLoading(true); // Muestra el indicador de carga
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('dataUser');
      setUpdate(true);
    } catch (error) {
      console.error('Error while logging out:', error);
    }
    setLoading(false); // Oculta el indicador de carga
    toggleLogoutModal(); // Cierra el modal
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {userData ? (
          <ScrollView>
            <View>
              <View style={styles.userInfoContainer}>
                <Image source={Logo} style={{ width: 150, height: 100 }} />
                <Text style={styles.userInfoText}>
                  Nombre: {userData.data.usuario.nombre} {userData.data.usuario.apellidoP} {userData.data.usuario.apellidoM}
                </Text>
                <Text style={styles.userInfoText}>Correo Electrónico: {userData.data.usuario.correo}</Text>
              </View>

              <View>
                <Text style={styles.title}>Historial de pagos</Text>
                <View contentContainerStyle={styles.paymentHistoryContainer}></View>
              </View>
            </View>
          </ScrollView>
        ) : (
          <Text style={styles.noDataText}>No se han encontrado datos de usuario.</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={toggleLogoutModal}>
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>

        <Modal isVisible={isLogoutModalVisible} onBackdropPress={toggleLogoutModal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cerrar Sesión</Text>
            <Text style={styles.modalText}>¿Estás seguro de que deseas cerrar sesión?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={toggleLogoutModal}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton1} onPress={handleLogout}>
                <Text style={styles.modalButtonText}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Agrega tu componente de carga */}
        <Loading visible={isLoading} title="Cerrando sesión..." />
        
      </View>
    </View>
  );
};

// Estilos
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
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#4F8585',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalButton: {
    backgroundColor: '#CC0505',
    borderRadius: 18,
    padding: 10,
    marginHorizontal: 10,
  },
  modalButton1: {
    backgroundColor: '#038B19',
    borderRadius: 18,
    padding: 10,
    marginHorizontal: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Search;
