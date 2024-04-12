import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

export default function RoomDetail(props) {
    const {params} = props.route;


     const carouselData = [
        { id: '1', image: require('../../../assets/hotel.jpg') },
        { id: '2', image: require('../../../assets/hotel.jpg') },
        { id: '3', image: require('../../../assets/hotel.jpg') }
       ];
    
      const renderCarouselItem = ({ item }) => {
        return (
          <Image source={{ uri: item.imagen_hab }} style={styles.carouselImage} />
        );
      };
    
      const [activeSlide, setActiveSlide] = React.useState(0);

      return (
          <ScrollView contentContainerStyle={styles.container}>
              <Text style={styles.roomName}>{params.t_habitacion}</Text>
  
              <Carousel
                  data={carouselData}
                  renderItem={renderCarouselItem}
                  sliderWidth={300}
                  itemWidth={300}
                  autoplay={true}
                  loop={true}
                  onSnapToItem={(index) => setActiveSlide(index)} // Actualiza el índice activo
              />
              <Pagination // Componente de puntos indicadores
                  dotsLength={carouselData.length}
                  activeDotIndex={activeSlide}
                  containerStyle={styles.paginationContainer}
                  dotStyle={styles.dotStyle}
                  inactiveDotStyle={styles.inactiveDotStyle}
                  inactiveDotOpacity={0.6}
                  inactiveDotScale={0.8}
              />
              <View style={styles.additionalInfo}>
                <Text style={styles.title}> Detalles de la Habitación</Text>
                <View style={styles.infoItem}>
                    <Text style={styles.infoText}>- {params.cant_camas}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoText}>- {params.capacidad}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoText}>- {params.num_habitacion}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoText}>- {params.precio}</Text>
                </View>
            </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
      flexGrow: 1,
      alignItems: 'center',
      paddingBottom: 90, // Añadido espacio en la parte inferior
  },
  carouselImage: {
      width: 300,
      height: 200,
      borderRadius: 10,
      marginBottom: 10, // Reducido el margen inferior
      marginTop: 30
  },
  paginationContainer: {
      paddingTop: 10,
      paddingBottom: 20,
  },
  dotStyle: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#7E8D56',
  },
  inactiveDotStyle: {
      backgroundColor: '#C5C5C5',
  },
  additionalInfo: {
      width: '100%',
      padding: 20,
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
  },
  roomName: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 10
  },
  infoItem: {
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
  },
  infoText: {
      fontSize: 16,
      marginBottom: 5,
  },
})