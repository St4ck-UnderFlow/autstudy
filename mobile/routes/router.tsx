import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SignIn } from '../screen/SignIn';
import { SignUp } from '../screen/SignUp';
import { Home } from '../screen/Home';
import { useToken } from '../hooks/useToken';
import { useEffect, useState } from 'react';
import { Token } from '../types/token.type';
import { useUser } from '../hooks/useUser';
import { LogOut } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import { NewRoom } from '../screen/NewRoom';

const Stack = createStackNavigator();

export function Router() {

  const { getToken, decodeToken } = useToken();
  const [ tokenDecoded, setTokenDecoded ] = useState<Token>();
  const { signOut } = useUser();

  useEffect(() => {
    const token = getToken();
    const decodedToken = decodeToken(token || '');
    if (decodedToken) {
      setTokenDecoded(decodedToken);
    }
  } , [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="NewRoom" component={NewRoom} />
        <Stack.Screen 
          options={{ 
            title: `Olá, ${tokenDecoded?.name}`,
            headerTitleStyle: {
              fontWeight: 'medium', 
            },
            headerRight: () => 
              <TouchableOpacity 
                onPress={signOut}
                style={{marginRight: 16}}
              >
                <LogOut 
                  size={20} 
                  color='red' 
                /> 
              </TouchableOpacity> 
            }} 
          name="Home" 
          component={Home} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
