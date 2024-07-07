import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { TextStyle } from '../styles/Text.style';
import { RoomCard } from '../components/RoomCard';
import { LogOut, Plus, RefreshCcw } from 'lucide-react-native';
import { useLayoutEffect, useState } from 'react';
import { useRoom } from '../hooks/useRoom';
import { useToken } from '../hooks/useToken';
import { useUser } from '../hooks/useUser';
import RNPickerSelect from 'react-native-picker-select';
import { DegreeLevel } from '../types/teacher.type';


export function Home({navigation}: {navigation: any}) {

    const [ rooms, setRooms ] = useState<any[]>([])

    const [ canCreateRoom, setCanCreateRoom ] = useState(false);
    const [ canFilterRooms, setCanFilterRooms ] = useState(false);

    const { getRooms, getRoomsByDegreeLevel } = useRoom();
    const { getToken, decodeToken, hasRoleInToken, getUserType } = useToken();
    const { signOut } = useUser();

    function handleSignOut() {
        signOut();
        navigation.navigate('SignIn');
    }

    async function loadRooms() {
        const allRooms = await getRooms();
        setRooms(allRooms);
    }

    async function setHeaderOptions() {
        const token = await getToken();
        if (!token) return;

        const tokenDecoded = decodeToken(token);

        navigation.setOptions({
            headerTitle: `Olá, ${tokenDecoded?.name}`,
            headerTitleStyle: {
                fontWeight: '500',
            },
            headerRight: () => (
                <TouchableOpacity 
                  onPress={handleSignOut}
                  style={{marginRight: 16}}
                >
                  <LogOut 
                    size={20} 
                    color='red' 
                  /> 
                </TouchableOpacity>
            )
        });
    }

    async function handleFilterByDegreeLevel(degreeLevel: DegreeLevel) {
        const roomsFiltered = await getRoomsByDegreeLevel(degreeLevel);
        setRooms(roomsFiltered as any);
    }

    async function checkCanCreateRoom() {
        const can = await hasRoleInToken('room.create');
        setCanCreateRoom(can);
    }

    async function checkCanFilterRooms() {
        const isStudent = await getUserType();
        setCanFilterRooms(isStudent === 'STUDENT');
    } 

    useLayoutEffect(() => {
        setHeaderOptions();
        checkCanCreateRoom();
        checkCanFilterRooms();
        loadRooms();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{...TextStyle.text, fontWeight: 'bold', fontSize: 20}}>
                    Salas
                </Text>
                <View style={{display: 'flex', flexDirection: 'row', gap: 14, alignItems: 'center'}}>
                    {
                        canFilterRooms && (
                            <RNPickerSelect
                                onValueChange={(itemValue: DegreeLevel) => handleFilterByDegreeLevel(itemValue)}
                                items={[
                                    { label: "Bacharel", value: "BACHELORS" },
                                    { label: "Mestre", value: "MASTERS" },
                                    { label: "Doutor", value: "PHD" },
                                    { label: "Pós-Doutor", value: "POSTDOC" },
                                ]}
                                style={pickerSelectStyles}
                                placeholder={{ label: "Filtrar por Grau de Formação", value: "" }}
                            />
                        )
                    }
                    {
                        canCreateRoom && (
                            <TouchableOpacity
                                onPress={() => { navigation.navigate('NewRoom') }}
                            >
                                <Plus 
                                    size={25} 
                                    color='blue'
                                />
                            </TouchableOpacity>
                        )
                    }
                    <TouchableOpacity
                        onPress={loadRooms}
                    >
                        <RefreshCcw 
                            size={20} 
                            color='blue'
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <SafeAreaView>
                <FlatList
                    data={rooms}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('RoomChat', { roomId: item.id, roomTitle: item.title })}>
                                <RoomCard 
                                    title={item.title} 
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, 
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, 
    },
  });