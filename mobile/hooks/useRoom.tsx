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
            return response.data;
        } catch (error) {
            throw new Error('Erro during room creation');
        }
    }

    async function getRooms() {
        try {
            const response = await axios.get(
                ENDPOINT, 
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw new Error('Erro during room listing');
        }
    }

    async function getRoomMessages(roomId: string) {
        const ENDPOINT = `${dev_environments.API_BASE_URL}/rooms/messages/${roomId}`;
        try {
            const response = await axios.get(
                ENDPOINT, 
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw new Error('Erro during room listing');
        }
    }

    return {
        createNewRoom,
        getRooms,
        getRoomMessages
    }

}