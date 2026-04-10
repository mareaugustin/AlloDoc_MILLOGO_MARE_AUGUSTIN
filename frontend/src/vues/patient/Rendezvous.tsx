import React, {useState, useEffect, useMemo} from "react";
import { Text, View , StyleSheet, FlatList, Modal} from "react-native";
import HeaderComponent from "../../components/specifics/Header";
import ButtonComponent from "../../components/commons/ButtonComponent";
import { useGet } from "../../hooks/useGet";
import Icone from "../../components/commons/IconeComponent";
import {FormatDate} from '../../services/FormatDate'
import ChargementData from "../../components/commons/Chargement";
import NoData from "../../components/commons/NoData";
import CardRendezVous from "../../components/specifics/patient/CardRendezVous";
import Loader from "../../components/commons/LoadingComponent";
import { usePost } from "../../hooks/usePost";
import { getToken } from "../../services/AuthStorage";
import Toast from "react-native-toast-message";
import ErrorData from "../../components/commons/ErrorData";
import ModalConfirmation from "../../components/commons/ModalConfirmation";
import {usePut} from '../../hooks/usePut'
import {useDelete} from '../../hooks/useDelete'
import RefreshableHeader from "../../components/commons/RefreshabkeHeader";

export default function Rendezvous(){
    
    const [statut, setStatut] = useState('tous')
    const [selectRdv, setSelectRdv] = useState(null)
    const [visible, setVisible] = useState(false)
    const [visibleDelete, setVisibleDelete] = useState(false)
    const [visibleAllDelete, setVisibleAllDelete] = useState(false)

    const {loading, error, data, getData} = useGet(`/rdv/mes-rendez-vous`)
    const rendez_vous = data?.rendez_vous || []

    const {
        loading: annulerLoading, 
        error: errorAnnuler, 
        success: successAnnuler, 
        reset: resetAnnuler, 
        putData} = usePut(selectRdv ? `/rdv/annuler/${selectRdv}` : null)

    const {
        loading: loadingDelete, 
        error: errorDelete,
        success: successDelete,
        reset: resetDelete,
        deleteData} = useDelete(selectRdv ? `/rdv/supprimer/${selectRdv}` : null)

    const {
        loading: loadingAllDelete, 
        error: errorAllDelete,
        success: successAllDelete,
        reset: resetAllDelete,
        deleteData: deleteAllData} = useDelete('/rdv/supprimer-tout')

    const RendezvousFilter = useMemo(()=>{

        if(!rendez_vous || !Array.isArray(rendez_vous)) return []

        let result =rendez_vous

        if(statut === 'confirmer'){
            result = result.filter(item => (item?.statut === 'confirmé' && !item?.est_passer))
        }

        if(statut === 'annuler'){
            result = result.filter(item => (item?.statut === 'annulé'))
        }

        if(statut === 'passer'){
            result = result.filter(item => (item?.est_passer))
        }

        return result

    }, [rendez_vous, statut])

    async function handleAnnuler(id){
        if(!id) return
        const token = await getToken()
        if(!token) return
        await putData({id})
    }


     async function handleDelete(){
        const token = await getToken()
        if(!token) return
        await deleteData()
    }

    async function handleAllDelete(){
        const token = await getToken()
        if(!token) return
        await deleteAllData()
    }

    useEffect(()=>{
        if(successAnnuler){
            setVisible(false)
            getData()
            Toast.show({
                type: 'success',
                text1: 'Annualation réussie',
                text2: 'Votre rendez-vous a été annulé'
            })
            resetAnnuler()
            
        }

        if(errorAnnuler){
            setVisible(false)
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: errorAnnuler
            })
            resetAnnuler()
        }
    }, [successAnnuler, errorAnnuler])

     useEffect(()=>{
        if(successDelete){
            setVisibleDelete(false)
            getData()
            Toast.show({
                type: 'success',
                text1: 'Suppression réussie',
                text2: 'Votre rendez-vous a été supprimé'
            })
            resetDelete()
            
        }

        if(errorDelete){
            setVisibleDelete(false)
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: errorDelete
            })
            resetDelete()
        }
    }, [successDelete, errorDelete])

    useEffect(()=>{
        if(successAllDelete){
            setVisibleAllDelete(false)
            getData()
            Toast.show({
                type: 'success',
                text1: 'Suppression réussie',
                text2: 'Tous vos rendez-vous ont été supprimés'
            })
            resetAllDelete()
            
        }

        if(errorAllDelete){
            setVisibleAllDelete(false)
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: errorAllDelete
            })
            resetAllDelete()
        }
    }, [successAllDelete, errorAllDelete])

    return(
        <>
        <View style={styles.container}>
            <HeaderComponent title="Mes rendez-vous" icone="calendar" />
            <View style={styles.sdf}>
                <View style={styles.contain}>
                    <ButtonComponent
                        onPress={()=>{setStatut('tous')}}
                        style={styles.btnn}
                    >
                        <Text style={[styles.txtBtn, statut === 'tous' && styles.active]}>Tous</Text>
                    </ButtonComponent>
                    <ButtonComponent
                        onPress={()=>{setStatut('confirmer')}}
                        style={styles.btnn}
                    >
                        <Text style={[styles.txtBtn, statut === 'confirmer' && styles.active]}>Confirmés</Text>
                    </ButtonComponent>
                    <ButtonComponent
                        onPress={()=>{setStatut('annuler')}}
                        style={styles.btnn}
                    >
                        <Text style={[styles.txtBtn, statut === 'annuler' && styles.active]}>Annulés</Text>
                    </ButtonComponent>
                    <ButtonComponent
                        onPress={()=>{setStatut('passer')}}
                        style={styles.btnn}
                    >
                        <Text style={[styles.txtBtn, statut === 'passer' && styles.active]}>Passés</Text>
                    </ButtonComponent>
                </View>
                <View style={styles.hea}>
                    <ButtonComponent
                        onPress={()=>{setVisibleAllDelete(true)}}
                        style={styles.btn}
                    >
                        <Icone nom={'trash'} style={styles.txt} color={'#f00'} taille={24} />
                    </ButtonComponent>
                    <RefreshableHeader onRefresh={getData} />
                </View>
            </View>


            {loading ? (
                <ChargementData />
            ): RendezvousFilter.length === 0 ? (
                <NoData />
            ): <FlatList 
                data={RendezvousFilter}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{gap: 10, paddingBottom: 10}}
                keyExtractor={(item)=> item.id.toString()}
                renderItem={({item})=>(
                    <CardRendezVous item={item} 
                        pressAnnuler={()=>{
                            setVisible(true)
                            setSelectRdv(item.id)
                        }}
                        pressSupprimer={()=>{
                            setVisibleDelete(true)
                            setSelectRdv(item.id)
                        }}
                    />)}
                />
            }

            {error && (
                <ErrorData message={error} />
            )}
        </View>

        
        <ModalConfirmation
            visible={visible}
            onRequestClose={()=>{setVisible(!visible)}}
            pressNon={()=>{setVisible(!visible)}}
            pressOui={()=>{handleAnnuler(selectRdv)}}
            loading={annulerLoading}
        />

        <ModalConfirmation
            visible={visibleDelete}
            onRequestClose={()=>{setVisibleDelete(!visibleDelete)}}
            pressNon={()=>{setVisibleDelete(!visibleDelete)}}
            pressOui={()=>{handleDelete()}}
            loading={loadingDelete}
        />

        <ModalConfirmation
            visible={visibleAllDelete}
            onRequestClose={()=>{setVisibleAllDelete(!visibleAllDelete)}}
            pressNon={()=>{setVisibleAllDelete(!visibleAllDelete)}}
            pressOui={()=>{handleAllDelete()}}
            loading={loadingAllDelete}
        />
        </>
    )
}


const styles = StyleSheet.create({
    sdf:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    hea:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 10
    },
    btnn:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
        justifyContent: 'flex-start',
        gap:15,
        
    },
    active:{
        color: '#00f'
    },
    txtBtn:{
        fontWeight: 'bold',
        fontSize: 16
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