import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { TextStyle } from '../styles/Text.style';
import { RoomCard } from '../components/RoomCard';
import { Plus } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { useRoom } from '../hooks/useRoom';

export function Home({navigation}: {navigation: any}) {

    const [ rooms, setRooms ] = useState<any[]>([])

    const { getRooms } = useRoom();

    async function loadRooms() {
        const allRooms = await getRooms();
        setRooms(allRooms);
    }

    useEffect(() => {
        loadRooms();
    }, [])

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
            <SafeAreaView>
                <FlatList
                    data={rooms}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('RoomChat', { roomId: item.id, roomTitle: item.title })}>
                                <RoomCard 
                                    title={item.title} 
                                    usersAmount={item.students.length} 
                                    id={item.id} 
                                />
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
            </SafeAreaView>
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
    },
    separator: {
        height: 12,
    },
});