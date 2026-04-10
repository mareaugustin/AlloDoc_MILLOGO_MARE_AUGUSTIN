import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Accueil from "../../vues/patient/Accueil";

const patientStack = createNativeStackNavigator()

export default function PatientScreen(){
    return(
        <patientStack.Navigator screenOptions={{headerShown: false}}>
            <patientStack.Screen name="accueil" component={Accueil} />
        </patientStack.Navigator>
    )
}