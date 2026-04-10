import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../../vues/welcome/Welcome";

const welcomeStack = createNativeStackNavigator()
export default function WelcomeScreen(){
    return(
        <welcomeStack.Navigator screenOptions={{headerShown: false}}>
            <welcomeStack.Screen name="welcome-view" component={Welcome} />
        </welcomeStack.Navigator>
    )
}