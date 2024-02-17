import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingsScreen from '../screens/SettingsScreen';
import PhotoScreen from '../screens/PhotoScreen';
import HomeScreen from '../screens/HomeScreen';
import BottomTabNavigation from './BottomTabNavigation';
import { useColorScheme } from 'react-native';

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
    const colorScheme = useColorScheme();
    return (
        <Drawer.Navigator
        screenOptions={{
            headerShown: false,
            drawerStyle: {
                backgroundColor: (colorScheme === "light" ? 'white' : 'green'),
             
            }
        }}

        >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="PhotoScreen" component={PhotoScreen} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation
