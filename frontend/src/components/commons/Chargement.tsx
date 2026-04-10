import React from "react";
import Loader from "./LoadingComponent";
import { Text, StyleSheet, View } from "react-native";


export default function ChargementData(){
    return(
        <View style={styles.any}>
            <Loader couleur={'#00f'} />
            <Text style={styles.aucun}>Chargement des données</Text>
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