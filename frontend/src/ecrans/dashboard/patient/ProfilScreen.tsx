import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Accueil from "../../../vues/patient/Accueil";
import Profil from "../../../vues/patient/Profil";

const profilStack = createNativeStackNavigator()

export default function ProfilScreen(){
    return(
        <profilStack.Navigator screenOptions={{headerShown: false}}>
            <profilStack.Screen name="profil" component={Profil} />
        </profilStack.Navigator>
    )
}