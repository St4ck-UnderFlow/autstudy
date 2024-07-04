import axios from "axios";
import { dev_environments } from "../environments/dev.environments";
import { useToken } from "./useToken";

export function useRoom() {

    const ENDPOINT = `${dev_environments.API_BASE_URL}/rooms`;
    
    const { getToken } = useToken();

    async function createNewRoom(title: string) {
        try {
            const response = await axios.post(
                ENDPOINT, 
                { title },
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                }
            );
            console.log(response.data);
        } catch (error) {
            throw new Error('Erro during room creation');
        }
    }

    return {
        createNewRoom
    }

}