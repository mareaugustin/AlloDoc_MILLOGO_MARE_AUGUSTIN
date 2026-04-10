import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Accueil from "../../../vues/patient/Accueil";
import Rendezvous from "../../../vues/patient/Rendezvous";
import PrendreRdv from "../../../vues/patient/PrendreRdv";

const homeStack = createNativeStackNavigator()

export default function HomeScreen(){
    return(
        <homeStack.Navigator screenOptions={{headerShown: false}}>
            <homeStack.Screen name="accueil" component={Accueil} />
            <homeStack.Screen name="prendre-rdv" component={PrendreRdv} />
        </homeStack.Navigator>
    )
}