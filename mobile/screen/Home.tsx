import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextStyle } from '../styles/Text.style';
import { RoomCard } from '../components/RoomCard';
import { Plus } from 'lucide-react-native';

export function Home({navigation}: {navigation: any}) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{...TextStyle.text, fontWeight: 'bold', fontSize: 20}}>
                    Salas
                </Text>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('NewRoom') }}
                >
                    <Plus 
                        size={20} 
                        color='black'
                    />
                </TouchableOpacity>
            </View>
            <RoomCard />
            <RoomCard />
            <RoomCard />
            <RoomCard />
            <RoomCard />
            <RoomCard />
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
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});