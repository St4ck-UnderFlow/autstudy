import { View, Text, StyleSheet } from 'react-native';
import { TextStyle } from '../styles/Text.style';
import { RoomCard } from '../components/RoomCard';

export function Home() {

    return (
        <View style={styles.container}>
            <Text style={{...TextStyle.text, fontWeight: 'bold'}}>
               Salas
            </Text>
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
    }
  });