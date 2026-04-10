import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import ButtonComponent from "./ButtonComponent";
import Loader from "./LoadingComponent";


export default function ModalConfirmation({onRequestClose, visible, pressNon, pressOui, loading}){
    return(
        <Modal
            visible = {visible}
            onRequestClose={onRequestClose}
            animationType="fade"
            backdropColor={'rgba(255,255,255,0.1)'}
        >
            <View style={styles.modal}>
                <View style={styles.modall}>
                    <Text style={styles.modalm}>Cette action est irréversible.</Text>
                    <Text style={styles.modalm}>Voulez - vous vraiment</Text>
                    <Text style={styles.modalm}>effectuer cette action ?</Text>
                </View>
                <View style={styles.btnn}>
                    <ButtonComponent
                        onPress={pressNon}
                        style={styles.btnA}
                    >
                        <Text style={styles.txtA}>Non</Text>
                    </ButtonComponent>
                    <ButtonComponent
                        disabled={loading}
                        onPress={pressOui}
                        style={styles.btnO}
                    >
                        {loading ? (
                            <Loader couleur={'#f00'} />
                        ):(
                            <Text style={styles.txtO}>Oui</Text>
                        )}
                            
                    </ButtonComponent>
                </View>
            </View>

        </Modal>
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
        paddingTop:5
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
        color: '#f00',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center'
    },
    modalm:{
        // textAlign: 'center'
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 1,
        color: 'rgba(0,0,0,0.8)'
        
    },
    modall:{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        
    },
    modal:{
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: 'gray',
        flex: 1,
        marginVertical:350,
        marginHorizontal: 55,
        justifyContent: 'center',
        alignContent: 'center',
        gap: 15,
        borderRadius:10
        
    },
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
        backgroundColor: '#00f',
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