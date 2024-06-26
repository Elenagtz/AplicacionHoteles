import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from "react-native";
import Tarjeta from '../../../assets/tarjeta.png'
import Modal from "react-native-modal";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage desde la biblioteca correspondiente



const PayInfo = ({ route, navigation }) => {
  const { subtotal, impuestos, total } = route.params;
// const payment =()=>{
//   const paymentInfo ={amount: total, date: new Date()};
//   addPaymentHistory(paymentInfo);
//   navigation.goBack();
// }

  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: ""
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setIsButtonDisabled(!validateCardInfo());
  }, [cardInfo]);

 /* const handlePayment = () => {
    if (validateCardInfo()) {
      console.log("Información de la tarjeta:", cardInfo);
      setIsModalVisible(true);
    } else {
      Alert.alert("Error", "Por favor, complete correctamente todos los campos de la tarjeta.");
    }
  };*/
  /*const handlePayment = async () => {
    if (validateCardInfo()) {
      const paymentInfo = {
        subtotal: subtotal,
        impuestos: impuestos.toFixed(2),
        total: total,
        fecha_reserva: new Date().toISOString() 
      };
      try {
        const response = await axios.post('http://192.168.1.76:8080/api/historial/', paymentInfo);
        console.log("Respuesta del servidor:", response.data);
        setIsModalVisible(true);
      } catch (error) {
        console.error("Error al enviar la información de pago:", error);
        Alert.alert("Error", "Hubo un problema al procesar el pago. Por favor, inténtalo de nuevo más tarde.");
      }
    } else {
      Alert.alert("Error", "Por favor, complete correctamente todos los campos de la tarjeta.");
    }
  };*/

  const handlePayment = async () => {
    if (validateCardInfo()) {
      const paymentInfo = {
       
        total: total,
        fecha_compra: new Date().toISOString(),
        fecha_entrada: new Date().toISOString(), // Aquí deberías proporcionar la fecha de entrada deseada
        fecha_salida: new Date().toISOString(), // Aquí deberías proporcionar la fecha de salida deseada
        elementoIds: route.params.selectedItems.filter(item => item.id_producto).map(item => item.id_producto), // Filtramos solo los elementos que tienen un id_producto y mapeamos para obtener una lista de IDs
        habitacionIds: route.params.selectedItems.filter(item => item.id_tipohab).map(item => item.id_tipohab) // Filtramos solo los elementos que tienen un id_tipohab y mapeamos para obtener una lista de IDs
      
      };
      try {
        const token = await AsyncStorage.getItem('token');
        
        if (!token) {
          console.error("Error: No se encontró un token de autenticación.");
          Alert.alert("Error", "No se encontró un token de autenticación. Inicia sesión nuevamente.");
          return;
        }
  
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
  
        const response = await axios.post('http://192.168.1.76:8080/api/reserva/', paymentInfo, config);
        
        console.log("Respuesta del servidor:", response.data);
        setIsModalVisible(true);
      } catch (error) {
        console.error("Error al enviar la información de pago:", error);
        Alert.alert("Error", "Hubo un problema al procesar el pago. Por favor, inténtalo de nuevo más tarde.");
      }
    } else {
      Alert.alert("Error", "Por favor, complete correctamente todos los campos de la tarjeta.");
    }
  };
  


  
  const validateCardInfo = () => {
    if (!cardInfo.cardNumber || !cardInfo.cardHolder || !cardInfo.expiryDate || !cardInfo.cvv) {
      return false;
    }
    if (cardInfo.cardNumber.replace(/\D/g, '').length !== 16) {
      return false;
    }
    const expiryDatePattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryDatePattern.test(cardInfo.expiryDate)) {
      return false;
    }
    // Validar el CVV (debe tener 3 dígitos)
    if (cardInfo.cvv.replace(/\D/g, '').length !== 3) {
      return false;
    }
    return true;
  };

  const formatCardNumber = (input) => {
    // Eliminar caracteres no numéricos
    const cardNumber = input.replace(/\D/g, '');
    // Agrupar en bloques de 4 dígitos
    return cardNumber.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiryDate = (input) => {
    // Eliminar caracteres no numéricos
    const expiryDate = input.replace(/\D/g, '');
    // Insertar '/' después del segundo dígito (mes)
    return expiryDate.replace(/^(.{2})/, '$1/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.resumen}>
        <Text style={styles.title}>Resumen</Text>
        
        {route.params.selectedItems.map(item => (
    <View style={styles.resumenItem} key={item.id}>
      <Text>{item.nombre}{item.nombreHabitacion} </Text>
    </View>
  ))}

        <View style={styles.resumenItem}>
          <Text>Subtotal: ${subtotal}</Text>
        </View>
        <View style={[styles.resumenItem, styles.noBorder]}>
          <Text>Impuestos: ${impuestos.toFixed(2)}</Text>
        </View>
        <View style={styles.linea}></View>
        <View style={styles.resumenItem}>
          <Text>Total: ${total}</Text>
        </View>
      </View>

      <View style={styles.tarjetaContainer}>
        <Text style={styles.title}>Ingresa la información de tu tarjeta</Text>
        <View style={styles.imageContainer}>
          <Image source={Tarjeta} style={styles.tarjetaImage}/>
        </View>
        
        <TextInput
          style={styles.input}
          placeholder="Número de tarjeta"
          maxLength={19} // Permitir hasta 19 caracteres (16 dígitos + 3 espacios)
          value={formatCardNumber(cardInfo.cardNumber)}
          onChangeText={(text) => setCardInfo({ ...cardInfo, cardNumber: text })}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Titular de la tarjeta"
          value={cardInfo.cardHolder}
          onChangeText={(text) => setCardInfo({ ...cardInfo, cardHolder: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de expiración (MM/YY)"
          maxLength={5} // Permitir solo 5 caracteres (MM/YY)
          value={formatExpiryDate(cardInfo.expiryDate)}
          onChangeText={(text) => setCardInfo({ ...cardInfo, expiryDate: text })}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="CVV"
          maxLength={3} // Permitir solo 3 dígitos
          value={cardInfo.cvv}
          onChangeText={(text) => setCardInfo({ ...cardInfo, cvv: text })}
          keyboardType="numeric"
        />
        <TouchableOpacity 
          style={[styles.reserveButton, isButtonDisabled && styles.disabledButton]} 
          onPress={handlePayment}
          disabled={isButtonDisabled}>
          <Text style={styles.reserveButtonText}>Pagar</Text>
        </TouchableOpacity>
      </View>
      <Modal isVisible={isModalVisible} animationIn="fadeIn" animationOut="fadeOut">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>¡Pago Exitoso!</Text>
            <Text style={styles.modalText}>¡Gracias por tu compra!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  resumen: {
    backgroundColor: "#ffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
  },
  resumenItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  linea: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  reserveButton: {
    backgroundColor: "#4F8585",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  reserveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  tarjetaContainer: {
    backgroundColor: "#ffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'column',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:16
  },
  tarjetaImage: {
    width: 87,
    height: 52,
    marginRight: 10,
  },
  modalContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4F8585", 
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "#333333", 
  },
  modalButton: {
    backgroundColor: "#4F8585", 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    fontSize: 16,
    color: "#ffffff", 
  },
});

export default PayInfo;
