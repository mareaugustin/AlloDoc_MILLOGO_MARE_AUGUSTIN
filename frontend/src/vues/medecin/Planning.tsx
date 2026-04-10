import React, { useCallback, useEffect, useState } from "react";
import { Text, View , StyleSheet, ScrollView, FlatList} from "react-native";
import HeaderComponent from "../../components/specifics/Header";
import { useGet } from "../../hooks/useGet";
import Loader from "../../components/commons/LoadingComponent";
import ErrorData from "../../components/commons/ErrorData";
import NoData from "../../components/commons/NoData";
import { FormatDate } from "../../services/FormatDate";
import HeaderCard from "../../components/specifics/patient/HeaderCard";
import ChargementData from "../../components/commons/Chargement";
import Icone from "../../components/commons/IconeComponent";
import ButtonComponent from "../../components/commons/ButtonComponent";
import CardPlannig from "../../components/specifics/medecin/CardPlannig";
import { useFocusEffect } from "@react-navigation/native";
import ModalConfirmation from "../../components/commons/ModalConfirmation";
import { useDelete } from "../../hooks/useDelete";
import Toast from "react-native-toast-message";

export default function Planning({navigation}){

    const {loading, error, data, getData} = useGet('/medecin/horaires')
    const horaires = data?.horaires || []

    const [select, setSelect] = useState(null)
    const [deleteModal, setDeleteModal] = useState(false)

    const {loading: loadingDelete, error: errorDelete, success: successDelete, deleteData, reset: resetDelete} = useDelete(select ? `/horaires/delete/${select}` : null)


    function handleCreatePlanning(){
        navigation.navigate('creer-planning')
    }



    useFocusEffect(
        useCallback(()=>{
            getData()
            
        }, [])
    )

    async function handleDelete() {
        if(!select) return
        await deleteData()
    }

    useEffect(()=>{
        if(successDelete){
            setDeleteModal(false)
            getData()
            Toast.show({
                type: 'success',
                text1: 'Horaire supprimé avec succès',
                text2: 'Vous venez de supprimer une un créneau horaire'
            })
            resetDelete()
        }

        if(errorDelete){
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: errorDelete
            })
            resetDelete()
        }
    }, [successDelete, errorDelete])


    
    return(
        <>
        <View style={styles.container}>
            <HeaderComponent title="Planning" icone="calendar" />
            
            <ButtonComponent
                style={styles.bh}
                onPress={()=>{handleCreatePlanning()}}
            >
                <Text style={styles.lkjh}>Créer un nouveau planning</Text>
            </ButtonComponent>


            <View style={styles.containn}>
                <HeaderCard
                    title="Mes plannings"
                />

                {loading ? (
                    <ChargementData />
                ): horaires.length === 0 ? (
                    <Text style={error ? styles.hide : styles.aucun}>Aucun médécin</Text>
                    
                ):(
                    <FlatList 
                        data={horaires}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{gap: 10, paddingBottom: 240}}
                        keyExtractor={(item)=>item.id.toString()}
                        renderItem={({item})=>(<CardPlannig item={item}
                            pressEdit={()=>{
                                navigation.navigate('edit-planning', {horaire: item})
                            }}
                            presseSupprimer={()=>{
                                setSelect(item.id)
                                setDeleteModal(true)
                            }}
                        />)}
                    />
                )}

                {error && (
                    <ErrorData message={error} />
                )}

                
            </View>
        </View>

        <ModalConfirmation
            visible={deleteModal}
            onRequestClose={()=>{setDeleteModal(!deleteModal)}}
            pressNon={()=>{setDeleteModal(!deleteModal)}}
            pressOui={()=>{handleDelete()}}
            loading={loadingDelete}
        />
        </>
    )
}


const styles = StyleSheet.create({
    lkjh:{
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 16
    },
    bh:{
        marginTop: 20,
        backgroundColor: '#00f',
        alignSelf: 'flex-start',
        padding: 10, borderRadius: 5
    },
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