import React from "react";
import { Text, View, StyleSheet } from "react-native";
import ButtonComponent from "../../commons/ButtonComponent";
import Icone from "../../commons/IconeComponent";

export default function HeaderModal({onPress, title}){
    return(
        <View style={styles.head}>
            <Text style={styles.text}>{title}</Text>
            <ButtonComponent
                onPress={onPress}
                style={styles.bnt}
            >
                <Icone nom={'close'} taille={24} color={'gray'} />
            </ButtonComponent>
        </View>
    )
}


const styles = StyleSheet.create({

    text:{
        fontWeight: 'bold',
        fontSize: 18
    },
    head:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin:18,
    },
    bnt:{
        position: 'absolute',
        top: 5,
        right: 5
    },
    
})