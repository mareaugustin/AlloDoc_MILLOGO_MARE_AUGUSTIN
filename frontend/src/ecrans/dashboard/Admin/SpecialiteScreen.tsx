import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Accueil from "../../../vues/admin/Accueil";
import GestionRdv from "../../../vues/admin/GestionRdv";
import GestionSpecialite from "../../../vues/admin/GestionSpecialite";

const rdvStack = createNativeStackNavigator()

export default function GestionSpecialiteScreen(){
    return(
        <rdvStack.Navigator screenOptions={{headerShown: false}}>
            <rdvStack.Screen name="gestion-specialite" component={GestionSpecialite} />
        </rdvStack.Navigator>
    )
}