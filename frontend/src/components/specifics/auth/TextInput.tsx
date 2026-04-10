import React from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";
import Icone from "../../commons/IconeComponent";

export default function TextInputComponent({value, onChangeText, placeholder, icone, secureTextEntry, erreur, message}){
    return(
        <View style={styles.inputCont}>
            <TextInput
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={onChangeText}
                style={styles.input}
                placeholder={placeholder}
            />
            <Icone nom={icone} taille={25} color={'gray'} style={styles.icon}  />
            {erreur && (
                <Text style={styles.error}>{message}</Text>
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    input:{
        borderColor: '#00f',
        borderRadius: 10,
        borderWidth: 2,
        position: 'relative',
        paddingHorizontal: 40,
        fontSize: 16
    },
    icon:{
        position: 'absolute',
        top: 10,
        left: 10
    },
    error:{
        color: '#f00'
    },
    inputCont:{
        
        marginHorizontal: 35,
    },
})