import { useAuth } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
   Alert,
   StatusBar,
   StyleSheet,
   Text,
   TextInput,
   TouchableOpacity,
   View,
} from 'react-native';

export default function LoginScreen() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const { login } = useAuth();
   const router = useRouter();

   const handleLogin = async () => {
      if (!email || !password) {
         Alert.alert('Error', 'Please fill in all fields');
         return;
      }

      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
         Alert.alert('Error', 'Invalid email format');
         return;
      }

      try {
         await login(email, password);
         router.replace('/home');
      } catch (error) {
         Alert.alert('Error', 'Incorrect credentials');
      }
   };

   return (
      <>
         <StatusBar barStyle="dark-content" />
         <View style={styles.container}>
            <View style={styles.inner}>

               <Text style={styles.title}>Login here</Text>
               <Text style={styles.subtitle}>
                  Welcome back you've{"\n"}been missed!
               </Text>

               <TextInput
                  style={styles.inputActive}
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

               <TouchableOpacity style={styles.button} onPress={handleLogin}>
                  <Text style={styles.buttonText}>Sign In</Text>
               </TouchableOpacity>

               <TouchableOpacity
                  style={styles.signupWrapper}
                  onPress={() => router.push('/signup')}
               >
                  <Text style={styles.signupText}>
                     Create new account? <Text style={styles.textBold}>SignUp</Text>
                  </Text>
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
      marginBottom: 10,
   },
   subtitle: {
      fontSize: 22,
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: 50,
   },
   inputActive: {
      backgroundColor: '#DCDDE3',
      height: 60,
      borderRadius: 14,
      paddingHorizontal: 20,
      fontSize: 16,
      borderWidth: 2,
      borderColor: '#2F4CC9',
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
      marginBottom: 15,
   },
   passwordInput: {
      flex: 1,
      fontSize: 16,
   },
   forgotWrapper: {
      alignItems: 'flex-end',
      marginBottom: 40,
   },
   forgotText: {
      color: '#2F4CC9',
      fontSize: 14,
      fontWeight: '600',
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
   signupWrapper: {
      marginTop: 40,
      alignItems: 'center',
   },
   signupText: {
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