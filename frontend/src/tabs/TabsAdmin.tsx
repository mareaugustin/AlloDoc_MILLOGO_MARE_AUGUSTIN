import React, {useState} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { StyleSheet } from "react-native";
// import Icon from 'react-native-vector-icons'
import Icone from "../components/commons/IconeComponent";
import HomeScreen from "../ecrans/dashboard/Admin/HomeScreen";
import GestionSpecialiteScreen from "../ecrans/dashboard/Admin/SpecialiteScreen";
import GestionUserScreen from "../ecrans/dashboard/Admin/UserScreen";
import GestionRdvScreen from "../ecrans/dashboard/Admin/RendezVousScreen";


const tabStack = createBottomTabNavigator()


export default function TabsAdmin(){

    // const [activeTab, setActiveTab] = useState('home')

    return(
        <tabStack.Navigator
            screenOptions = {({ route }) => ({
                tabBarIcon: ({ size, color }) => {
                    let iconName

                    if(route.name === 'Dashboard') iconName = 'dashboard'

                    if(route.name === 'Specialites') iconName = 'stethoscope'

                    if(route.name === 'User') iconName = 'user'

                    if(route.name === 'RendezVous') iconName = 'calendar'

                    return <Icone nom={iconName} taille={size} color={color} style={styles.icon}/>
                },
                headerShown: false,
                tabBarActiveTintColor: '#00f',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { height: 90, },
                tabBarLabelStyle: { fontSize: 13 },
                tabBarItemStyle: { padding: 10 }
            })}
        >
            <tabStack.Screen name="Dashboard" component={HomeScreen} />
            <tabStack.Screen name="Specialites" component={GestionSpecialiteScreen} />
            <tabStack.Screen name="User" component={GestionUserScreen} />
            <tabStack.Screen name="RendezVous" component={GestionRdvScreen} />
        </tabStack.Navigator>
    )
}


const styles = StyleSheet.create({
    icon:{}
})