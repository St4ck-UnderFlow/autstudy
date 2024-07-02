import axios from "axios";
import { dev_environments } from "../environments/dev.environments";
import { Teacher } from "../types/teacher.type";

export function useTeacher() {

    const ENDPOINT = `${dev_environments.API_BASE_URL}/teachers`;

    async function createTeacher(teacher: Teacher) {
        try {
            console.log(teacher);
            const response = await axios.post(ENDPOINT, teacher);
            console.log(response.data);
        } catch (error) {
            throw new Error('Erro during teacher creation');
        }
    }

    return {
        createTeacher
    }
}