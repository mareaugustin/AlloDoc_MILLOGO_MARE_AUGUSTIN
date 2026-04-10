import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome'


export default function Icone({nom, taille, style, color}){
    return <Icon name={nom} size={taille} color={color} style={style} />
}