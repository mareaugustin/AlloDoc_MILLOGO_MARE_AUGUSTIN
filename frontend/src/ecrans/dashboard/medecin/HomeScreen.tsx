import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Accueil from "../../../vues/medecin/Accueil";

const homeStack = createNativeStackNavigator()

export default function HomeScreen(){
    return(
        <homeStack.Navigator screenOptions={{headerShown: false}}>
            <homeStack.Screen name="accueil-medecin" component={Accueil} />
        </homeStack.Navigator>
    )
}