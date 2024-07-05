import { FormEvent, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView } from 'react-native';
import { Send } from 'lucide-react-native';
import { ButtonStyle } from '../styles/Button.style';
import { InputStyle } from '../styles/Input.style';
import { useNavigation } from '@react-navigation/native';
import { io } from 'socket.io-client';
import { useToken } from '../hooks/useToken';

const socket = io('http://localhost:3333');

export function RoomChat({ route }: any) {

  const { roomId, roomTitle } = route.params; 

  const navigation = useNavigation();
  const { decodeToken, getToken } = useToken();


  const [ message, setMessage ] = useState('');
  const [ messages, setMessages ] = useState<any[]>([]);
  const [ currentUserId, setCurrentUserId ] = useState('');

  useEffect(() => {

    navigation.setOptions({
      headerTitle: roomTitle,
    });

    const tokenDecoded = decodeToken(getToken() || '');

    setCurrentUserId((tokenDecoded as any).sub);

    socket.emit('joinRoom', roomId); 

    socket.on('chatMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('chatMessage');
    };
  }, []);

  function sendMessage() {
    if (message.trim() === '') {
      return;
    }
    setMessage('');
    socket.emit('chatMessage', ({ roomId, senderId: currentUserId, message }));
  };

  const renderItem = ({ item }: any) => (
      <View style={item.senderId === currentUserId ? styles.messageBySenderContainer : styles.messageByReceiverContainer}>
      <Text style={styles.senderText}>{item.senderId === currentUserId ? 'Você' : 'Vinícius'}</Text>
      <Text style={styles.messageText}>{item.message}</Text>
      </View>
  );

  return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.messagesList}
        />
        <View style={styles.messageInputContainer}>
            <TextInput
                style={{ ...InputStyle.input, flex: 1 }}
                value={message}
                onChangeText={setMessage}
                placeholder="Digite sua mensagem"
                autoCapitalize="none"
                keyboardType="default"
            />
            <TouchableOpacity style={styles.sendMessageButton} onPress={sendMessage}>
            <Send size={20} color='white' />
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  messagesList: {
    flex: 1,
    marginBottom: 10,
  },
  messageInputContainer: {
    display: 'flex',
    gap: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sendMessageButton: {
    ...ButtonStyle.primaryButton,
    padding: 12,
  },
  messageBySenderContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    marginVertical: 5,
    maxWidth: '70%',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  messageByReceiverContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#60a5fa',
    padding: 12,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    marginVertical: 5,
    maxWidth: '70%',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  senderText: {
    fontSize: 12,
    color: '#efefef',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    color: 'white',
  },
});