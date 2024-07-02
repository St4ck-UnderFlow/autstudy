import axios from "axios";
import { dev_environments } from "../environments/dev.environments";
import { SignInUser, SignUpUser } from "../types/user.type";
import { useStudent } from "./useStudent";
import { useTeacher } from "./useTeacher";

export function useUser() {

    const ENDPOINT = `${dev_environments.API_BASE_URL}/auth`;

    const { createStudent } = useStudent();
    const { createTeacher } = useTeacher();

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
                await signIn({ 
                    email: signUpUser.user.email, 
                    password: signUpUser.user.password 
                });
            } catch (error: any) {
                throw new Error(error);
            }
        }

        if (signUpUser.degreeLevel) {
            try {
                await createTeacher({
                    degreeLevel: signUpUser.degreeLevel,
                    user: signUpUser.user
                });
                await signIn({ 
                    email: signUpUser.user.email, 
                    password: signUpUser.user.password 
                });
            } catch (error: any) {
                throw new Error(error);
            }
        }
    }

    return {
        signIn,
        signUp
    }
}