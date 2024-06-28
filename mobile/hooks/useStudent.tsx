import axios from "axios";
import { dev_environments } from "../environments/dev.environments";
import { Student } from "../types/student.type";

export function useStudent() {

    const ENDPOINT = `${dev_environments.API_BASE_URL}/students`;

    async function createStudent(student: Student) {
        try {
            const response = await axios.post(ENDPOINT, student);
            console.log(response.data);
        } catch (error) {
            throw new Error('Erro during student creation');
        }
    }

    return {
        createStudent
    }
}