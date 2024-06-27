import axios from "axios"


export function useAuth() {

    const API_URL = 'http://localhost:3333/auth'

    async function signIn(email: string, password: String) {
        try {
            const response = await axios.post(`${API_URL}/auth`);
            const token = response.data.token;
            console.log(token);
        } catch (error) {
            console.error('Error during signIn request'); 
        }
    }

    return {
        signIn
    }

}