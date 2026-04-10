import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icone from "../commons/IconeComponent";


export default function HeaderComponent({title, icone}){
    return(
        <View style={styles.container}>
            <Text style={styles.tit}>{title}</Text>
            <Icone nom={icone} taille={24} color={'gray'} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 80
    },
    tit:{
        color: 'gray',
        fontSize: 24
    }
})