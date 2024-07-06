import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SignIn } from '../screen/SignIn';
import { SignUp } from '../screen/SignUp';
import { Home } from '../screen/Home';
import { NewRoom } from '../screen/NewRoom';
import { RoomChat } from '../screen/RoomChat';

const Stack = createStackNavigator();

export function Router() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen 
          name="SignIn" 
          component={SignIn} 
          options={{headerShown: false}} 
        />

        <Stack.Screen 
          name="SignUp" 
          component={SignUp} 
          options={{headerShown: false}} 
        />

        <Stack.Screen 
          name="NewRoom" 
          component={NewRoom} 
        />

        <Stack.Screen   
          name="RoomChat" 
          component={RoomChat} 
        />

        <Stack.Screen 
          name="Home" 
          component={Home} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
