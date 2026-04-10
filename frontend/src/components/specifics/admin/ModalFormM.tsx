import React, { useState } from "react";
import { Modal, View, Text, StyleSheet, ScrollView } from "react-native";
import ButtonComponent from "../../commons/ButtonComponent";
import Loader from "../../commons/LoadingComponent";
import InputComponent from "../../commons/InputComponent";

export default function ModalFormM({onRequestClose, visible, pressNon, pressOui, loading, valueNom, valueEmail, valuePass, onChangeTextN, onChangeTextP, onChangeTextE, specialites = [],
    selectedSpecialite,
    onSelectSpecialite}){

    const [openSelect, setOpenSelect] = useState(false)

    return(
        <Modal
            visible = {visible}
            onRequestClose={onRequestClose}
            animationType="fade"
            backdropColor={'rgba(255,255,255,0.1)'}
        >
            <View style={styles.modal}>
                <View style={styles.ljk}>
                <View style={styles.modall}>
                    
                    <View>
                        <Text>Nom</Text>
                        <InputComponent 
                            value={valueNom}
                            
                            onChangeText={onChangeTextN}
                            placeholder={'Ecrire ici...'}
                            style={styles.input}
                        />
                    </View>

                    <View>
                        <Text>Email</Text>
                        <InputComponent 
                            value={valueEmail}
                            onChangeText={onChangeTextE}
                            placeholder={'Ecrire ici...'}
                            style={styles.input}
                        />
                    </View>

                    <View>
                        <Text>Mot de passe</Text>
                        <InputComponent 
                            value={valuePass}
                            onChangeText={onChangeTextP}
                            placeholder={'Ecrire ici...'}
                            style={styles.input}
                        />
                    </View>

                    <View>
                        <Text>Choisir specialté</Text>

                        <Text
                            onPress={()=>setOpenSelect(true)}
                            style={{
                                borderWidth: 1,
                                padding: 10,
                                marginTop: 5,
                                backgroundColor: '#eee'
                            }}
                        >
                            {selectedSpecialite 
                                ? specialites.find(s => s.id === selectedSpecialite)?.nom 
                                : 'Sélectionner une spécialité'}
                        </Text>
                    </View>
                </View>
                <View style={styles.btnn}>
                    <ButtonComponent
                        onPress={pressNon}
                        style={styles.btnA}
                    >
                        <Text style={styles.txtA}>Annuler</Text>
                    </ButtonComponent>
                    <ButtonComponent
                        disabled={loading}
                        onPress={pressOui}
                        style={styles.btnO}
                    >
                        {loading ? (
                            <Loader couleur={'#00f'} />
                        ):(
                            <Text style={styles.txtO}>Enregistrer</Text>
                        )}
                            
                    </ButtonComponent>
                </View>
            </View>
            </View>

            <Modal
                visible={openSelect}
                transparent={true}
                animationType="fade"
            >
                <View style={{
                    flex:1,
                    backgroundColor:'rgba(0,0,0,0.3)',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <View style={{
                        width:'80%',
                        backgroundColor:'#fff',
                        borderRadius:10,
                        padding:10,
                        maxHeight:300
                    }}>
                        <ScrollView>
                            {specialites.map(item => (
                                <Text
                                    key={item.id}
                                    onPress={()=>{
                                        onSelectSpecialite(item.id)
                                        setOpenSelect(false)
                                    }}
                                    style={{
                                        padding:10,
                                        borderBottomWidth:1,
                                        borderColor:'#eee'
                                    }}
                                >
                                    {item.nom}
                                </Text>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>

        </Modal>
    )
}


const styles = StyleSheet.create({
    ljk:{
         width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    gap: 15
    },
    input:{
        borderWidth: 1,
        padding: 3,
        borderColor: 'gray',
        paddingLeft: 10,
        marginVertical: 8
    },
    btnn:{
        borderTopColor: 'rgba(0,0,0,0.2)',
        borderTopWidth: 1,
        // alignSelf: 'center',
        flexDirection: 'row',
        // marginHorizontal: 55,
        justifyContent: 'space-between',
        paddingTop:15
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
    modalm:{
        // textAlign: 'center'
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 1,
        color: 'rgba(0,0,0,0.8)'
        
    },
    modall:{
        gap: 3,
        
    },
    modal:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)'
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