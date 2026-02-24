import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
   ActivityIndicator,
   StatusBar,
   StyleSheet,
   Text,
   View,
} from 'react-native';

export default function Index() {
   const { user, isLoading } = useAuth();
   const router = useRouter();

   const [readyToRedirect, setReadyToRedirect] = useState(false);

   useEffect(() => {
      const timer = setTimeout(() => {
         setReadyToRedirect(true);
      }, 2000);

      return () => clearTimeout(timer);
   }, []);

   useEffect(() => {
      if (!readyToRedirect || isLoading) return;

      if (user) {
         router.replace('/home');
      } else {
         router.replace('/login');
      }
   }, [readyToRedirect, isLoading, user]);

   return (
      <>
         <StatusBar barStyle="dark-content" />
         <View style={styles.container}>
            <Text style={styles.logo}></Text>
            <ActivityIndicator size="large" color="#2F4CC9" />
            <Text style={styles.loadingText}>Loading...</Text>
         </View>
      </>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#EDEDED',
      justifyContent: 'center',
      alignItems: 'center',
   },
   logo: {
      fontSize: 32,
      fontWeight: '700',
      color: '#2F4CC9',
      marginBottom: 25,
   },
   loadingText: {
      marginTop: 15,
      fontSize: 14,
      color: '#555',
   },
});