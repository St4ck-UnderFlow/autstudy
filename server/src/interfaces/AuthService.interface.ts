export interface AuthServiceInterface {
    signIn(newUser: any): Promise<void>;
}