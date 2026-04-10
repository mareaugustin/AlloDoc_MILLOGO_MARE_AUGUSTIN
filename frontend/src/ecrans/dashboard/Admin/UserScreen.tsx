import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Accueil from "../../../vues/admin/Accueil";
import GestionRdv from "../../../vues/admin/GestionRdv";
import GestionSpecialite from "../../../vues/admin/GestionSpecialite";
import GestionUser from "../../../vues/admin/GestionUser";
import GestionMedecin from "../../../vues/admin/GestionMedecin";

const rdvStack = createNativeStackNavigator()

export default function GestionUserScreen(){
    return(
        <rdvStack.Navigator screenOptions={{headerShown: false}}>
            <rdvStack.Screen name="gestion-user" component={GestionUser} />
            <rdvStack.Screen name="gestion-medecin" component={GestionMedecin} />
        </rdvStack.Navigator>
    )
}