import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react'
import InitialScreen from '../screens/InitialScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { useColorScheme } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import LoadingScreen from '../screens/LoadingScreen';
import BottomTabNavigation from './BottomTabNavigation';
import SettingsScreen from '../screens/SettingsScreen';
import UserInformationScreen from '../screens/UserInformationScreen';

const Stack = createStackNavigator();

function StackNavigationInitial() {

    const colorScheme = useColorScheme();

    const { status } = useContext(AuthContext);

    if (status === 'cheking') return <LoadingScreen />

    return (
        <Stack.Navigator

            screenOptions={{

                headerShown: false,
                cardStyle: {
                    backgroundColor: colorScheme === 'light' ? 'transparent' : 'black',
                },
            }}>

            {
                (status !== 'authenticated')
                    ? (
                        <>
                            <Stack.Screen name="InitialScreen" component={InitialScreen} />
                            <Stack.Screen name="LoginScreen" component={LoginScreen} />
                            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation} />
                            <Stack.Screen name="Settings" component={SettingsScreen} />
                            <Stack.Screen name="UserInformationScreen" component={UserInformationScreen} />
                        </>
                    )
            }


        </Stack.Navigator>
    )
}

export default StackNavigationInitial
