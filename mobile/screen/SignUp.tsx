import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useUser } from '../hooks/useUser';
import { SignUpUser, UserType } from '../types/user.type';

export function SignUp() {

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserType | any>('');

  const [errorMessage, setErrorMessage] = useState('');

  const { signUp } = useUser();

  function validFields() {
    const fields = [name, cpf, email, password, userType];
    return fields.every(field => field.trim() !== '');
  }

  async function handleSignUp() {
    let signUpData: SignUpUser = {
      user: {
        name,
        cpf,
        email,
        password,
        userType
      }
    }

    if (userType === 'STUDENT') {
      signUpData = {
        supportLevel: "MODERATE",
        ...signUpData
      }
    }

    if (userType === 'TEACHER') {
      signUpData = {
        deggreeLevel: 'PROFESSIONAL',
        ...signUpData
      }
    }

    if (!validFields()) {
      setErrorMessage('Preencha todos os campos');
    }

    try {
      await signUp(signUpData);
    } catch (error) {
      setErrorMessage('Erro durante o cadastro, tente novamente');
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>
          Bem-Vindo !!
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          placeholder="CPF"
          value={cpf}
          onChangeText={setCpf}
          autoCapitalize="none"
          keyboardType="default"
        />
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
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={userType}
            onValueChange={(itemValue) => setUserType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione o tipo de usuário" value="" />
            <Picker.Item label="Estudante" value="STUDENT" />
            <Picker.Item label="Professor(a)" value="TEACHER" />
          </Picker>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: 8,
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
  },
  picker: {
    height: 48,
  },
});