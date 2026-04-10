import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "../../commons/IconComponent";
import ButtonComponent from "../../commons/ButtonComponent";
import ImageComponent from "../../commons/ImageComponent";


export default function RenduMedecin({item, onPress}){
    return(
        <View style={styles.cont}>
            <View style={styles.infoContain}>
                <View style={styles.infoContainSu}>
                    {item?.photo_profil ? (
                        <ImageComponent source={item?.photo_profil} style={styles.img}  />
                    ):(
                        <Icon nom={'doctor'} taille={35} color={'gray'} style={styles.ico} />
                    )}
                </View>
                <View style={styles.infoCon}>
                    <Text style={styles.infoConr}>{item?.fullName || 'N/A'}</Text>
                    <Text style={styles.infoConri}>{item?.specialite || 'N/a'}</Text>
                </View>
            </View>
            <ButtonComponent
                onPress={onPress}
                style={styles.btn}
            >
                <Text style={styles.textBtn}>Prendre rendez-vous</Text>
            </ButtonComponent>
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
        gap: 15,
        padding: 10,
        borderRadius: 10
    },
    infoConr:{
        fontWeight: 'bold',
        letterSpacing: 1,
        fontSize: 16
    },
    infoConri:{
        letterSpacing: 1,
        color: '#00f',
        fontWeight: '600'
    },
    infoCon:{
        gap: 3
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
        justifyContent: 'flex-start',
        gap:8
    },
    infoContainSu:{
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 25,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    ico:{
        position: 'absolute',
        bottom: 0
    },
    
})