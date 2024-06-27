import axios from "axios";
import { dev_environments } from "../environments/dev.environments";

export function useAuth() {
    const authUrl = `${dev_environments.API_BASE_URL}/auth`;
    
    async function auth(params: {email: string, password: string}) {
        try {
            const reponse = await axios.post(authUrl, params)
            console.log(reponse.data)
        } catch (error) {
            throw new Error(error as any);
        }
    }


    return {
        auth
    }
}