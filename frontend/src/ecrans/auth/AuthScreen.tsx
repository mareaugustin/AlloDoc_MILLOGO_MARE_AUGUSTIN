import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Inscription from "../../vues/auth/Inscription";
import Connexion from "../../vues/auth/Connexion";
import VerifierEMail from "../../vues/auth/VerifierEmail.tsx";
import ResetPassword from "../../vues/auth/ResetPassword.tsx";

const AuthStack = createNativeStackNavigator()
export default function AuthScreen(){
    return(
        <AuthStack.Navigator screenOptions={{headerShown: false}}>
            <AuthStack.Screen name="inscription" component={Inscription} />
            <AuthStack.Screen name="verifier-email" component={VerifierEMail} />
            <AuthStack.Screen name="connexion" component={Connexion} />
            <AuthStack.Screen name="reset-password" component={ResetPassword} />
        </AuthStack.Navigator>
    )
}