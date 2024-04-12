import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentHistoryCard = ({ item }) => {

  
  return (
    <View style={styles.outerMargin}>
      <View style={styles.innerMargin}>
        <View style={styles.paymentItem}>
          <View style={styles.paymentItemContent}>
            <View style={styles.amountContainer}>
              <Text style={styles.amountText}>Subtotal: ${item.subtotal}</Text>
              <Text style={styles.amountText}>Impuestos: ${item.impuestos}</Text>
              <Text style={styles.amountText}>Total: ${item.total}</Text>
              <Text style={styles.amountText}>Fecha de reserva: {item.fecha_reserva}</Text>
            </View>
            
          </View>
        </View>
      </View>
    </View>
  );
};

const PaymentHistory = () => {

  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    fetchPaymentHistory();
  }, []);


  const fetchPaymentHistory = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get("http://192.168.109.76:8080/api/historial/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPaymentHistory(response.data);
    } catch (error) {
      console.error("Error fetching payment history:", error);
    }
  };

  return (
    <FlatList
    data={paymentHistory}
    renderItem={({ item }) => (
    
    <PaymentHistoryCard 
      subtotal={item.subtotal}
      impuestos={item.impuestos}
      total={item.total}
      item={item} />)}

    keyExtractor={(item, index) => index.toString()}
    contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  outerMargin: {
    backgroundColor: "#4F8585", // Color del margen
    borderRadius: 10,
    marginHorizontal: 20, // Margen horizontal para ajustar el ancho de la tarjeta
    marginBottom: 10, // Margen inferior entre las tarjetas
  },
  innerMargin: {
    backgroundColor: "#ffffff", // Fondo blanco
    borderRadius: 10,
    margin: 5, // Margen interno para ajustar el espacio entre la tarjeta y el margen de color
  },
  paymentItem: {
    padding: 12,
  },
  paymentItemContent: {
    borderRadius: 10,
    padding: 10,
  },
  amountContainer: {
    backgroundColor: "#4F8585",
    borderRadius: 5,
    padding: 5,
    marginBottom: 5,
    maxWidth: "50%", // Ajusta el ancho máximo del contenedor del monto
  },
  amountText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default PaymentHistory;
