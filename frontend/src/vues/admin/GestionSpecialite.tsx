import React, { useEffect, useMemo, useState } from "react";
import { Text, View , StyleSheet, FlatList, Modal} from "react-native";
import HeaderComponent from "../../components/specifics/Header";
import { useGet } from "../../hooks/useGet";
import { useGetAllPage } from "../../hooks/useGetAlllPages";
import ModalComponent from "../../components/specifics/patient/ModalComponent";
import HeaderCard from "../../components/specifics/patient/HeaderCard";
import ChargementData from "../../components/commons/Chargement";
import CardSpecialite from "../../components/specifics/admin/CardSpecialite";
import ErrorData from "../../components/commons/ErrorData";
import CardSpecialiteModal from "../../components/specifics/patient/CardSpecialiteModal";
import RenderFooter from "../../components/commons/renderFooter";
import InputComponent from "../../components/commons/InputComponent";
import Icone from "../../components/commons/IconeComponent";
import ModalConfirmation from "../../components/commons/ModalConfirmation";
import { useDelete } from "../../hooks/useDelete";
import { getToken } from "../../services/AuthStorage";
import Toast from "react-native-toast-message";
import ButtonComponent from "../../components/commons/ButtonComponent";
import ModalForm from "../../components/commons/ModalForm";
import { usePost } from "../../hooks/usePost";
import { usePut } from "../../hooks/usePut";


export default function GestionSpecialite(){
    const [formData, setFormData] = useState({
        nom: "",
        description: ""
    })
    const [ajout, setAjout] = useState(false)
    const [edit, setEdit] = useState(false)
    const [search, setSearch] = useState('')
    const [visibleS, setVisibleS] = useState(false)
    const [select, setSelect] = useState(null)
    const [visible, setVisible] = useState(false)
    const [visibleDelete, setVisibleDelete] = useState(false)
    const [selectSpecialite, setSelectSpecialite] = useState(null)

    const {data, loading, error, getData} = useGet(`/admin/specialites/tous?page=1&limit=10`)
    const specialites = data?.specialites || [];

    const { 
        allData: allSpecialitesData,
        loading: loadingAllSpecialites, 
        loadMore: loadMoreS,
        refresh: refreshS 
    } = useGetAllPage(`/admin/specialites/tous`);
    const allSpecialites = allSpecialitesData?.specialites || [];

    const {
        loading: loadingDelete, 
        error: errorDelete,
        success: successDelete,
        reset: resetDelete,
        deleteData} = useDelete(select ? `/specialites/supprimer/${select}` : null)

    const {loading: ajoutLoad, success, error: errorAjou, postData, reset} = usePost('/specialites/ajouter')
    

    const {
        loading: editLoading, 
        error: errorEdit, 
        success: editSuccess, 
        putData: editPut, 
        reset: editReset} = usePut(select ? `/specialites/modifier/${select.id}` : null)

    useEffect(() => {
        if(select){
            setFormData({
                nom: select.nom || '',
                description: select.description || ''
            })
        }
    }, [select])

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

    

     useEffect(() => {
        if (visibleS) {
            refreshS();
        }
    }, [visibleS]);




    useEffect(()=>{
        if(successDelete){
            setVisibleDelete(false)
            getData()
            Toast.show({
                type: 'success',
                text1: 'Suppression réussie',
                text2: 'La specialité a été supprimé'
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


    function formValidate(){
        if(!formData.nom.trim()) return false
        return true
    }

    function handleChange(name, value){
        setFormData({...formData, [name]: value})
    }

    async function handleAjout(){
        if (!formValidate()) return
        const token = await getToken()
        if(!token) return
        await postData(formData,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        
        
    }

    async function handleDelete(){
        const token = await getToken()
        if(!token) return
        await deleteData()
    }

    async function handleEdit(){
        if(!formValidate()) return
        await editPut(formData)
    }

    useEffect(()=>{
        if(success){
            setAjout(false)
            getData()
            Toast.show({
                type: 'success',
                text1: 'Ejout réussie',
                text2: 'La specialité a été ajoutée'
            })
            resetDelete()
            
        }

        if(errorAjou){
            setAjout(false)
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: errorAjou
            })
            reset()
        }
    }, [success, errorAjou])

    useEffect(()=>{
        if(editSuccess){
            setEdit(false)
            getData()
            Toast.show({
                type: 'success',
                text1: 'Modification réussie',
                text2: 'La specialité a été mis à jour'
            })
            editReset()
            
        }

        if(errorEdit){
            setEdit(false)
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: errorEdit
            })
            editReset()
        }
    }, [editSuccess, errorEdit])

    
    return(
        <>
        <View style={styles.container}>
            <HeaderComponent title="Gestion des spécialités" icone="stethoscope" />

            

            <View style={styles.search}>
                <InputComponent
                    value={search}
                    onChangeText={(text)=>{setSearch(text)}}
                    placeholder={'Rechercher une specialite...'}
                    style={styles.input}
                />
                <Icone nom={'search'} taille={20} color={'rgba(0,0,0,0.2)'} style={styles.searchIcone}/>
            </View>

            <ButtonComponent
                onPress={()=>{
                    setAjout(true)
                    
                }}
                style={styles.jhg}
            >
                <Icone nom={'plus'} taille={20} color={'black'} />
                <Text>Nouvelle specialité</Text>
            </ButtonComponent>

            <View style={styles.contain}>
                <HeaderCard
                    title="Les specialites"
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
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{gap: 10, paddingBottom: 300}}
                        keyExtractor={(item)=>item.id.toString()}
                        renderItem={({item})=>(<CardSpecialite item={item} 
                            pressEdit={()=>{
                                setEdit(true)
                                setSelect(item)
                            }}
                            presseSupprimer={()=>{
                                setVisibleDelete(true)
                                setSelect(item.id)
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
            visible={visibleS}
            onPress={() => {setVisibleS(false)}}
            title={'Toutes les spécialités'}
            data={allSpecialites}
            loading={loadingAllSpecialites}
            onEndReached={loadMoreS}
            renderItem={({ item }) => (<CardSpecialite item={item} 
                pressEdit={()=>{
                    setVisibleS(false)
                    setEdit(true)
                    setSelect(item)
                }}
                presseSupprimer={()=>{
                    setVisibleS(false)
                    setVisibleDelete(true)
                    setSelect(item.id)
                }}
            />)}
            renderFooter={<RenderFooter loading={loadingAllSpecialites} />}
        />

        <ModalConfirmation
            visible={visibleDelete}
            onRequestClose={()=>{setVisibleDelete(!visibleDelete)}}
            pressNon={()=>{setVisibleDelete(!visibleDelete)}}
            pressOui={()=>{handleDelete()}}
            loading={loadingDelete}
        />

        <ModalForm 
            visible={ajout}
            onRequestClose={()=>{setAjout(false)}}
            valueNom={formData.nom}
            valueDes={formData.description}
            onChangeTextD={(text)=>{handleChange('description', text)}}
            onChangeTextN={(text)=>{handleChange('nom', text)}}
            pressNon={()=>{setAjout(false)}}
            pressOui={handleAjout}
            loading={ajoutLoad}
        />

        <ModalForm 
            visible={edit}
            onRequestClose={()=>{setEdit(false)}}
            valueNom={formData.nom}
            valueDes={formData.description}
            onChangeTextD={(text)=>{setFormData({...formData, description: text})}}
            onChangeTextN={(text)=>{setFormData({...formData, nom: text})}}
            pressNon={()=>{
                setFormData({nom:"",description:""})
                setEdit(false)
                
            }}
            pressOui={handleEdit}
            loading={editLoading}
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
    },
})