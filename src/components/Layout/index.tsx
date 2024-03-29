import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Index from '../Screen/Index';
import Title from '../Title';
import Author from '../Author';

const Stack = createStackNavigator();

export default function Layout(): ReactElement {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Index"
                    component={Index}
                    options={{
                        title: '',
                        headerLeft: () => <Title />,
                        headerRight: () => <Author />,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
