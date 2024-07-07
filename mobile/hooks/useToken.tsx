import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from 'jwt-decode';
import { Token } from "../types/token.type";

export function useToken() {
    async function setTokenValue(value: string) {
        try {
            await AsyncStorage.setItem('token', value);
        } catch (error) {
            console.log('Erro ao salvar token');
        }
    }

    async function getToken() {
        try {
            const token = await AsyncStorage.getItem('token');
            return token;
        } catch (error) {
            console.log('Erro ao buscar token');
        }
    }

    async function removeToken() {
        try {
            await AsyncStorage.removeItem('token');
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
    }

    async function hasRoleInToken(roleName: string) {
        const token = await getToken();
        if (!token) return false;

        const tokenDecoded = decodeToken(token);
        if (!tokenDecoded) return false;

        const roles = tokenDecoded.roles;

        console.log(roles.includes(roleName))

        return roles.includes(roleName);
    }

    async function getUserType() {
        const token = await getToken();
        if (!token) return false;

        const tokenDecoded = decodeToken(token);
        if (!tokenDecoded) return false;

        return tokenDecoded.userType;
    }

    return { 
        setTokenValue, 
        getToken, 
        removeToken, 
        decodeToken, 
        hasRoleInToken,
        getUserType
    };
}