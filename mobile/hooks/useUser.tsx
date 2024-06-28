import axios from "axios";
import { dev_environments } from "../environments/dev.environments";
import { SignInUser, SignUpUser } from "../types/user.type";
import { useStudent } from "./useStudent";

export function useUser() {

    const ENDPOINT = `${dev_environments.API_BASE_URL}/auth`;

    const { createStudent } = useStudent();

    async function signIn(signInUser: SignInUser) {
        try {
            const reponse = await axios.post(ENDPOINT, signInUser);
            console.log(reponse.data)
        } catch (error) {
            throw new Error(error as any);
        }
    }

    async function signUp(signUpUser: SignUpUser) {
        if (signUpUser.supportLevel) {
            try {
                await createStudent({
                    supportLevel: signUpUser.supportLevel,
                    user: signUpUser.user
                });
            } catch (error: any) {
                throw new Error(error);
            }
        }

        if (signUpUser.deggreeLevel) {
            // TODO: Create new teacher (useTeacher)
        }
    }

    return {
        signIn,
        signUp
    }
}