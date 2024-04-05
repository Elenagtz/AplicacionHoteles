import Navigation from "./src/modules/navigation/Navigation";
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import React,{useEffect, useState} from "react";
import Loading from "./src/kernel/components/Loading";
import NavigationOwner from "./src/modules/navigation/NavigationOwner";
import { LogBox } from 'react-native';
import { CartProvider } from "./src/modules/cartshop/DataContext";
LogBox.ignoreAllLogs(true);
export default function App() {
  const [session, setSession] = useState(null);
  const [update, setUpdate] = useState(false);
  useEffect(() =>{
    (async () =>{
      const token = await AsyncStorage.getItem('token');
      console.log("token: ", token);
      if(token){
        setSession(true);
      }else{
        setSession(false);
      }
    })()
    setUpdate(false)
  },[update])
  if(session === null) return <Loading />
  // return session ? <NavigationOwner/> : <Navigation setUpdate={setUpdate}/>
 
 //eliminar de aquí
  return (
    <CartProvider>
      {session ? <NavigationOwner/> : <Navigation setUpdate={setUpdate}/>}
    </CartProvider>
  );
//aquí
}

