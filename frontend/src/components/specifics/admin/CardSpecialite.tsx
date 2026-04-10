import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ButtonComponent from "../../commons/ButtonComponent";
import Icone from "../../commons/IconeComponent";
import { FormatDate } from "../../../services/FormatDate";

export default function CardSpecialite({item, pressEdit, presseSupprimer}){
    return(
        <View style={styles.jk}>
            <View style={styles.kjj}>
                <View>
                    <Text style={styles.txe}>Nom</Text>
                    <Text style={styles.tx}>{item?.nom || 'N/A'}</Text>
                </View>
                <View>
                    <Text style={styles.txe}>Description</Text>
                    {item?.description ? (
                    <Text style={styles.tx}>{item?.description.length > 24 ? item?.description.slice(0, 24)+'...' : item?.description || 'Pas de description'}</Text>
                    ):(
                        <Text style={styles.tx}>Aucune description</Text>
                    )}
                </View>
            </View>
            <View style={styles.bout}>
                <ButtonComponent
                    onPress={pressEdit}
                    style={styles.btn}
                >
                    
                    <Icone nom={'pencil'} color={'#fff'} taille={20} />
                </ButtonComponent>
                <ButtonComponent
                    onPress={presseSupprimer}
                    style={styles.btn2}
                >
                    
                    <Icone nom={'trash'} color={'#f00'} taille={20} />
                </ButtonComponent>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    kjj:{
        gap: 5
    },
    tx:{
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 16
    },
    txe:{
        color: '#fff',
    },
    btn:{
        backgroundColor: 'rgba(255,255,255,0.3)',
        padding: 6,
        borderRadius: 3
    },
    btn2:{
        backgroundColor: 'rgba(255,0,0,0.3)',
        padding: 6,
        borderRadius: 3
    },
    bout:{
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },

    jk:{
        backgroundColor: 'rgb(93, 93, 255)',
        padding: 15,
        borderRadius:5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    error:{
        color: '#f00',
        textAlign: 'center'
    },
    hide:{
        display: 'none'
    },
    aucun:{
        color: 'gray',
        textAlign: 'center'
    },
    containn:{
        marginTop: 40,
        gap: 20,
    },
    hor:{
        backgroundColor: ''
    },
    container:{
        marginHorizontal: 20,
        flex: 1
    }
})