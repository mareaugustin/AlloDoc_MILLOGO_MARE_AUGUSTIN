import React from "react";
import { ActivityIndicator } from "react-native";

export default function Loader({couleur}){
    return <ActivityIndicator color={couleur} size={25}/>
}