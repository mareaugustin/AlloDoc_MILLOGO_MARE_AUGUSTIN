import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ButtonComponent from "../../commons/ButtonComponent";
import Icone from "../../commons/IconeComponent";
import { FormatDate } from "../../../services/FormatDate";

export default function CardPlannig({item, pressEdit, presseSupprimer}){
    return(
        <View style={styles.jk}>
            <View style={styles.kjj}>
                <View>
                    <Text>Jour</Text>
                    <Text style={styles.tx}>{FormatDate(item?.date) || 'Rien'}</Text>
                </View>
                <View>
                    <Text>Heure</Text>
                    <Text style={styles.tx}>{item?.heures || 'Rien'}</Text>
                </View>
            </View>
            <View style={styles.bout}>
                <ButtonComponent
                    onPress={pressEdit}
                    style={styles.btn}
                >
                    
                    <Icone nom={'pencil'} color={'#00f'} taille={20} />
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
        fontSize: 16
    },
    btn:{
        backgroundColor: 'rgba(0,0,255,0.2)',
        padding: 6,
        borderRadius: 3
    },
    btn2:{
        backgroundColor: 'rgba(255,0,0,0.2)',
        padding: 6,
        borderRadius: 3
    },
    bout:{
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },

    jk:{
        backgroundColor: '#fff',
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