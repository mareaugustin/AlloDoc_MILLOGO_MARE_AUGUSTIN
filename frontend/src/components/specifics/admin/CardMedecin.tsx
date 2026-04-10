import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "../../commons/IconComponent";
import ButtonComponent from "../../commons/ButtonComponent";
import ImageComponent from "../../commons/ImageComponent";
import Icone from "../../commons/IconeComponent";


export default function CardMedecin({item, onPress, onPressEdit}){
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
                    <Text style={styles.infoConr}>{item?.fullName || 'N/A'}</Text>
                    <Text style={styles.infoConri}>{item?.email || 'N/a'}</Text>
                    <Text style={styles.infoConri}>{item?.specialite || 'N/a'}</Text>
                </View>
            </View>

            <View style={styles.textBtnlk}>
                <ButtonComponent
                    onPress={onPressEdit}
                    style={styles.btnk}
                >
                    
                    <Text style={styles.textBtn}>
                       Modifier les infos</Text>
                </ButtonComponent>
                <ButtonComponent
                    onPress={onPress}
                    style={[styles.btn, item?.est_actif && styles.actif]}
                >
                    
                    <Text style={styles.textBtn}>
                        {item?.est_actif ? 'Désactiver le compte' : 'Activer le compte'}</Text>
                </ButtonComponent>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    textBtnlk:{
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center'
    },
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
    actif:{
        backgroundColor: '#f00',
        padding: 8,
        borderRadius: 5
    },
    btn:{
        backgroundColor: '#0f0',
        padding: 8,
        borderRadius: 5
    },
    btnk:{
        backgroundColor: '#00f',
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