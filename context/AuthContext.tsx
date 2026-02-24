import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

type User = {
   name: string;
   email: string;
};

type StoredUser = User & {
   password: string;
};

type AuthContextType = {
   user: User | null;
   isLoading: boolean;
   login: (email: string, password: string) => Promise<void>;
   signup: (name: string, email: string, password: string) => Promise<void>;
   logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [user, setUser] = useState<User | null>(null);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      loadSession();
   }, []);

   const loadSession = async () => {
      try {
         const storedUser = await AsyncStorage.getItem(CURRENT_USER_KEY);
         if (storedUser) {
            setUser(JSON.parse(storedUser));
         }
      } catch (error) {
         console.error('Session load failed:', error);
      } finally {
         setIsLoading(false);
      }
   };

   const login = async (email: string, password: string) => {
      try {
         const usersData = await AsyncStorage.getItem(USERS_KEY);
         const users: StoredUser[] = usersData ? JSON.parse(usersData) : [];

         const existingUser = users.find(u => u.email === email);

         if (!existingUser) {
            throw new Error('User not found');
         }

         if (existingUser.password !== password) {
            throw new Error('Invalid credentials');
         }

         const sessionUser: User = {
            name: existingUser.name,
            email: existingUser.email,
         };

         await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
         setUser(sessionUser);

      } catch (error) {
         throw error;
      }
   };

   const signup = async (name: string, email: string, password: string) => {
      try {
         const usersData = await AsyncStorage.getItem(USERS_KEY);
         const users: StoredUser[] = usersData ? JSON.parse(usersData) : [];

         const userExists = users.some(u => u.email === email);

         if (userExists) {
            throw new Error('Email already registered');
         }

         const newUser: StoredUser = {
            name,
            email,
            password,
         };

         const updatedUsers = [...users, newUser];

         await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

         const sessionUser: User = { name, email };

         await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
         setUser(sessionUser);

      } catch (error) {
         throw error;
      }
   };

   const logout = async () => {
      try {
         await AsyncStorage.removeItem(CURRENT_USER_KEY);
         setUser(null);
      } catch (error) {
         console.error('Logout failed:', error);
      }
   };

   return (
      <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error('useAuth must be used within AuthProvider');
   }
   return context;
};