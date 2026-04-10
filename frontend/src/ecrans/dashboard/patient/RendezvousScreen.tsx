import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Accueil from "../../../vues/patient/Accueil";
import Profil from "../../../vues/patient/Profil";
import Rendezvous from "../../../vues/patient/Rendezvous";

const rendezvousStack = createNativeStackNavigator()

export default function RendezvousScreen(){
    return(
        <rendezvousStack.Navigator screenOptions={{headerShown: false}}>
            <rendezvousStack.Screen name="rendezvous" component={Rendezvous} />
        </rendezvousStack.Navigator>
    )
}