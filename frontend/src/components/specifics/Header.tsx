import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icone from "../commons/IconeComponent";
import ButtonComponent from "../commons/ButtonComponent";


export default function HeaderComponent({title, icone, onPress}){
    return(
        <View style={styles.container}>
            <Text style={styles.tit}>{title}</Text>
            <ButtonComponent
                onPress={onPress}
            >
                <Icone nom={icone} taille={24} color={'gray'} />
            </ButtonComponent>
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