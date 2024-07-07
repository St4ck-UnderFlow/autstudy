import axios from "axios";
import { dev_environments } from "../environments/dev.environments";
import { useToken } from "./useToken";
import { DegreeLevel } from "../types/teacher.type";

export function useRoom() {

    const ENDPOINT = `${dev_environments.API_BASE_URL}/rooms`;
    
    const { getToken, decodeToken } = useToken();

    async function createNewRoom(data: { title: string, classSupportLevel: string }) {
        const token = await getToken();

        try {
            const response = await axios.post(
                ENDPOINT, 
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.log(error)
            throw new Error('Erro during room creation');
        }
    }

    async function getRooms() {
        try {
            const token = await getToken();

            if (!token) return;

            const tokenDecoded = decodeToken(token);
            if (tokenDecoded?.userType === 'STUDENT') {
                console.log('student aqui')
                const response = await axios.get(
                    `${ENDPOINT}/supportLevel`, 
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
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
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data;

        } catch (error) {
            throw new Error('Erro during room listing');
        }
    }

    async function getRoomsByDegreeLevel(degreeLevel: DegreeLevel) {
        try {
            const token = await getToken();

            const response = await axios.get(
                `${ENDPOINT}/degreeLevel/${degreeLevel}`, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            return response.data;
        } catch (error) {
            throw new Error('Error During Rooms Listing by Degree Level');
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

    async function deleteRoom(roomId: string) {
        try {
            const token = await getToken()
            const response = await axios.delete(
                `${ENDPOINT}/${roomId}`, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw new Error('Erro during room deleting');
        }
    }

    async function updateRoom(params: { id: string, title: string }) {
        try {
            const token = await getToken();

            const response = await axios.put(
                `${ENDPOINT}/${params.id}`, 
                { title: params.title },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw new Error('Erro during room updating');
        }
    }

    async function getRoomById(id: string) {
        try {
            const response = await axios.get(
                `${ENDPOINT}/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw new Error('Erro on getting room by id');
        }
    }

    return {
        createNewRoom,
        getRooms,
        getRoomMessages,
        deleteRoom,
        updateRoom,
        getRoomById,
        getRoomsByDegreeLevel
    }

}