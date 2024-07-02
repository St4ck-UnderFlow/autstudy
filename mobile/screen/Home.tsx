import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TextStyle } from '../styles/Text.style';
import { useToken } from '../hooks/useToken';
import { useEffect, useState } from 'react';
import { Token } from '../types/token.type';
import { ButtonStyle } from '../styles/Button.style';
import { useUser } from '../hooks/useUser';

export function Home({navigation}: {navigation: any}) {

    const { getToken, decodeToken } = useToken();
    const [ tokenDecoded, setTokenDecoded ] = useState<Token>();
    const { signOut } = useUser();

    useEffect(() => {
        const token = getToken();
        const decodedToken = decodeToken(token || '');
        if (decodedToken) {
            setTokenDecoded(decodedToken);
        }
    } , [])

    function handleSignOut() {
        signOut();
        navigation.navigate('SignIn');
    }

    return (
        <View style={styles.container}>
            <Text style={TextStyle.title}>Bem-Vindo, {tokenDecoded?.name} !!</Text>
                <TouchableOpacity 
                    style={ButtonStyle.primaryButton} 
                    onPress={handleSignOut}
                >
                    <Text style={ButtonStyle.primaryButtonText}>
                        Sair
                    </Text>
                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      marginTop: 30,
      display: 'flex',
      gap: 12,
      flex: 1,
      paddingHorizontal: 16,
    }
  });