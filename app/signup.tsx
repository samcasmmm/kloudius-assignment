import { useAuth } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
   Alert,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   TextInput,
   TouchableOpacity,
   View,
} from 'react-native';

export default function SignupScreen() {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);

   const { signup } = useAuth();
   const router = useRouter();

   const handleSignup = async () => {
      if (!name || !email || !password) {
         Alert.alert('Error', 'Missing fields');
         return;
      }

      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
         Alert.alert('Error', 'Invalid email format');
         return;
      }

      if (password.length < 6) {
         Alert.alert('Error', 'Password must be at least 6 characters');
         return;
      }

      try {
         await signup(name, email, password);
         router.replace('/(tabs)');
      } catch (error) {
         Alert.alert('Error', 'Signup failed');
      }
   };

   return (
      <>
         <StatusBar barStyle="dark-content" />
         <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.inner}>

               <Text style={styles.title}>Create Account</Text>

               <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#666"
                  value={name}
                  onChangeText={setName}
               />

               <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#666"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
               />

               <View style={styles.passwordWrapper}>
                  <TextInput
                     style={styles.passwordInput}
                     placeholder="Password"
                     placeholderTextColor="#666"
                     secureTextEntry={!showPassword}
                     value={password}
                     onChangeText={setPassword}
                  />
                  <TouchableOpacity
                     onPress={() => setShowPassword(!showPassword)}
                  >
                     <Ionicons
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        size={22}
                        color="#555"
                     />
                  </TouchableOpacity>
               </View>

               <TouchableOpacity style={styles.button} onPress={handleSignup}>
                  <Text style={styles.buttonText}>Sign Up</Text>
               </TouchableOpacity>

               <TouchableOpacity
                  style={styles.loginWrapper}
                  onPress={() => router.back()}
               >
                  <Text style={styles.loginText}>
                     Already have an account? <Text style={styles.textBold}>Sign In</Text>
                  </Text>
               </TouchableOpacity>

            </View>
         </ScrollView>
      </>
   );
}

const styles = StyleSheet.create({
   container: {
      flexGrow: 1,
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
      marginBottom: 10,
   },
   subtitle: {
      fontSize: 20,
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: 50,
   },
   input: {
      backgroundColor: '#DCDDE3',
      height: 60,
      borderRadius: 14,
      paddingHorizontal: 20,
      fontSize: 16,
      marginBottom: 20,
   },
   passwordWrapper: {
      backgroundColor: '#DCDDE3',
      height: 60,
      borderRadius: 14,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 40,
   },
   passwordInput: {
      flex: 1,
      fontSize: 16,
   },
   button: {
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
   buttonText: {
      color: '#FFFFFF',
      fontSize: 20,
      fontWeight: '700',
   },
   loginWrapper: {
      marginTop: 40,
      alignItems: 'center',
   },
   loginText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#444',
   },
   textBold: {
      fontSize: 16,
      fontWeight: '700',
      color: '#2F4CC9',
   },
});