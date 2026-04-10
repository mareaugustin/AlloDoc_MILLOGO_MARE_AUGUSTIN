import React from "react";
import { Text, View, StyleSheet } from "react-native";


export default function InfoUser({title, content}){
    return(
        <View>
            <Text>{title}</Text>
            <Text style={styles.infoConr}>{content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    infoConr:{
        fontWeight: 'bold',
        fontSize: 15
    },
})