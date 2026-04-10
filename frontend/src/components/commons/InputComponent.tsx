import React from "react";
import { TextInput } from "react-native";


export default function InputComponent({value, onChangeText, placeholder, style}){

    return <TextInput 
                secureTextEntry={false}
                value={value}
                onChangeText={onChangeText}
                style={style}
                placeholder={placeholder}
            />
}