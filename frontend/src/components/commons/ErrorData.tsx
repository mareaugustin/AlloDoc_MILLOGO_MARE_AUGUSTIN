import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icone from "./IconeComponent";
import Icon from "./IconComponent";

export default function ErrorData({message}){
    return(
        <View style={styles.any}>
            <Icone nom={'times-circle'} taille={40} color={'rgba(255,0,0,0.8)'} />
            <Text style={styles.aucun}>{message || 'Une erreur est survenue'}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    any:{
        flex: 1/2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    aucun:{
        color: '#f00',
        textAlign: 'center',
        fontSize: 18,
        letterSpacing: 1
    }
})