import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Image } from "@rneui/base";
import { DataContext } from "./DataContext";
import _ from "lodash";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

const Item = ({item}) => (
  
  <View style={styles.row}>
              <Image source={{uri: item.imagen_elemento}} style={styles.imageCard} /> 
            

             <View>
               <Text style={styles.t_habitacion}>{item.nombre_producto}</Text>
               <Text style={styles.textDescription}>{descriptionSnippet}</Text>
            

               <View style={{ flexDirection: "row", alignItems: "center" }}>
                 <Text style={styles.precio}>Cantidad: {item.quantity} </Text>
                 <Text style={styles.precio}>
                   Precio Total: ${calculateTotalPrice(item) }
                </Text>
               </View>

               <TouchableOpacity
                 style={styles.detailsButton}
                 onPress={() => removeCartItem(item)}
              >
                 <Text style={styles.detailsButtonText}>Eliminar</Text>
               </TouchableOpacity>
             </View>
           </View>
)


export default function CartShop({ route, navigation }) {

  const { cartItems, removeCartItem } = useContext(DataContext);
  

  
  /*const calcularSubtotal = () => {
    let subtotal = 0;
    cartItems.forEach(item => {
        if (typeof item.precio === 'number') {
          if(item===item.categoria){
                subtotal += item.categoria.nombrecategoria === 'Restaurante' || item.categoria.nombrecategoria === 'Miscelaneos'
                ? item.quantity * item.precio
                : item.precio;
          }else{
            subtotal += item.precio;
          }
            
        }
    });
    return subtotal.toFixed(2);
  };*/

  const calcularSubtotal = () => {
    let subtotal = 0;
    cartItems.forEach(item => {
      if (typeof item.precio === 'number') {
        if (item.categoria && (item.categoria.nombrecategoria === 'Restaurante' || item.categoria.nombrecategoria === 'Miscelaneos')) {
          subtotal += item.quantity * item.precio;
        } else {
          subtotal += item.precio;
        }
      }
    });
    return subtotal.toFixed(2);
  };
  
  const calcularTotal = () => {
    const subtotal = parseFloat(calcularSubtotal());
    const impuestos = subtotal * 0.16; 
    return (subtotal + impuestos).toFixed(2);
  };
  
  
  const renderItem = ({ item }) => {
     const descriptionSnippet = _.truncate(item.descripcion, {
      length: 48,
       omission: "...",
     });

    const calculateTotalPrice = (item) => {
      if (item.quantity && typeof item.precio === 'number') {
        return (item.quantity * item.precio).toFixed(2);
      } else {
        return '0.00'; // Otra acción si el precio o la cantidad no son válidos
      }

    };
    console.log("Aqui va bien");
    const totalPrice = calculateTotalPrice(item);

    let response;
if(item.categoria){
switch (item.categoria.id_categoria) {
      case 1:
        response =
          <View style={styles.row}>
            
            <Image source={{uri: item.imagen_elemento}} style={styles.imageCard} />

            <View>
              <Text style={styles.t_habitacion}>{item.nombre_producto}</Text>

              <Text style={styles.textDescription}>{descriptionSnippet}</Text>
              <Text style={styles.precio}>${item.precio}</Text>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => removeCartItem(item)}
              >
                <Text style={styles.detailsButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
            
          </View>;
          break;

      case 2:
        console.log("Case2");
         response = 
        <View style={styles.row}>
            
          <Image source={{uri: item.imagen_elemento}} style={styles.imageCard} />

          <View>
            <Text style={styles.t_habitacion}>{item.nombre_producto}</Text>

            <Text style={styles.textDescription}>{descriptionSnippet}</Text>
            <Text style={styles.precio}>Cantidad: {item.quantity} </Text>
                <Text style={styles.precio}>
                  Precio Total: ${calculateTotalPrice(item) }
                </Text>

            <TouchableOpacity
              style={styles.detailsButton}
            onPress={() => removeCartItem(item)}
            >
              <Text style={styles.detailsButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
         
        </View>

        ;
        console.log(response);
        break;
      case 3:
        response = 
          <View style={styles.row}>
                        <Image source={{uri: item.imagen_elemento}} style={styles.imageCard} />

            <View>
              <Text style={styles.t_habitacion}>{item.nombre_producto}</Text>
            </View>
            <Text style={styles.precio}>Cantidad: {item.quantity} </Text>
                <Text style={styles.precio}>
                  Precio Total: ${calculateTotalPrice(item) }
                </Text>
                <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => removeCartItem(item)}
              >
                <Text style={styles.detailsButtonText}>Eliminar</Text>
              </TouchableOpacity>
          </View>
        ;
        break;
      
    } //como vas? u ya ma nu u
  }else{
    console.log("Aqui va la habitacion");
    response =
    <View style={styles.row}>
            
    <Image source={{uri: item.imagen_hab}} style={styles.imageCard} />

    <View>
      <Text style={styles.t_habitacion}>{item.nombreHabitacion}</Text>

      <Text style={styles.textDescription}>{item.cant_camas}</Text>
      <Text style={styles.textDescription}>{item.capacidad}</Text>
      <Text style={styles.textDescription}>{item.num_habitacion}</Text>
      <Text style={styles.precio}>{`$${item.precio}`}</Text>
      <TouchableOpacity
        style={styles.detailsButton}
      onPress={() => removeCartItem(item)}
      >
        <Text style={styles.detailsButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
   
  </View>
    ;
  }
 
    

 
  


    
    console.log(response);
    console.log("Aqui sigue bien");
    return(response);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles de Compra</Text>
      <FlatList
        horizontal={true}
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id_producto}
        ItemSeparatorComponent={() => <View style={styles.separador} />}
  />
      <View style={styles.resumen}>
        <Text style={[styles.title, { paddingBottom: 25 }]}>Resumen</Text>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ flexDirection: "row" }}>Subtotal:</Text>
          <Text style={{ flexDirection: "row" }}> ${calcularSubtotal()}</Text>

        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ flexDirection: "row" }}>Impuestos:</Text>
          <Text style={{ flexDirection: "row" }}> </Text>
          <Text style={{ flexDirection: "row" }}> ${parseFloat((calcularSubtotal() * 0.16).toFixed(2))}</Text>
        </View>

        <View style={styles.linea}></View>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ flexDirection: "row" }}>Total:</Text>
          <Text style={{ flexDirection: "row" }}> ${calcularTotal()}</Text>
        </View>

        <View style={{ flexDirection: "column", padding: 10 }}>
          <TouchableOpacity style={styles.reserveButton} onPress={() => navigation.navigate('PayInfo', { cartItems: cartItems, subtotal: calcularSubtotal(), impuestos: calcularSubtotal() * 0.16, total: calcularTotal() })}>
              <Text style={styles.reserveButtonText}>Pagar</Text>
          </TouchableOpacity>


        </View>

        <View style={{ flexDirection: "column", padding: 5 }}>
          <TouchableOpacity style={styles.detailsButton} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.detailsButtonText}>Agregar Servicios</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: "column",
    backgroundColor: "#ffff",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 250,
    width: 200,
    alignItems: "center",
  },
  resumen: {
    flexDirection: "column",
    backgroundColor: "#ffff",
    padding: 25,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: "45%",
    width: "100%",
    alignItems: "center",
  },

  imageCard: {
    width: 105,
    height: 105,
    borderRadius: 12,
    margin: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  descriptionContainer: {
    alignItems: "center",
  },

  textDescription: {
    letterSpacing: 0,
    textAlign: "justify",
  },

  capacidad: {
    fontSize: 12,
    marginBottom: 2,
  },
  t_habitacion: {
    fontSize: 12,
    marginBottom: 2,
    justifyContent: "center",
    fontWeight: "bold",
  },
  t_cama: {
    fontSize: 12,
    marginBottom: 2,
  },
  precio: {
    fontSize: 12,
    marginBottom: 2,
  },
  separador: {
    marginHorizontal: 8,
    width: 1,
  },
  linea: {
    height: 1,
    width: "100%",
    backgroundColor: "#ccc",
    marginTop: 10,
    marginBottom: 10,
  },
  detailsButton: {
    backgroundColor: "#738585",
    paddingVertical: 5,
    paddingHorizontal: 67,
    borderRadius: 5,
    //alignSelf: 'flex-start',
    //marginLeft: 'auto',
  },
  detailsButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  reserveButton: {
    backgroundColor: "#748C73",
    paddingVertical: 5,
    paddingHorizontal: 100,

    borderRadius: 5,
    //alignSelf: 'flex-start',
    // marginRight: 10,
  },
  reserveButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  button: {
    paddingVertical: 3,
  },
});
