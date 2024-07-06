import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView } from 'react-native';
import { Pencil, Send, Trash } from 'lucide-react-native';
import { ButtonStyle } from '../styles/Button.style';
import { InputStyle } from '../styles/Input.style';
import { io } from 'socket.io-client';
import { useToken } from '../hooks/useToken';
import { useRoom } from '../hooks/useRoom';

const socket = io('http://localhost:3333');

export function RoomChat({ route, navigation }: any) {
  const { roomId, roomTitle } = route.params;


  const { decodeToken, getToken, hasRoleInToken } = useToken();

  const [ message, setMessage ] = useState('');
  const [ messages, setMessages ] = useState<any[]>([]);
  const [ currentUserId, setCurrentUserId ] = useState('');

  const { getRoomMessages, deleteRoom } = useRoom();

  async function handleDeleteRoom() {
    await deleteRoom(roomId);
    navigation.navigate('Home' as never);
  }

  function handleUpdateRoom() {
    navigation.navigate('UpdateRoom', { roomId, roomTitle });
  }

  function setHeaderOptions() {
    navigation.setOptions({
        headerTitle: roomTitle,
        headerTitleStyle: {
          fontWeight: '500',
        },
        headerRight: () => {
          if (hasRoleInToken('room.delete') && hasRoleInToken('room.update')) {
            return (
              <View style={{ display: 'flex', flexDirection: 'row',alignItems: 'center', gap: 4 }}>
                <TouchableOpacity 
                  style={{marginRight: 16}}
                  onPress={handleUpdateRoom}
                >
                  <Pencil 
                    size={20} 
                    color='blue' 
                  /> 
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={handleDeleteRoom}
                  style={{marginRight: 16}}
                >
                  <Trash 
                    size={20} 
                    color='red' 
                  /> 
                </TouchableOpacity>
              </View>
            )
          }
        }
    });
  }

  async function loadRoomMessages() {
    const allMessages = await getRoomMessages(roomId);
    if (allMessages.length > 0) {
      setMessages(allMessages);
    }
  }

  useEffect(() => {

    setHeaderOptions()

    const tokenDecoded = decodeToken(getToken() || '');
    setCurrentUserId((tokenDecoded as any).sub);

    socket.emit('joinRoom', roomId);

    loadRoomMessages();

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

    const newMessage = { roomId, senderId: currentUserId, content: message }

    socket.emit('chatMessage', newMessage);
    setMessage('');
  }

  const renderItem = ({ item }: any) => (
    <View style={item.senderId === currentUserId ? styles.messageBySenderContainer : styles.messageByReceiverContainer}>
      <Text style={styles.senderText}>
        {item.senderId === currentUserId ? 'Você' : item.user.name}
      </Text>
      <Text style={styles.messageText}>
        {item.content}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id || Math.random().toString()}
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
          <Send size={20} color="white" />
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
