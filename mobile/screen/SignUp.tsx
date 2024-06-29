import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useUser } from '../hooks/useUser';
import { SignUpUser, UserType } from '../types/user.type';
import { TextStyle } from '../styles/Text.style';
import { InputStyle } from '../styles/Input.style';
import { PickerStyle } from '../styles/Picker.style';
import { ButtonStyle } from '../styles/Button.style';

export function SignUp({navigation}: {navigation: any}) {

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
        <Text style={TextStyle.title}>
          Crie sua conta
        </Text>
        <TextInput
          style={InputStyle.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          keyboardType="default"
        />
        <TextInput
          style={InputStyle.input}
          placeholder="CPF"
          value={cpf}
          onChangeText={setCpf}
          autoCapitalize="none"
          keyboardType="default"
        />
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
        <View style={PickerStyle.pickerContainer}>
          <Picker
            selectedValue={userType}
            onValueChange={(itemValue) => setUserType(itemValue)}
            style={PickerStyle.picker}
          >
            <Picker.Item label="Selecione o tipo de usuário" value="" />
            <Picker.Item label="Estudante" value="STUDENT" />
            <Picker.Item label="Professor(a)" value="TEACHER" />
          </Picker>
        </View>
        <TouchableOpacity style={ButtonStyle.primaryButton} onPress={handleSignUp}>
            <Text style={ButtonStyle.primaryButtonText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={ButtonStyle.secondaryButton}
          onPress={() => { navigation.navigate('SignIn') }}
        >
          <Text style={ButtonStyle.secondaryButtonText}>
            Já possui uma conta?
          </Text>
        </TouchableOpacity>
        <Text style={TextStyle.errorMessage}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    display: 'flex',
    gap: 12,
    paddingHorizontal: 16,
  }
});