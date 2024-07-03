import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { primaryColor } from "../styles/Global.style";
import { LogIn } from "lucide-react-native";

export function RoomCard() {
    return (
        <View style={styles.container}>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                    EB
                </Text>
            </View>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    Estudos de Biologia
                </Text>
                <Text style={styles.headerDescription}>
                    10 participantes
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 12
    },
    avatar: {
        padding: 16,
        borderRadius: 16,
        backgroundColor: primaryColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatarText: {
        color: 'white',
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 6
    },
    headerTitle: {
        color: '#0F1828',
        fontSize: 16
    },
    headerDescription: {
        color: '#ADB5BD',
        fontSize: 14
    }
})