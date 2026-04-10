import React, {useState, useEffect, useMemo, useCallback} from "react";
import { Text, View , StyleSheet, FlatList, Modal, ActivityIndicator, Alert, ScrollView} from "react-native"; 
import HeaderComponent from "../../components/specifics/Header";
import TextInputComponent from "../../components/specifics/auth/TextInput";
import Icone from "../../components/commons/IconeComponent";
import InputComponent from "../../components/commons/InputComponent";
import ButtonComponent from "../../components/commons/ButtonComponent";
import HeaderCard from "../../components/specifics/patient/HeaderCard";
import {useGet} from '../../hooks/useGet'
import Loader from "../../components/commons/LoadingComponent";
import Icon from "../../components/commons/IconComponent";
import CardSpecialite from "../../components/specifics/patient/specialiteRender";
import RenduMedecin from "../../components/specifics/patient/medecinsRender";
import { getToken } from "../../services/AuthStorage";
import axios from "axios";
import { useGetUrl } from "../../hooks/useGetUrl";
import HeaderModal from "../../components/specifics/patient/HeaderModal";
import CardSpecialiteModal from "../../components/specifics/patient/CardSpecialiteModal";
import RenderFooter from "../../components/commons/renderFooter";
import ModalComponent from "../../components/specifics/patient/ModalComponent";
import {useGetAllPage} from '../../hooks/useGetAlllPages'
import ErrorData from "../../components/commons/ErrorData";
import ChargementData from "../../components/commons/Chargement";
import { useFocusEffect } from "@react-navigation/native";

export default function Accueil({navigation}){

    const [search, setSearch] = useState('')
    const [visible, setVisible] = useState(false)
    const [visibleS, setVisibleS] = useState(false)
    const [visibleSpecialiteM, setVisibleSpecialiteM] = useState(false)
    const [selectSpecialite, setSelectSpecialite] = useState(null)

    const {data, loading, error, getData} = useGet(`/specialites/listes-avec-medecins?page=1&limit=10`)
    const specialites = data?.specialites || [];

    const {data: dataM, loading: loadingM, error: errorM} = useGet(`/specialites/medecin-specialite?page=1&limit=10`)
    const medecins = dataM?.medecins || [];

    
    const { 
        allData: allSpecialitesData,
        loading: loadingAllSpecialites, 
        loadMore: loadMoreS,
        refresh: refreshS 
    } = useGetAllPage(`/specialites/listes-avec-medecins`);
    const allSpecialites = allSpecialitesData?.specialites || [];

    
    const { 
        allData: allMedecinsData,
        loading: loadingAllMedecins, 
        loadMore: loadMoreM,
        refresh: refreshM 
    } = useGetAllPage(`/specialites/medecin-specialite`);
    const allMedecins = allMedecinsData?.medecins || [];

    const specialiteId = selectSpecialite?.id;
    const { 
        allData: allSpecialiteMedecinsData,
        loading: loadingSMData, 
        loadMore: loadMoreSMData,
        refresh: refreshSMData 
    } = useGetAllPage(
        specialiteId ? `/specialites/specialite/${specialiteId}/medecin` : null
    );
    const allSpecialiteMedecins = allSpecialiteMedecinsData?.medecins || [];

    useFocusEffect(
        useCallback(()=>{
            getData()
            
        }, [])
    )
    
    useEffect(() => {
        if (visible) {
            refreshM();
        }
    }, [visible]);

    useEffect(() => {
        if (visibleS) {
            refreshS();
        }
    }, [visibleS]);

    useEffect(() => {
        if (visibleSpecialiteM && selectSpecialite?.id) {
            refreshSMData();
        }
    }, [visibleSpecialiteM, selectSpecialite]);

    const specialitesFiltres = useMemo(()=>{
        if(!specialites || !Array.isArray(specialites)) return []

        let resultat = specialites
        if(search.trim()){
            const s = search.toLowerCase()
            resultat = resultat.filter(item => (
                item?.nom.toLowerCase().includes(s)
            ))
        }

        return resultat
        
    },[specialites, search])
    

    function handleRdv(item){
        if(!item) return
        if(visible){
            setVisible(!visible)
            navigation.navigate('prendre-rdv', {medecin: item})
        }

        if(visibleSpecialiteM){
            setVisibleSpecialiteM(!visibleSpecialiteM)
            navigation.navigate('prendre-rdv', {medecin: item})
        }

        navigation.navigate('prendre-rdv', {medecin: item})
    }

  
    return(
        <>
        <View style={styles.container}>
            <HeaderComponent title="Bienvenue" icone="home" />
            <View style={styles.search}>
                <InputComponent
                    value={search}
                    onChangeText={(text)=>{setSearch(text)}}
                    placeholder={'Rechercher une specialite...'}
                    style={styles.input}
                />
                <Icone nom={'search'} taille={20} color={'rgba(0,0,0,0.2)'} style={styles.searchIcone}/>
            </View>
        

            <View style={styles.contain}>
                <HeaderCard
                    title="Nos specialites"
                    buttonText="Voir tout"
                    onPress={()=>{setVisibleS(true)}}
                />

                {loading ? (
                    <ChargementData />
                ): specialitesFiltres.length === 0 ? (
                    <Text style={error ? styles.hide : styles.aucun}>
                        {search.trim() ? 'Spécialité non trouvé' : 'Aucune spécialité pour le moment'}
                    </Text>
                    
                ):(
                    <FlatList 
                        data={specialitesFiltres}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{gap: 10}}
                        keyExtractor={(item)=>item.id.toString()}
                        renderItem={({item})=>(<CardSpecialite item={item} onPress={()=>{
                            setSelectSpecialite(item)
                            setVisibleSpecialiteM(true)
                        }}/>)}
                        
                    />
                )}

                {error && (
                    <ErrorData message={error} />
                )}

                
            </View>

            
            <View style={[styles.containn, search.trim() ? styles.m : styles.b ]}>
                <HeaderCard
                    title="Médécins disponibles aujourd'hui"
                    buttonText="Voir tout"
                    onPress={()=>{setVisible(true)}}
                />

                {loadingM ? (
                    <ChargementData />
                ): medecins.length === 0 ? (
                    <Text style={error ? styles.hide : styles.aucun}>Aucun médécin</Text>
                    
                ):(
                    <FlatList 
                        data={medecins}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{gap: 10}}
                        keyExtractor={(item)=>item.id.toString()}
                        renderItem={({item})=>(<RenduMedecin item={item} onPress={()=>{handleRdv(item)}}/>)}
                        
                    />
                )}

                {errorM && (
                    <ErrorData message={errorM} />
                )}

                
            </View>
        </View>

        <ModalComponent 
            visible={visible}
            onPress={() => {setVisible(false)}}
            title={'Tous les médecins'}
            data={allMedecins}
            loading={loadingAllMedecins}
            onEndReached={loadMoreM}
            renderItem={({ item }) => (<RenduMedecin item={item} onPress={()=>{handleRdv(item)}} />)}
            renderFooter={<RenderFooter loading={loadingAllMedecins} />}
        />

        <ModalComponent 
            visible={visibleS}
            onPress={() => {setVisibleS(false)}}
            title={'Toutes les spécialités'}
            data={allSpecialites}
            loading={loadingAllSpecialites}
            onEndReached={loadMoreS}
            renderItem={({ item }) => (<CardSpecialiteModal item={item} onPress={()=>{
                setSelectSpecialite(item)
                setVisibleS(false)
                setVisibleSpecialiteM(true)
            }}/>)}
            renderFooter={<RenderFooter loading={loadingAllSpecialites} />}
        />

        <ModalComponent 
            visible={visibleSpecialiteM}
            onPress={() => {setVisibleSpecialiteM(false)}}
            title={selectSpecialite?.nom || 'N/A'}
            data={allSpecialiteMedecins}
            loading={loadingSMData}
            onEndReached={loadMoreSMData}
            renderItem={({ item }) => (<RenduMedecin item={item} onPress={()=>{handleRdv(item)}} />)}
            renderFooter={<RenderFooter loading={loadingSMData} />}
        />

        </>
    )
}


const styles = StyleSheet.create({
    footer: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    loadingText: {
        color: 'gray',
        marginTop: 5,
    },
    endText: {
        textAlign: 'center',
        color: 'gray',
        paddingVertical: 10,
    },
    text:{
        fontWeight: 'bold',
        fontSize: 18
    },
    head:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin:18,
    },
    bnt:{
        position: 'absolute',
        top: 5,
        right: 5
    },
    modal:{
        backgroundColor: '#fff',
        flex: 1,
        marginTop: 70,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        position:'relative',
    },
    b:{
        marginBottom: 485
    },
    m:{
        marginBottom: 350
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
        backgroundColor: 'rgba(0,0,255,0.6)',
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
    container:{
        marginHorizontal: 20,
        flex: 1
    },
    input:{
        backgroundColor: '#fff',
        paddingLeft: 40,
        paddingRight: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgba(0,0,255,0.6)'
    },
    searchIcone:{
        position: 'absolute',
        top: 40,
        left: 10,

    },
    search:{
        position: 'relative',
        paddingTop: 30,
    },
    contain:{
        marginTop: 40,
        gap: 20
    },
    containn:{
        marginTop: 40,
        gap: 20,
    },
    containe:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title:{
        fontWeight: 'bold',
        fontSize: 20
    },
    buttonText:{
        color: '#00f',
        fontSize: 18
    },
    containee:{
        backgroundColor: 'rgba(0,0,255,0.7)',
        width: 180,
        height: 150,
        borderRadius: 10,
        padding: 15,
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center'
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
        fontWeight: '600'
    },
    medecins:{
        color: '#fff',
        fontSize: 14,
         fontWeight: '400'
    }
})