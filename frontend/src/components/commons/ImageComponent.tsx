import React from "react";
import { Image } from "react-native";

export default function ImageComponent({source, style}){
    return <Image source={source} style={style}/>
}