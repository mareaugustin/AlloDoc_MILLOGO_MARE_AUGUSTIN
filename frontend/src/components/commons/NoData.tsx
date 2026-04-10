import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icone from "./IconeComponent";

export default function NoData(){
    return(
        <View style={styles.any}>
            <Icone nom={'folder-open'} taille={40} color={'rgba(0,0,0,0.2)'} />
            <Text style={styles.aucun}>Aucune donnée</Text>
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
        color: 'rgba(0,0,0,0.4)',
        textAlign: 'center',
        fontSize: 18,
        letterSpacing: 1
    }
})