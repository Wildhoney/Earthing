import React from 'react';
import Index from './components/Screen/Index';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Index"
                    component={Index}
                    options={{
                        title: 'Places',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
