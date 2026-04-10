import React from "react";
import ButtonComponent from "./ButtonComponent";
import Icone from "./IconeComponent";
import { View, StyleSheet, Text } from "react-native";


export default function HeaderBack({onPress, title}){
    return(
        <View style={styles.header}>
            <ButtonComponent
                onPress={onPress}
                style={styles.buutonContain}
            >
                <Icone nom={'chevron-left'} taille={20} color={'rgba(0,0,255,0.7)'} style={styles.icon}/>
            </ButtonComponent>

            <Text style={styles.detatils}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 80,
        gap: 10,
        // marginHorizontal: 35
    },
    buutonContain:{},
    icon:{
    },
    detatils:{
        fontSize: 18,
        fontWeight: 500,
        // letterSpacing: 1
    }    
})

