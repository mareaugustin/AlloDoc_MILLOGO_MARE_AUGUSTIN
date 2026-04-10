import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Accueil from "../../vues/medecin/Accueil";

const medecinStack = createNativeStackNavigator()

export default function MedecinScreen(){
    return(
        <medecinStack.Navigator screenOptions={{headerShown: false}}>
            <medecinStack.Screen name="accueil" component={Accueil} />
        </medecinStack.Navigator>
    )
}