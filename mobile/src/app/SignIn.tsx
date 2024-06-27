import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Title } from "@/components/Title";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { View } from "react-native";

export function SignIn() {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    

    const { signIn } = useAuth();

    async function handleSubmit() {
        signIn(email, password);
    }

    return (
        <View className="flex-1 bg-gray-700">
            <View className="flex-1 px-4 pt-6 space-y-4">
                <View className="w-full space-y-4">
                    <Title>
                        Faça o Login
                    </Title>
                    <Input 
                        placeholder="exemplo@email.com" 
                        label="Email"
                        onChangeText={value => setEmail(value)}
                    />
                    <Input 
                        placeholder="******" 
                        label="Senha" 
                        textContentType="newPassword"
                        onChangeText={value => setPassword(value)}
                    />
                    <Button 
                        label="Entrar" 
                        onPress={handleSubmit}
                    />
                </View>
                <Button 
                    label="Cadastre-se" 
                    onPress={() => {
                        console.log('navigate to signup screen')
                    }}
                />
            </View>
        </View>
    )
}