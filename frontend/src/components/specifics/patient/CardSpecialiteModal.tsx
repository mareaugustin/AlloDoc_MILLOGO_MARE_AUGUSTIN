import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "../../commons/IconComponent";
import ButtonComponent from "../../commons/ButtonComponent";


export default function CardSpecialiteModal({item, onPress}){

    function IconeName(nom){
        if(nom === 'Cardiologue') return 'heart'
        if(nom === 'Neurologue') return 'brain'
        if(nom === 'Anesthésiste') return 'stethoscope'
        if(nom === 'Pneumologue') return 'lungs'
        if(nom === 'Dentiste') return 'tooth'
        if(nom === 'Gynécologue') return 'eye'
        if(nom === 'ORL') return 'stethoscope'
        if(nom === 'Dermatologue') return 'stethoscope'
        if(nom === 'Urologue') return 'toilet'
        if(nom === 'Radiologue') return 'stethoscope'
        if(nom === 'Chirurgien') return 'doctor'
        if(nom === 'Néphrologue') return 'stethoscope'
        if(nom === 'Hématologue') return 'stethoscope'
        if(nom === 'Gastro-entérologue') return 'stethoscope'
        if(nom === 'Oncologue') return 'ribbon'
        if(nom === 'Pédiatre') return 'baby'
        if(nom === 'Psychiatre') return 'brain'
        if(nom === 'Endocrinologue') return 'stethoscope'
        return 'stethoscope'
    }


    return(
        <ButtonComponent onPress={onPress} style={styles.containee}>
            <View style={styles.containeee}>
                <View style={styles.containep}>
                    <Icon nom={IconeName(item?.nom)} taille={28} color={'#00f'} />
                </View>
                <View style={styles.cf}>
                    <Text style={styles.specialite}>{item?.nom || 'N/A'}</Text>
                    <Text style={styles.medecins}>
                        {
                            item?.total_medecins === 0 ? 'Aucun'
                            : (item?.total_medecins > 9 && item?.total_medecins !== 0) ? item?.total_medecins 
                            : `0${item?.total_medecins}` || 'N/A'

                        } médecin{item?.total_medecins > 1 ? 's' : ''} disponible{item?.total_medecins > 1 ? 's' : ''} aujourd'hui
                    </Text>
                </View>
            </View>

            <View>
                <Text style={styles.jh}>{item?.description || 'N/A'}</Text>
            </View>
        </ButtonComponent>
    )
}


const styles = StyleSheet.create({
    cf:{
        gap:5
    },
    jh:{
        color: '#fff',
        fontWeight: '400'
    },
    containeee:{

        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    containee:{
        backgroundColor: 'rgba(0,0,255,0.7)',
        marginHorizontal:10,
        borderRadius: 10,
        padding: 15,
        gap: 10,
    },
    containep:{
        backgroundColor: '#fff',
        width: 70,
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    specialite:{
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    medecins:{
        color: '#fff',
        fontSize: 12,
         fontWeight: '600'
    }
})