import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Accueil from "../../../vues/admin/Accueil";

const homeStack = createNativeStackNavigator()

export default function HomeScreen(){
    return(
        <homeStack.Navigator screenOptions={{headerShown: false}}>
            <homeStack.Screen name="accueil-admin" component={Accueil} />
        </homeStack.Navigator>
    )
}