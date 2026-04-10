import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Planning from "../../../vues/medecin/Planning";
import CreatePlanning from "../../../vues/medecin/CreatePlanning";
import ModifierPlanning from "../../../vues/medecin/ModifierPlanning";


const planningStack = createNativeStackNavigator()

export default function PlanningScreen(){
    return(
        <planningStack.Navigator screenOptions={{headerShown: false}}>
            <planningStack.Screen name="planning-medecin" component={Planning} />
            <planningStack.Screen name="creer-planning" component={CreatePlanning} />
            <planningStack.Screen name="edit-planning" component={ModifierPlanning} />
        </planningStack.Navigator>
    )
}