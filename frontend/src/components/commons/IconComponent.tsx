import React from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function Icon({nom, taille, style, color}){
    return <MaterialCommunityIcons name={nom} size={taille} color={color} style={style} />
}