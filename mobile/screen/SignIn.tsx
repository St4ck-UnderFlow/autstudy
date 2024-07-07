import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useUser } from '../hooks/useUser';
import { ButtonStyle } from '../styles/Button.style';
import { InputStyle } from '../styles/Input.style';
import { TextStyle } from '../styles/Text.style';

export function SignIn({navigation}: {navigation: any}) {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('');

  const { signIn } = useUser();

  async function handleLogin() {
    try {
      await signIn({ email, password });
      navigation.navigate('Home');
    } catch (error) {
      setErrorMessage('Erro ao fazer login');
    }
  };

  return (
    <View style={styles.container}>
        <Text style={TextStyle.title}>Acesse sua conta</Text>
        <TextInput
          style={InputStyle.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={InputStyle.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <TouchableOpacity 
          style={ButtonStyle.primaryButton} 
          onPress={handleLogin}
        >
          <Text style={ButtonStyle.primaryButtonText}>
            Entrar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={ButtonStyle.secondaryButton}
          onPress={() => { navigation.navigate('SignUp') }}
        >
          <Text style={ButtonStyle.secondaryButtonText}>
            Cadastre-se
          </Text>
        </TouchableOpacity>
        <Text style={TextStyle.errorMessage}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    display: 'flex',
    gap: 12,
    flex: 1,
    paddingHorizontal: 16,
  }
});