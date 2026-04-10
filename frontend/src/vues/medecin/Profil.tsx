import React, { useEffect, useState } from "react";
import { Text, View , StyleSheet, ScrollView} from "react-native";
import HeaderComponent from "../../components/specifics/Header";
import { useGet } from "../../hooks/useGet";
import Loader from "../../components/commons/LoadingComponent";
import ErrorData from "../../components/commons/ErrorData";
import ImageComponent from "../../components/commons/ImageComponent";
import Icone from "../../components/commons/IconeComponent";
import CardInfoUser from "../../components/commons/CardInfo";
import ButtonComponent from "../../components/commons/ButtonComponent";
import ModalConfirmation from "../../components/commons/ModalConfirmation";
import { usePut } from "../../hooks/usePut";
import Toast from "react-native-toast-message";
import { removeToken } from "../../services/AuthStorage";
import InputComponent from "../../components/commons/InputComponent";


export default function Profil({navigation}){

    const {loading, error, data: user, getData} = useGet('/medecin/infos')
    const medecin = user?.medecin || {}

    const {
        loading: infoLoading, 
        error: errorInfo, 
        success: infoSuccess, 
        putData: infoPut, 
        reset: infoReset} = usePut(`/medecin/modifier/infos`)
    const {
        loading: passLoading, 
        error: passError, 
        success: passSuccess, 
        putData: passPut, 
        reset: passReset} = usePut(`/auth/modifier-password`)
    const [sectionInfo, setSectionInfo] = useState(false)
    const [sectionPass, setSectionPass] = useState(false)
    const [logout, setLogout] = useState(false)

    const [formData, setFormData]= useState({
        fullName: '',
        a_propos: '',
        formation: ''
    })
    const [password, setPassword] = useState('')

    useEffect(() => {
        if(medecin){
            setFormData({
                fullName: medecin.fullName || '',
                a_propos: medecin.about || '',
                formation: medecin.formation || ''
            })
        }
    }, [medecin])

    function formValidate(){
        if(!formData.fullName.trim()) return false

        if(!formData.a_propos.trim()) return false

        if(!formData.formation.trim()) return false

        return true
    }


    async function handlePutInfo(){
        if(!formValidate()) return
        await infoPut(formData)
    }

    async function handlePutPass(){
        if(!password.trim() || password.length < 8) return
        await passPut({password})
    }

    useEffect(()=>{
        if(infoSuccess){
            setSectionInfo(false)
            getData()
            Toast.show({
                type: 'success',
                text1: 'Profil mis à jour avec succès',
                text2: 'Vos informations ont étées mis à jour'
            })
            infoReset()
        }

        if(errorInfo){
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: errorInfo
            })
            infoReset()
        }
    }, [infoSuccess, errorInfo])

    useEffect(()=>{
        if(passSuccess){
            setSectionPass(false)
            getData()
            Toast.show({
                type: 'success',
                text1: 'Profil mis à jour avec succès',
                text2: 'Votre mot de passe a été modifié avec succès'
            })
            passReset()
        }

        if(passError){
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: passError
            })
            passReset()
        }
    }, [passSuccess, passError])

    async function handleLogout() {
        await removeToken()
        navigation.replace('auth')
        Toast.show({
            type: 'success',
            text1: 'Déconnexion réussie',
            text2: 'Veuillez vous reconnecter'
        })

    }


    
    return(
        <>
        <View style={styles.container}>
            <HeaderComponent title="Profil" icone="user" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 15}}
                
            >
                {loading && (
                    <View style={styles.any}>
                        <Loader couleur={'#00f'} />
                        <Text style={styles.aucun}>Chargement des données</Text>
                    </View>
                )}
                {error && (<ErrorData message={error} />)}

                <View style={styles.sfd}>
                    <View style={styles.user}>
                        {medecin?.photo_profil ? (
                            <ImageComponent source={medecin?.photo_profil} style={styles.ime}  />
                        ):(
                            <Icone nom={'user'} taille={105} color={'rgba(0,0,0,0.1)'} style={styles.ico} />
                        )}
                    </View>
                    <View style={styles.kjh}>
                        <CardInfoUser 
                            label={'Nom complet'}
                            texte={medecin?.fullName || 'N/A'}
                        />
                        <CardInfoUser 
                            label={'Email'}
                            texte={medecin?.email || 'N/A'}
                        />
                        <CardInfoUser 
                            label={'A propos'}
                            texte={medecin?.about || 'Pas encore défini'}
                        />
                        <CardInfoUser 
                            label={'Formation'}
                            texte={medecin?.formation || 'Pas encore défini'}
                        />
                        <CardInfoUser 
                            label={'Spécialité'}
                            texte={medecin?.specialite || 'N/A'}
                        />
                        
                    </View>

                    
                </View>
                <ButtonComponent
                    onPress={()=>{
                        setSectionInfo(!sectionInfo)
                        setSectionPass(false)
                    }}
                    style={styles.btn}
                >
                    <Text style={styles.btnrr}>Modifier mes informations</Text>
                    <Icone nom={sectionInfo ? 'chevron-up' : 'chevron-down'} taille={15} color={'black'}/>
                </ButtonComponent>

                {sectionInfo && (
                    <View style={[styles.contI]}>
                        <InputComponent
                            value={formData.fullName}
                            onChangeText={(text)=>{setFormData({...formData, fullName: text})}}
                            placeholder={'Nom complet'}
                            style={styles.input}
                        />

                        <InputComponent
                            value={formData.a_propos}
                            onChangeText={(text)=>{setFormData({...formData, a_propos: text})}}
                            placeholder={'Dîtes plus sur vous'}
                            style={styles.input}
                        />

                        <InputComponent
                            value={formData.formation}
                            onChangeText={(text)=>{setFormData({...formData, formation: text})}}
                            placeholder={'Dîtes plus sur vos formations...'}
                            style={styles.input}
                        />

                        <ButtonComponent
                            onPress={()=>{handlePutInfo()}}
                            style={styles.save}
                            disabled={infoLoading || !formValidate()}
                        >
                            {infoLoading ? (
                                <Loader couleur={'white'}/>
                            ):(
                                <Text style={styles.savje}>Enregister les modifications</Text>
                            )}
                        </ButtonComponent>
                    </View>
                )}

                <ButtonComponent
                    onPress={()=>{
                        setSectionPass(!sectionPass)
                        setSectionInfo(false)
                    }}
                    style={styles.btn2}
                >
                    <Text style={styles.btnrr}>Modifier mon mot de passe</Text>
                    <Icone nom={sectionPass ? 'chevron-up' : 'chevron-down'} taille={15} color={'black'}/>
                </ButtonComponent>
                
                {sectionPass && (
                    <View style={[styles.contI]}>
                        <InputComponent
                            value={password}
                            onChangeText={(text)=>{setPassword(text)}}
                            placeholder={'Nouveau mot de passe'}
                            style={styles.input}
                        />

                        <ButtonComponent
                            onPress={()=>{handlePutPass()}}
                            style={styles.save}
                            disabled={passLoading}
                        >
                            {passLoading ? (
                                <Loader couleur={'white'}/>
                            ):(
                                <Text style={styles.savje}>Enregister le mot de passe</Text>
                            )}
                        </ButtonComponent>
                    </View>
                )}

                <ButtonComponent
                    onPress={()=>{setLogout(true)}}
                    style={styles.btn3}
                >
                    <Text style={styles.logo}>Déconnexion</Text>
                </ButtonComponent>

                <Text style={styles.logooo}>Certaines informations comme votre adresse email et votre specialité sont modifiable par l'admin.</Text>

                <Text style={styles.logooo}>Allo Doc - App V.0</Text>
            </ScrollView>
        </View>

        <ModalConfirmation
            visible={logout}
            onRequestClose={()=>{setLogout(!logout)}}
            pressNon={()=>{setLogout(!logout)}}
            pressOui={()=>{handleLogout()}}
        />
        </>
    )
}



const styles = StyleSheet.create({
    any:{
        height: 700,
        justifyContent:'center',
        alignItems:'center'
    },
    aucun:{
        textAlign: 'center'
    },
    logooo:{
        textAlign: 'center',
        color: '#00f',
        opacity:0.3,
        fontSize: 15,
        fontWeight: '500',
        marginTop:30
    },
    logoo:{
        textAlign: 'center',
        color: 'gray',
        letterSpacing:1,
        fontSize: 15,
        fontWeight: '500'
    },
    logo:{
        textAlign: 'center',
        color: 'red',
        fontSize: 15,
        fontWeight: '500'
    },
    savje:{
        textAlign: 'center',
        color: 'white',
        fontSize: 15,
        fontWeight: '500'
    },
    save:{
        backgroundColor: '#00f',
        padding: 10,
        borderRadius:5
    },
    input:{
        borderWidth:1,
        borderRadius:5,
        borderColor: 'rgba(0,0,0,0.1)',
        paddingLeft: 10
    },
    contI:{
        backgroundColor: '#fff',
        padding: 15,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
        gap: 15
    },
    btnrr:{
        fontWeight: '500',
        fontSize:16
    },
    btn2:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius:5,
        marginTop: 20
    },
    btn3:{
        alignItems: 'center',
        backgroundColor: 'rgba(255,0,0,0.2)',
        padding: 15,
        borderRadius:5,
        marginTop: 30
    },
    btn4:{
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: 15,
        borderRadius:5,
        marginTop: 20
    },

    btn:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius:5
    },
    kjh:{
        gap:10
    },
    sfd:{
        // flexDirection: 'row',
        gap: 20,
        marginVertical: 20
    },
    nom:{
        fontWeight: 'bold',
        fontSize: 20
    },
    container:{
        marginHorizontal: 20,
        flex: 1
    },
    image:{
         width: 120,
    height: 120,
    borderRadius: 10,
    
    },

    containI:{
        marginVertical: 40,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    user:{
        borderColor: 'gray',
        borderWidth: 1,
        padding: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img:{
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },

    infoContain:{
        
        flexDirection: 'row',
        
        alignItems: 'center',
        gap: 10
    },
    iconInfo:{
        backgroundColor: 'rgba(0,100,255,0.2)',
        padding: 15,
        borderRadius: 10
    },
    title:{
        textTransform: 'uppercase',
        color: 'rgba(0,0,0,0.5)',
        fontSize: 12,
        fontWeight: '500'
    },
    titleContain:{
        fontWeight: 'bold'
    },
    titleInfo:{
        gap: 3,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 15,
        alignContent: 'center',
        justifyContent: 'center',

    },
    icon:{}
})