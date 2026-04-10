import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Accueil from "../../vues/admin/Accueil";

const adminStack = createNativeStackNavigator()

export default function AdminScreen(){
    return(
        <adminStack.Navigator screenOptions={{headerShown: false}}>
            <adminStack.Screen name="accueil" component={Accueil} />
        </adminStack.Navigator>
    )
}