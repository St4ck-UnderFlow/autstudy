import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { TextStyle } from "../styles/Text.style";
import { InputStyle } from "../styles/Input.style";
import { useEffect, useState } from "react";
import { useRoom } from "../hooks/useRoom";
import { ButtonStyle } from "../styles/Button.style";
import { useNavigation } from "@react-navigation/native";

export function UpdateRoom({ route }: any) {

    const { roomId, roomTitle } = route.params;

    const [ title, setTitle ] = useState<string>(roomTitle);

    const { updateRoom } = useRoom();

    const navigation = useNavigation();

    async function handleUpdateRoom() {
        await updateRoom({
            id: roomId,
            title
        })  
        navigation.navigate('Home' as never);
    }

    function setHeaderOptions() {
        navigation.setOptions({
            headerTitle: roomTitle,
        })
    }

    useEffect(() => {
        setHeaderOptions();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={TextStyle.title}>Editar Sala</Text>
            <TextInput
                style={InputStyle.input}
                placeholder="Título da sala"
                defaultValue={roomTitle}
                onChangeText={setTitle}
                autoCapitalize="none"
                keyboardType="default"
            />
            <TouchableOpacity style={ButtonStyle.primaryButton} onPress={handleUpdateRoom}>
                <Text style={ButtonStyle.primaryButtonText}>Salvar alterações</Text>
            </TouchableOpacity>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
})