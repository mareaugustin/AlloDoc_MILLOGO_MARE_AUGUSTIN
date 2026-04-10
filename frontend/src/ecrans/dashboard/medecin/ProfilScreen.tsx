import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profil from "../../../vues/medecin/Profil";

const profilStack = createNativeStackNavigator()

export default function ProfilScreen(){
    return(
        <profilStack.Navigator screenOptions={{headerShown: false}}>
            <profilStack.Screen name="profil-medecin" component={Profil} />
        </profilStack.Navigator>
    )
}