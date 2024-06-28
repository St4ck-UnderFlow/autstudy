import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useUser } from '../hooks/useUser';

export function SignIn({navigation}: {navigation: any}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useUser();

  const [errorMessage, setErrorMessage] = useState('');

  async function handleLogin() {
    try {
      await signIn({ email, password })
    } catch (error) {
      setErrorMessage('Erro ao fazer login');
      Alert.alert('Erro ao fazer login')
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Faça o Login</Text>
        <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
        />
        <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => { navigation.navigate('SignUp') }}>
            <Text style={styles.buttonText}>Cadastre-se</Text>
        </TouchableOpacity>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 12,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#007BFF',
    height: 48,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    backgroundColor: '#94a3b8',
    height: 48,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: 8,
  }
});