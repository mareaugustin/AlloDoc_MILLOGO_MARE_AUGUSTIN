import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Icone from "../../commons/IconeComponent";
import ButtonComponent from "../../commons/ButtonComponent";
import { FormatDate } from "../../../services/FormatDate";


export default function CardRendezAdmin({item, pressAnnuler}){
    return(
        <View style={styles.conre}>
            <View style={styles.conr}>
                <Icone nom={'calendar'} taille={38} style={styles.icon} color={'gray'}  />
                <View style={styles.tt}>
                    <Text  style={styles.ttr}>Date: {FormatDate(item?.date) || 'N/A'}</Text>
                    <Text style={styles.ttr}>Heure: {item?.heures || 'N/A'}</Text>
                </View>
            </View>
            <View style={styles.cf}>
                <Text style={styles.ttre}>Rendez vous de</Text>
                <Text style={styles.ttrr}>{item?.patient|| 'N/A'}</Text>
            </View>
            <View style={styles.cf}>
                <Text style={styles.ttre}>Avec</Text>
                <Text style={styles.ttrr}>{item?.medecin || 'N/A'}</Text>
            </View>
            <View style={styles.cf}>
                <Text style={styles.ttre}>Ordre de passage:</Text>
                <Text style={styles.ttrr}>{item?.id || 'N/A'}</Text>
            </View>
            <View style={styles.cf}>
                <Text style={styles.ttre}>Consultation:</Text>
                <Text style={styles.ttrr}>{item?.specialite || 'N/A'}</Text>
            </View>

            <View style={styles.cde}>
                <ButtonComponent
                    onPress={pressAnnuler}
                    style={[styles.btnt]}
                >
                    <Text style={styles.txtt}>Annuler le rendez vous</Text>
                </ButtonComponent>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    hidden:{
        display: 'none'
    },
    gray:{
        color: 'gray',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    red:{
        color: 'rgb(156, 0, 0)',
        backgroundColor: 'rgba(255,0,0,0.2)',
    },
    abs:{
        position: 'absolute',
        top: 5,
        right: 10,
        backgroundColor: 'rgba(0,255,0,0.2)',
        borderRadius:5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        letterSpacing: 1,
        color: 'rgb(0, 156, 0)'
    },
    cde:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 8,
        marginTop: 8
    },
    cf:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    ttre:{
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    ttrr:{
        fontWeight: 'bold',
        letterSpacing: 1,
        color: '#00f'
    },
    conre:{
        position: 'relative',
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: 'gray',
        gap: 10,
        justifyContent: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical:15
    },
    conr:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10
    },
    icon:{},
    tt:{
        gap:2
    },
    ttr:{
        fontWeight: 'bold',
        letterSpacing: 1,
        fontSize: 15
    },
    contain:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20
    },
    active:{
        color: '#00f'
    },
    txtBtn:{
        fontWeight: 'bold'
    },
    container:{
        marginHorizontal: 20,
        flex: 1
    },
    txtt:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        letterSpacing: 1
    },
    txttr:{
        color: '#f00',
        fontWeight: 'bold',
        fontSize: 15,
        letterSpacing: 1
    },
    btnt:{
        backgroundColor: '#f00',
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    btntt:{
        backgroundColor: 'rgba(255,0,0,0.2)',
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    btn:{
        backgroundColor: 'rgba(255,0,0,0.2)',
        padding: 5,
        // width: '70%',
        borderRadius: 5,
        alignSelf: 'flex-start'
    },
    txt:{
        color: '#f00',
        fontWeight: 'bold',
        letterSpacing: 1,
        // textAlign: 'center'
    }
})