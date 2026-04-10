import React, { useCallback, useEffect, useState } from "react";
import { Text, View , StyleSheet, FlatList} from "react-native";
import HeaderComponent from "../../components/specifics/Header";
import HeaderCard from "../../components/specifics/patient/HeaderCard";
import { useGet } from "../../hooks/useGet";
import { useFocusEffect } from "@react-navigation/native";
import Loader from "../../components/commons/LoadingComponent";
import ErrorData from "../../components/commons/ErrorData";
import { useGetAllPage } from "../../hooks/useGetAlllPages";
import ChargementData from "../../components/commons/Chargement";
import ModalComponent from "../../components/specifics/patient/ModalComponent";
import RenderFooter from "../../components/commons/renderFooter";
import RenduPatient from "../../components/specifics/medecin/RenduPatient";


export default function Accueil(){

    const [visible, setVisible] = useState(false)

    const {data, loading, error, getData} = useGet(`/medecin/stats-rdv`)
    const total_rdv_today = data?.totalToday || 'N/A';

    const {data: dataPatients, loading: loadingPatients, error: errorPatients} = useGet(`/medecin/infos-patient-rdv?page=1&limit=10`)
    const patient = dataPatients?.patient || [];

    
    const { 
        allData,
        loading: loadingAllPatient, 
        loadMore,
        refresh
    } = useGetAllPage(`/medecin/infos-patient-rdv`);
    const allPatient = allData?.patient || [];

    
    useFocusEffect(
        useCallback(()=>{
            getData()
            
        }, [])
    )

    useEffect(() => {
        if (visible) {
            refresh();
        }
    }, [visible]);

    return(
        <>
        
        <View style={styles.container}>
            <HeaderComponent title="Bienvenue" icone="home" />
            
            <View style={styles.conu}>
                <View style={styles.conud}>
                    <Text style={styles.conuo}>Total Rendez-Vous prévus aujourd'hui</Text>
                    {loading ? (
                        <Loader couleur={'white'} />
                    ):(
                        <Text style={styles.conuot}>{total_rdv_today > 9 ? total_rdv_today : `0${total_rdv_today}` }</Text>
                    )} 

                     {error && (<Text style={styles.er}>{error}</Text>)}
                </View>
            </View>

            <View style={styles.contain}>
                <HeaderCard
                    title="Vos patients d'aujourd'hui"
                    buttonText="Voir tout"
                    onPress={()=>{setVisible(true)}}
                />

                {loadingPatients ? (
                    <ChargementData />
                ): patient.length === 0 ? (
                    <Text style={errorPatients ? styles.hide : styles.aucun}>Aucun Patient</Text>
                    
                ):(
                    <FlatList 
                        data={patient}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 110}}
                        keyExtractor={(item)=>item.id.toString()}
                        renderItem={({item})=>(<RenduPatient item={item}/>)}
                        
                    />
                )}

                {errorPatients && (
                    <ErrorData message={errorPatients} />
                )}

                
            </View>
        </View>

        <ModalComponent 
            visible={visible}
            onPress={() => {setVisible(false)}}
            title={'Tous les médecins'}
            data={allPatient}
            loading={loadingAllPatient}
            onEndReached={loadMore}
            renderItem={({ item }) => (<RenduPatient item={item}/>)}
            renderFooter={<RenderFooter loading={loadingAllPatient} />}
        />


        </>
    )
}


const styles = StyleSheet.create({
    hide:{
        display: 'none'
    },
    aucun:{
        color: 'gray',
        textAlign: 'center'
    },
    er:{
        color: '#f00',
        fontWeight: 'bold'
    },
    contain:{
        marginTop: 40,
        gap: 20
    },
    conud:{
        backgroundColor: 'rgba(0,0,255,0.7)',
        justifyContent: 'flex-start',
        gap: 20,
        padding: 20,
        borderRadius: 5
    },
    conu:{
        
        paddingTop: 30
    },
    conuo:{
        fontWeight: 'bold',
        fontSize: 20,
        color:'#fff'
    },
    conuot:{
        fontWeight: 'bold',
        fontSize: 18,
        backgroundColor: '#fff',
        alignSelf: 'flex-start',
        padding: 20,
        borderRadius: 15
    },
    container:{
        marginHorizontal: 20,
        flex: 1
    }
})