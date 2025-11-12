import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VideoListScreen } from './src/screens/VideoListScreen';
import { Text } from 'react-native';
import {VideoPlayerScreen} from './src/screens/VideoPlayerScreen';

const Stack = createNativeStackNavigator();

 const App = () =>{
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
  name="VideoList"
  component={VideoListScreen}
  options={{
    headerTitle: () => (
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black',alignSelf:'center' }}>
      🎥 Watch & Chill
      </Text>
    ),
    headerStyle: { backgroundColor: '#fefefe' },
  }}
/>
        <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen}
        options={({ route }) => ({
            title: route.params?.title ?? 'Player',
          })}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;