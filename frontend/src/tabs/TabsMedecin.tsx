import React, {useState} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { StyleSheet } from "react-native";
// import Icon from 'react-native-vector-icons'
import Icone from "../components/commons/IconeComponent";
import HomeScreen from "../ecrans/dashboard/medecin/HomeScreen";
import PlanningScreen from "../ecrans/dashboard/medecin/PlanningScreen";
import ProfilScreen from "../ecrans/dashboard/medecin/ProfilScreen";


const tabStack = createBottomTabNavigator()


export default function TabsMedecin(){

    // const [activeTab, setActiveTab] = useState('home')

    return(
        <tabStack.Navigator
            screenOptions = {({ route }) => ({
                tabBarIcon: ({ size, color }) => {
                    let iconName

                    if(route.name === 'Mon espace') iconName = 'home'

                    if(route.name === 'Planning') iconName = 'calendar'

                    if(route.name === 'Profil') iconName = 'user'

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
            <tabStack.Screen name="Mon espace" component={HomeScreen} />
            <tabStack.Screen name="Planning" component={PlanningScreen} />
            <tabStack.Screen name="Profil" component={ProfilScreen} />
        </tabStack.Navigator>
    )
}


const styles = StyleSheet.create({
    icon:{}
})