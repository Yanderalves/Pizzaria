import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import SignIn from '../screens/SignIn'

const Stack = createStackNavigator();

export default function AuthRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='SignIn' component={SignIn} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

