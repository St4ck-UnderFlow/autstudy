import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { primaryColor } from "../styles/Global.style";

interface RoomCardProps {
    id: string;
    title: string;
    usersAmount: number;
}

export function RoomCard(props: RoomCardProps) {


    function getAlias() {
        const words = props.title.split(' '); 
        const firstLetter = words[0][0].toUpperCase();
        const secondLetter = words.length > 1 ? words[1][0].toUpperCase() : '';
        const alias = (firstLetter + secondLetter).slice(0, 2);
        return alias;
    }

    return (
        <View style={styles.container}>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                    { getAlias() }
                </Text>
            </View>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    { props.title }
                </Text>
                <Text style={styles.headerDescription}>
                    { props.usersAmount } participantes
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