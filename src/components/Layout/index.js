import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Index from '../Screen/Index';
import Title from '../Title';

const Stack = createStackNavigator();

export default function Layout() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Index"
                    component={Index}
                    options={{
                        title: '',
                        headerLeft: () => <Title />,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
