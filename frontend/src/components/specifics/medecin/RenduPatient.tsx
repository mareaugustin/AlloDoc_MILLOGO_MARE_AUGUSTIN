import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "../../commons/IconComponent";
import ButtonComponent from "../../commons/ButtonComponent";
import ImageComponent from "../../commons/ImageComponent";
import Icone from "../../commons/IconeComponent";
import InfoUser from "./InfoUser";


export default function RenduPatient({item}){
    return(
        <View style={styles.cont}>
            <View style={styles.infoContain}>
                <View style={styles.infoContainSu}>
                    {item?.photo_profil ? (
                        <ImageComponent source={item?.photo_profil} style={styles.img}  />
                    ):(
                        <Icone nom={'user'} taille={35} color={'gray'} style={styles.ico} />
                    )}
                </View>
                <View style={styles.infoCon}>
                    <InfoUser 
                        title={'Nom complet'}
                        content={item?.fullName || 'N/A'}
                    />
                    <InfoUser 
                        title={'Email'}
                        content={item?.email || 'N/A'}
                    />
                    <InfoUser 
                        title={'En cas de besoin'}
                        content={item?.telephone || 'N/A'}
                    />
                    <InfoUser 
                        title={'Numéro d\'orde'}
                        content={item?.id || 'N/A'}
                    />
                    
                </View>
            </View>
            <View
                style={styles.btn}
            >
                <Text style={styles.textBtn}>Prévu à {item?.heures || 'N/A'}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    img:{
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    cont:{
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical:5,
        borderRadius: 10,
        marginBottom: 20
    },
    infoConr:{
        fontWeight: 'bold',
        fontSize: 15
    },
    infoConri:{
        color: '#00f',
        fontWeight: '600'
    },
    infoCon:{
        gap: 3,
        padding: 5
    },
    btn:{
        backgroundColor: 'rgba(0,0,255,0.7)',
        padding: 8,
        borderRadius: 5
    },
    textBtn:{
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16
    },
    infoContain:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        
        gap:8
    },
    infoContainSu:{
        borderColor: 'rgba(0,0,0,0.2)',
        borderWidth: 1,
        width: 80,
        height:80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ico:{
        // position: 'absolute',
        // bottom: 0
    },
    
})