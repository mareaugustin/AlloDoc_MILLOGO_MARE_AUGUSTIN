import React from "react";
import { TouchableOpacity } from "react-native";

export default function ButtonComponent({onPress, style, children, disabled}){
    return <TouchableOpacity 
                activeOpacity={0.8} 
                onPress={onPress} 
                style={style}
                disabled={disabled}
            >{children}</TouchableOpacity>
}