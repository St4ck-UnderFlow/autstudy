import axios from "axios";
import { dev_environments } from "../environments/dev.environments";
import { useToken } from "./useToken";
import { SupportLevel } from "../types/student.type";

export function useRoom() {

    const ENDPOINT = `${dev_environments.API_BASE_URL}/rooms`;
    
    const { getToken, decodeToken } = useToken();

    async function createNewRoom(data: { title: string, classSupportLevel: string }) {
        try {
            const response = await axios.post(
                ENDPOINT, 
                data,
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
            const tokenDecoded = decodeToken(getToken() || '');
            if (tokenDecoded?.userType === 'STUDENT') {
                console.log('student aqui')
                const response = await axios.get(
                    `${ENDPOINT}/supportLevel`, 
                    {
                        headers: {
                            Authorization: `Bearer ${getToken()}`
                        }
                    }
                );
                console.log(response.data)
                return response.data
            }

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