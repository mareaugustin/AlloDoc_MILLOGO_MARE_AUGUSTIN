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
import CardUser from "../../components/specifics/admin/CardUser";
import Icon from "../../components/commons/IconComponent";
import HeaderBack from "../../components/commons/HeaderBack";
import CardMedecin from "../../components/specifics/admin/CardMedecin";
import ModalFormM from "../../components/specifics/admin/ModalFormM";


export default function GestionMedecin({navigation}){
    const [search, setSearch] = useState('')
    const [select, setSelect] = useState(null)
    const [creer, setCreer] = useState(false)
    const [selectS, setSelectS] = useState(null)
    const [visible, setVisible] = useState(false)
    const [visibleDes, setVisibleDes] = useState(false)
    const [formData, setFormData] = useState({
        fullName:'',
        email:'',
        password:'',
    })

    const {loading: creerL, success: successL, error: errorL, postData, reset: resetL} = usePost('/admin/creer-compte')

    const {data, loading, error, getData} = useGet(`/admin/user-medecin?page=1&limit=10`)
    const user = data?.medecin || [];

    const {data: spe, loading: speL, error: speErr, getData: getDataSpe} = useGet(`/admin/specialites/affectation`)
    const affSpe = spe?.specialites || [];

    const { 
        allData: allUserData,
        loading: loadingAllUser, 
        loadMore,
        refresh
    } = useGetAllPage(`/admin/user-medecin`);
    const allUsers = allUserData?.medecin || [];

    const {
        loading: disactiverLoading, 
        error: desactiverError, 
        success,
        putData,
        reset} = usePut(select ? `/admin/user/${select}` : null)


    const userFiltres = useMemo(()=>{
        if(!user || !Array.isArray(user)) return []

        let resultat = user
        if(search.trim()){
            const s = search.toLowerCase()
            resultat = resultat.filter(item => (
                item?.fullName.toLowerCase().includes(s) ||
                item?.email.toLowerCase().includes(s)
            ))
        }

        return resultat
        
    },[user, search])

    function handleBack(){
        navigation.goBack()
    }


    function formValidate(){
        if(!formData.fullName.trim()) return false
        if(!formData.email.trim()) return false
        if(!formData.password.trim()) return false
        return true
    }

    function handleChange(name, value){
        setFormData({...formData, [name]: value})
    }

    async function handleCreate(){
        if (!formValidate()) return
        const token = await getToken()
        if(!token) return
        await postData(
            {...formData, specialiteId: selectS},{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
    }
        
        
        useEffect(()=>{
            if(successL){
                setCreer(false)
                getData()
                Toast.show({
                    type: 'success',
                    text1: 'Ejout réussie',
                    text2: 'La specialité a été ajoutée'
                })
                resetL()
                
            }
    
            if(errorL){
                setCreer(false)
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: errorL
                })
                reset()
            }
        }, [successL, errorL])

    

     useEffect(() => {
        if (visible) {
            refresh();
        }
    }, [visible]);


    async function handleDesactiver(){
        if(!select) return
        await putData()
    }

    useEffect(()=>{
        if(success){
            setVisibleDes(false)
            getData()
            Toast.show({
                type: 'success',
                text1: 'Changement réussie'
            })
            reset()
            
        }

        if(desactiverError){
            setVisibleDes(false)
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: desactiverError
            })
            reset()
        }
    }, [success, desactiverError])

    
    return(
        <>
        <View style={styles.container}>
            
            <HeaderBack title={'Gerer tous les utilisateurs'} onPress={()=>{handleBack()}} />

            

            <View style={styles.search}>
                <InputComponent
                    value={search}
                    onChangeText={(text)=>{setSearch(text)}}
                    placeholder={'Rechercher un medecin...'}
                    style={styles.input}
                />
                <Icone nom={'search'} taille={20} color={'rgba(0,0,0,0.2)'} style={styles.searchIcone}/>
            </View>

            <ButtonComponent
                onPress={()=>{
                    setCreer(true)
                    
                }}
                style={styles.jhg}
            >
                <Icon nom={'doctor'} taille={20} color={'black'} />
                <Text>Créer un compte medecin</Text>
            </ButtonComponent>

            <View style={styles.contain}>
                <HeaderCard
                    title="Les utilisateurs"
                    buttonText="Voir tout"
                    onPress={()=>{setVisible(true)}}
                />

                {loading ? (
                    <ChargementData />
                ): userFiltres.length === 0 ? (
                    <Text style={error ? styles.hide : styles.aucun}>
                        {search.trim() ? 'Utillisateur non trouvé' : 'Aucun utilisateur'}
                    </Text>
                    
                ):(
                    <FlatList 
                        data={userFiltres}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{gap: 10, paddingBottom: 300}}
                        keyExtractor={(item)=>item.id.toString()}
                        renderItem={({item})=>(<CardMedecin item={item} 
                          onPressEdit={null}
                            onPress={()=>{
                                setVisibleDes(true)
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
            visible={visible}
            onPress={() => {setVisible(false)}}
            title={'Tous les utilisateurs'}
            data={allUsers}
            loading={loadingAllUser}
            onEndReached={loadMore}
            renderItem={({ item }) => (<CardMedecin item={item} 
              onPressEdit={null}
                onPress={()=>{
                    setVisible(false)
                    setVisibleDes(true)
                    setSelect(item.id)
                }}
            />)}
            renderFooter={<RenderFooter loading={loadingAllUser} />}
        />

        <ModalConfirmation
            visible={visibleDes}
            onRequestClose={()=>{setVisibleDes(!visibleDes)}}
            pressNon={()=>{setVisibleDes(!visibleDes)}}
            pressOui={()=>{handleDesactiver()}}
            loading={disactiverLoading}
        />

        <ModalFormM
            visible={creer}
            onRequestClose={()=>{setCreer(false)}}
            valueNom={formData.fullName}
            valueEmail={formData.email}
            valuePass={formData.password}
            onChangeTextE={(text)=>{handleChange('email', text)}}
            onChangeTextN={(text)=>{handleChange('fullName', text)}}
            onChangeTextP={(text)=>{handleChange('password', text)}}
            pressNon={()=>{setCreer(false)}}
            pressOui={handleCreate}
            loading={creerL}

            specialites={affSpe}
            selectedSpecialite={selectS}
            onSelectSpecialite={setSelectS}
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