import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Accueil from "../../../vues/admin/Accueil";
import GestionRdv from "../../../vues/admin/GestionRdv";

const rdvStack = createNativeStackNavigator()

export default function GestionRdvScreen(){
    return(
        <rdvStack.Navigator screenOptions={{headerShown: false}}>
            <rdvStack.Screen name="gestion-rdv" component={GestionRdv} />
        </rdvStack.Navigator>
    )
}