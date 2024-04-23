import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";
import Logo from "../../../assets/logo.png";
import { Image } from "@rneui/base";
import PaymentHistory from "../paymentHistory/PaymentHistory";
import Loading from "../../kernel/components/Loading";
import axios from "axios";


const PaymentHistoryCard = ({ total, subtotal, impuestos, fechaReserva }) => {
  return (
   
  
    <View style={styles.paymentHistoryContainer}>
      <View style={styles.outerMargin}>
        <View style={styles.innerMargin}>
          <View style={styles.paymentItem}>
            <View style={styles.paymentItemContent}>
              <View style={styles.amountContainer}>
                <Text style={styles.amountText}>Subtotal: ${subtotal}</Text>
                <Text style={styles.amountText}>Impuestos: ${impuestos}</Text>
                <Text style={styles.amountText}>Total: ${total}</Text>
                <Text style={styles.amountText}>Fecha de reserva: {fechaReserva}</Text>
              </View>
              
            </View>
          </View>
        </View>
      </View>
    </View>
  );

}



const Search = (props) => {
  const [userData, setUserData] = useState(null);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);

  const { setUpdate } = props;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userDataJSON = await AsyncStorage.getItem("dataUser");
        if (userDataJSON) {
          const userData = JSON.parse(userDataJSON);
          setUserData(userData);
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        console.log("Token:", token);
        const response = await axios.get(
          "http://192.168.108.193:8080/api/historial/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (
          response &&
          response.status === 200 &&
          response.data &&
          response.data.data &&
          Array.isArray(response.data.data)
        ) {
          console.log("Data received:", response.data.data);
          setPaymentHistory(response.data.data); // Update paymentHistory here after successful response
          console.log("Filtered Elements:", data);
        } else {
          console.error("Error: No se recibieron datos válidos del servidor.");
        }
      } catch (error) {
        console.error("Error obteniendo elementos:", error);
      }
    };

    fetchPaymentHistory();
  }, []);

  const toggleLogoutModal = () => {
    setLogoutModalVisible(!isLogoutModalVisible);
  };

  const handleLogout = async () => {
    setLoading(true); // Muestra el indicador de carga
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("dataUser");
      setUpdate(true);
    } catch (error) {
      console.error("Error while logging out:", error);
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
                  Nombre: {userData.data.usuario.nombre}{" "}
                  {userData.data.usuario.apellidoP}{" "}
                  {userData.data.usuario.apellidoM}
                </Text>
                <Text style={styles.userInfoText}>
                  Correo Electrónico: {userData.data.usuario.correo}
                </Text>
              </View>
              <FlatList
                  data={paymentHistory}
                  renderItem={({ item }) => (
                    <PaymentHistoryCard
                    total={item.total}
                    subtotal={item.subtotal}
                    impuestos={item.impuestos}
                    fechaReserva={item.fecha_reserva}
                    />
                    

                  )}
                  />

              
            </View>
          </ScrollView>
        ) : (
          <Text style={styles.noDataText}>
            No se han encontrado datos de usuario.
          </Text>
        )}

        <TouchableOpacity style={styles.button} onPress={toggleLogoutModal}>
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>

        <Modal
          isVisible={isLogoutModalVisible}
          onBackdropPress={toggleLogoutModal}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cerrar Sesión</Text>
            <Text style={styles.modalText}>
              ¿Estás seguro de que deseas cerrar sesión?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={toggleLogoutModal}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton1}
                onPress={handleLogout}
              >
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  content: {
    alignItems: "center",
  },
  userInfoContainer: {
    backgroundColor: "#4F8585",
    padding: 20,
    borderRadius: 10,
    margin: 20,
    alignItems: "center",
  },
  userInfoText: {
    fontSize: 20,
    marginBottom: 10,
    color: "#fff",
    fontStyle: "italic",
  },
  noDataText: {
    fontSize: 16,
    color: "red",
  },
  paymentHistoryContainer: {
    marginTop: 10,
    fontSize: 20,
    color: "black",
    fontStyle: "italic",
  },
  button: {
    backgroundColor: "#748C73",
    borderRadius: 18,
    padding: 10,
    margin: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#4F8585",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  modalButton: {
    backgroundColor: "#CC0505",
    borderRadius: 18,
    padding: 10,
    marginHorizontal: 10,
  },
  modalButton1: {
    backgroundColor: "#038B19",
    borderRadius: 18,
    padding: 10,
    marginHorizontal: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
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
    maxWidth: "100%", // Ajusta el ancho máximo del contenedor del monto
  },
  amountText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Search;
