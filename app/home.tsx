import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
   const { user, logout } = useAuth();
   const router = useRouter();

   const handleLogout = async () => {
      await logout();
      router.replace('/login');
   };

   if (!user) return null;

   return (
      <>
         <StatusBar barStyle="dark-content" />
         <View style={styles.container}>
            <View style={styles.inner}>

               <Text style={styles.title}>Welcome 👋</Text>
               <Text style={styles.subtitle}>
                  Glad to see you back!
               </Text>

               {/* User Card */}
               <View style={styles.card}>
                  <Text style={styles.label}>Name</Text>
                  <Text style={styles.value}>{user.name}</Text>

                  <View style={styles.divider} />

                  <Text style={styles.label}>Email</Text>
                  <Text style={styles.value}>{user.email}</Text>
               </View>

               {/* Logout Button */}
               <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                  <Text style={styles.logoutText}>Logout</Text>
               </TouchableOpacity>

            </View>
         </View>
      </>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#EDEDED',
      justifyContent: 'center',
   },
   inner: {
      paddingHorizontal: 28,
   },
   title: {
      fontSize: 28,
      fontWeight: '700',
      color: '#2F4CC9',
      textAlign: 'center',
      marginBottom: 8,
   },
   subtitle: {
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: 40,
   },
   card: {
      backgroundColor: '#DCDDE3',
      padding: 25,
      borderRadius: 18,
      marginBottom: 40,
   },
   label: {
      fontSize: 14,
      color: '#555',
      marginBottom: 6,
   },
   value: {
      fontSize: 20,
      fontWeight: '700',
      marginBottom: 15,
   },
   divider: {
      height: 1,
      backgroundColor: '#C5C6CC',
      marginVertical: 15,
   },
   logoutButton: {
      backgroundColor: '#2F4CC9',
      height: 65,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#2F4CC9',
      shadowOpacity: 0.4,
      shadowRadius: 15,
      shadowOffset: { width: 0, height: 8 },
      elevation: 8,
   },
   logoutText: {
      color: '#FFFFFF',
      fontSize: 20,
      fontWeight: '700',
   },
});