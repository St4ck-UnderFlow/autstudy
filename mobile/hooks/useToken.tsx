import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { jwtDecode } from 'jwt-decode';
import { Token } from "../types/token.type";

export function useToken() {
    function setTokenValue(value: string) {
        try {
            window.localStorage.setItem('token', value);
        } catch (error) {
          console.log('Erro ao salvar token');
        }
      }
  
    function getToken() {
      try {
        const token = window.localStorage.getItem('token');
        return token;
      } catch (error) {
        console.log('Erro ao buscar token');
      }
    }
  
    function removeToken() {
      try {
        window.localStorage.removeItem('token');
      } catch (error) {
        console.log('Erro ao remover token');
      }
    }

    function decodeToken(token: string): Token | null {
        try {
            const decoded = jwtDecode(token);
            return decoded as Token;
        } catch (error) {
            console.error('Erro ao decodificar o token', error);
            return null;
        }
    };
  
    return { setTokenValue, getToken, removeToken, decodeToken };
}