import React from "react";
import { Text, View, StyleSheet } from "react-native";
import ButtonComponent from "../../commons/ButtonComponent";
import ModalComponent from "../../commons/ModalComponent";
import { FormatDate } from "../../../services/FormatDate";
import Loader from "../../commons/LoadingComponent";


export default function ModalValidateRdv({onRequestClose, item, heure, visible, loading, pressConfirm, pressAnnuler}){
    return(
        <ModalComponent
            visible={visible}
            animationType={'fade'}
            onRequestClose={onRequestClose}
            children={
                <View style={styles.modal}>
                    <View style={styles.modall}>
                        <Text style={styles.modalm}>Vous êtes sur le point de</Text>
                        <Text style={styles.modalm}>prendre un rendez-vous avec</Text>
                        <Text style={styles.modalm}>{item?.fullName || 'N/A'}</Text>
                    </View>
                    <Text style={styles.modalpm}>le {FormatDate( item?.date) || 'N/A'} à {heure || 'N/A'}</Text>

                    <View style={styles.btnn}>
                        <ButtonComponent
                            onPress={pressAnnuler}
                            style={styles.btnA}
                        >
                            <Text style={styles.txtA}>Annuler</Text>
                        </ButtonComponent>
                        <ButtonComponent
                            disabled={loading}
                            onPress={pressConfirm}
                            style={styles.btnO}
                        >
                            {loading ? (
                                <Loader couleur={'#00f'} />
                            ):(
                                <Text style={styles.txtO}>Confirmer</Text>
                            )}
                                
                        </ButtonComponent>
                    </View>
                </View>
            }
        />
    )
}



const styles = StyleSheet.create({
    btnn:{
        borderTopColor: 'rgba(0,0,0,0.2)',
        borderTopWidth: 1,
        // alignSelf: 'center',
        flexDirection: 'row',
        // marginHorizontal: 55,
        justifyContent: 'space-between',
        padding:10,
        marginTop:15
    },
    btnA:{
         borderRightColor: 'rgba(0,0,0,0.2)',
        borderRightWidth: 1,
        width: '50%'
    },
    btnO:{

        width: '50%',

        //  borderTopColor: 'rgba(0,0,0,0.2)',
        // borderTopWidth: 1,
    },
    txtA:{
        color: 'gray',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center'
    },
    txtO:{
        color: '#00f',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center'
    },
    modalpm:{
        color: 'gray',
        // backgroundColor: 'rgba(0,0,255,0.1)',
        padding: 15,
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal:15,
        borderRadius:10,
        borderColor:'rgba(0,0,255,0.1)',
        borderWidth:2
    },
    modall:{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        
    },
    modalm:{
        // textAlign: 'center'
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 1,
        color: 'rgba(0,0,0,0.8)'
        
    },
    modal:{
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: 'gray',
        flex: 1,
        marginVertical:310,
        marginHorizontal: 55,
        justifyContent: 'center',
        alignContent: 'center',
        gap: 5,
        borderRadius:10
        
    },
    content:{
       textAlign: 'justify'
    },

    any:{
        textAlign: 'center',
        color:'rgba(0,0,0,0.5)',
        height:100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ttt:{
        fontSize: 18,
        fontWeight: 'bold',
        color:'rgba(0,0,0,0.7)'
    },
    tt:{
        fontSize: 16,
        fontWeight: '400',
        color: 'rgba(0,0,0,0.8)'
    },
    desc:{
        gap:2
    },
    abou:{
        marginVertical:20,
        gap: 10
    },
    da:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginVertical:20
    },
    daat:{
        textAlign: 'center',
        color: 'gray'
    },
    dat:{
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    },
    btn:{
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
    },
    date:{
        fontSize: 16,
        color: '#00f',
        fontWeight: '400',
        letterSpacing: 1
    },
    heure:{
        backgroundColor: 'rgba(0,0,255,0.7)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    heureT:{
        fontWeight: 'bold',
        color:'#fff',
        fontSize: 18
    },
    infoContaind:{
        color: '#00f',
        fontSize: 18
    },
    infoContain:{
        fontWeight: 'bold',
        fontSize: 30,
        letterSpacing: 1,
        color:'rgba(0,0,0,0.7)'
    },
    infoContaineg:{
        gap: 3
    },
    infoContainSu:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(0,0,255,0.1)',
        marginVertical: 30,
        padding: 30,
        gap: 15
    },
    infoContainimg:{
        borderColor: 'gray',
        borderWidth: 1,
        padding: 60,
        borderRadius: 10,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center'
    },
    img:{
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    ico:{
        position: 'absolute',
        bottom: -10
    },
    conta:{
        marginHorizontal: 20,
        flex: 1
    }
})