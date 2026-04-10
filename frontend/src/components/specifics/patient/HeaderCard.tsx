import React from "react";
import ButtonComponent from "../../commons/ButtonComponent";
import { Text, View, StyleSheet } from "react-native";


export default function HeaderCard({onPress, title, buttonText}){
    return(
        <View style={styles.containe}>
            <Text style={styles.title}>{title}</Text>
            <ButtonComponent
                onPress={onPress}

            >
                <Text style={styles.buttonText}>{buttonText}</Text>
            </ButtonComponent>
        </View>
    )
}

const styles = StyleSheet.create({
    
    containe:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title:{
        fontWeight: 'bold',
        fontSize: 18
    },
    buttonText:{
        color: '#00f',
        fontSize: 16
    }
    
})