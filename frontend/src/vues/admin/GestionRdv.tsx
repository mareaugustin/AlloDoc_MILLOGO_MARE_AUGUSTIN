import React, { useEffect, useMemo, useState } from "react";
import { Text, View , StyleSheet, FlatList} from "react-native";
import HeaderComponent from "../../components/specifics/Header";
import ChargementData from "../../components/commons/Chargement";
import NoData from "../../components/commons/NoData";
import { useGet } from "../../hooks/useGet";
import { usePut } from "../../hooks/usePut";
import InputComponent from "../../components/commons/InputComponent";
import Icone from "../../components/commons/IconeComponent";
import CardRendezVous from "../../components/specifics/patient/CardRendezVous";
import ErrorData from "../../components/commons/ErrorData";
import { useGetAllPage } from "../../hooks/useGetAlllPages";
import HeaderCard from "../../components/specifics/patient/HeaderCard";
import RenderFooter from "../../components/commons/renderFooter";
import ModalComponent from "../../components/specifics/patient/ModalComponent";
import CardRendezAdmin from "../../components/specifics/medecin/CardRendezAdmin";
import ModalFormRdv from "../../components/specifics/admin/ModalForm";
import Toast from "react-native-toast-message";


export default function GestionRdv(){

    const [search, setSearch] = useState('')
    const [selectRdv, setSelectRdv] = useState(null)
    const [visible, setVisible] = useState(false)

    const [motif, setMotif] = useState('')
    const [annuler, setAnnuler] = useState(false)

    const {loading, error, data, getData} = useGet(`/admin/rdv?page=1&limit=10`)
    const rendez_vous = data?.rdv || []

    const {
        loading: annulerLoading, 
        error: errorAnnuler, 
        success: successAnnuler, 
        reset: resetAnnuler, 
        putData} = usePut(selectRdv ? `/admin/annuler/${selectRdv}` : null)

    const { 
        allData: allUserData,
        loading: loadingAllUser, 
        loadMore,
        refresh
    } = useGetAllPage(`/admin/rdv`);
    const allRdv = allUserData?.rdv || [];

    async function handleAnnuler(){
        if(!selectRdv) return
        await putData({motif})
    }

    useEffect(()=>{
        if(successAnnuler){
            setAnnuler(false)
            getData()
            Toast.show({
                type: 'success',
                text1: 'Rendez vous annuler avec succes'
            })
            resetAnnuler()
            
        }

        if(errorAnnuler){
            setAnnuler(false)
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: errorAnnuler
            })
            resetAnnuler()
        }
    }, [successAnnuler, errorAnnuler])

    
    const rendez_vousFilter = useMemo(()=>{
        if(!rendez_vous || !Array.isArray(rendez_vous)) return []

        let resultat = rendez_vous
        if(search.trim()){
            const s = search.toLowerCase()
            resultat = resultat.filter(item => (
                item?.medecin.toLowerCase().includes(s) ||
                item?.patient.toLowerCase().includes(s) ||
                item?.specialite.toLowerCase().includes(s)
            ))
        }

        return resultat
        
    },[rendez_vous, search])


    useEffect(() => {
        if (visible) {
            refresh();
        }
    }, [visible]);
        
    return(
        <>
        <View style={styles.container}>
            <HeaderComponent title="Gestion de rendez-vous" icone="calendar" />

            <View style={styles.search}>
                <InputComponent
                    value={search}
                    onChangeText={(text)=>{setSearch(text)}}
                    placeholder={'Rechercher un medecin, un patient, une specialite...'}
                    style={styles.input}
                />
                <Icone nom={'search'} taille={20} color={'rgba(0,0,0,0.2)'} style={styles.searchIcone}/>
            </View>

            <View style={styles.contain}>
                <HeaderCard
                    title="Les Rendez vous"
                    buttonText="Voir tout"
                    onPress={()=>{setVisible(true)}}
                />

                { loading ? (
                    <ChargementData />
                ): rendez_vousFilter.length === 0 ? (
                    <Text style={error ? styles.hide : styles.aucun}>
                        {search.trim() ? 'Utillisateur non trouvé' : 'Aucun utilisateur'}
                    </Text>
                    
                ):(
                <FlatList 
                    data={rendez_vousFilter}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{gap: 10, paddingBottom: 250}}
                    keyExtractor={(item)=> item.id.toString()}
                    renderItem={({item})=>(
                        <CardRendezAdmin item={item} 
                            pressAnnuler={()=>{
                                setAnnuler(true)
                                setSelectRdv(item.id)
                            }}
                        />)}
                    />
                )}

                {error && (
                    <ErrorData message={error} />
                )}
            </View>
        </View>


        <ModalComponent 
            visible={visible}
            onPress={() => {setVisible(false)}}
            title={'Tous les rendez vous'}
            data={allRdv}
            loading={loadingAllUser}
            onEndReached={loadMore}
            renderItem={({ item }) => (<CardRendezAdmin item={item} 
                pressAnnuler={()=>{
                    setAnnuler(true)
                    setSelectRdv(item.id)
                }}
            />)}
            renderFooter={<RenderFooter loading={loadingAllUser} />}
        />


        <ModalFormRdv
            visible={annuler}
            onRequestClose={()=>{setAnnuler(false)}}
            valueMotif={motif}
            onChangeText={(text)=>{setMotif(text)}}
            pressNon={()=>{setAnnuler(false)}}
            pressOui={()=>{handleAnnuler()}}
            loading={annulerLoading}
        />
        </>
    )
}


const styles = StyleSheet.create({

    jhg:{
        borderColor: '#00f',
        borderWidth: 2,
        flexDirection: 'row',
        marginTop: 30,
        gap: 10,
        alignSelf:'flex-start',
        padding: 5,
        alignItems: 'center'
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
        marginHorizontal:20,
        flex: 1
    },
    contain:{
        marginTop: 40,
        gap: 20
    }
})