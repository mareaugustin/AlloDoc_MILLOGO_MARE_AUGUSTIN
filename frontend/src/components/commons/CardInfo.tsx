import React from "react";
import { Text, View, StyleSheet } from "react-native";


export default function CardInfoUser({label, texte}){
    return(
        <View style={styles.titleInfo}>
            <Text style={styles.title}>{label}</Text>
            <Text style={styles.titleContain}>{texte}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    title:{
        textTransform: 'uppercase',
        color: 'rgba(0,0,0,0.5)',
        fontSize: 12,
        fontWeight: '500'
    },
    titleContain:{
        fontWeight: 'bold'
    },
    titleInfo:{
        gap: 3,
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 15,
        alignContent: 'center',
        justifyContent: 'center',

    },
})