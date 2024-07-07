import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { TextStyle } from "../styles/Text.style";
import { InputStyle } from "../styles/Input.style";
import { ButtonStyle } from "../styles/Button.style";
import { useState } from "react";
import { useRoom } from "../hooks/useRoom";
import { SupportLevelSelect } from "../components/SupportLevelSelect";
import { SupportLevel } from "../types/student.type";

export function NewRoom({navigation}: {navigation: any}) {

    const [ title, setTitle ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ classSupportLevel, setClassSupportLevel ] = useState<SupportLevel | any>('');

    const { createNewRoom } = useRoom();

    async function handleNewRoom() {
        try {
            const newRoom = await createNewRoom({ title, classSupportLevel });
            console.log(newRoom)
            navigation.navigate('RoomChat', { roomId: newRoom.id, roomTitle: newRoom.title });
        } catch (error) {
            console.log(error)
            setErrorMessage('Erro ao criar uma nova sala');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={TextStyle.title}>
                Crie uma nova sala
            </Text>
            <TextInput
                style={InputStyle.input}
                placeholder="Título da sala"
                value={title}
                onChangeText={setTitle}
                autoCapitalize="none"
                keyboardType="default"
            />
            <SupportLevelSelect onSelectFn={(itemValue) => setClassSupportLevel(itemValue)} />
            <TouchableOpacity style={ButtonStyle.primaryButton} onPress={handleNewRoom}>
                <Text style={ButtonStyle.primaryButtonText}>Criar nova sala</Text>
            </TouchableOpacity>
            <Text style={TextStyle.errorMessage}>{errorMessage}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      marginTop: 30,
      flex: 1,
      display: 'flex',
      gap: 12,
      paddingHorizontal: 16,
    }
});