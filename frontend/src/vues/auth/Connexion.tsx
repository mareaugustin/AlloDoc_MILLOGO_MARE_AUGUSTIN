import React, { useEffect, useState } from "react";
import { StyleSheet, View , Text} from "react-native";
import HeaderComponent from "../../components/specifics/auth/HeaderComponent";
import ButtonComponent from "../../components/commons/ButtonComponent";
import Loader from "../../components/commons/LoadingComponent";
import Icone from "../../components/commons/IconeComponent";
import TextInputComponent from "../../components/specifics/auth/TextInput";
import { usePost } from "../../hooks/usePost";
import Toast from "react-native-toast-message";
import { saveToken } from "../../services/AuthStorage";
import { saveData } from "../../services/DataStorage";


export default function Connexion({navigation}){
    const [formData, setFormData] = useState({
        email:'',
        password:'',
    })
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setError] = useState({})

    const {loading, success, error, data, postData, reset} = usePost('/auth/connexion')

    function handleChange(name, value){
        setError(prev => ({...prev, [name]: ''}))
        setFormData({...formData, [name]: value})
    }


    function formValidate(){
        let newErrors = {}

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!formData.email.trim() || !emailRegex.test(formData.email)){
            newErrors.email = 'Email invalide'
        }

        if(!formData.password.trim() || formData.password.length < 8){
            newErrors.password = '8 caractères minimum'
        }

        setError(newErrors)

        return Object.keys(newErrors).length === 0
    }

    async function handleSubmit(){
        if (!formValidate()) return
        await postData(formData)
    }

    useEffect(()=>{
        if(success){
            Toast.show({
                type: 'success',
                text1: 'Connexion réussie',
                text2: 'Redirection...'
            })
            saveToken(data.token)
            saveData('role', data.role)
            
            if(data.role === 'patient'){
                setTimeout(()=>{
                    navigation.replace('espace-patient')
                }, 2500)
            reset()
            } else if(data.role === 'medecin'){
                setTimeout(()=>{
                navigation.replace('espace-medecin')
                }, 2500)
                reset()
            } else {
                 setTimeout(()=>{
                    navigation.replace('espace-admin')
                }, 2500)
                reset()
            }
            
            
        }

        if(error){
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: error
            })
            reset()
        }
    }, [success, error])

    return(
        <View style={styles.container}>
        
            <HeaderComponent title={'Connexion'}
                children1={
                    <>
                    <Text style={styles.text}>Entrez vos informations et</Text>
                    <Text style={styles.text}>Validez pour accéder à votre</Text>
                    <Text style={styles.text}>espace Allo Doc</Text>
                    </>
                }

                children2={
                    <>
                    <Text style={styles.tex}>Pas de compte ?</Text>
                    <ButtonComponent
                        onPress={()=>navigation.goBack()}
                        style={styles.button}
                    >
                        <Text style={styles.tex}>S'inscrire</Text>
                    </ButtonComponent>
                    </>
                }
            />

            <View style={styles.form}>
                <TextInputComponent 
                    value={formData.email}
                    onChangeText={(text)=>handleChange('email', text)}
                    placeholder="Email"
                    icone={'envelope'}
                    erreur={errors.email}
                    message={errors.email}
                />
                
                <View>
                    <TextInputComponent 
                        secureTextEntry={!showPassword}
                        value={formData.password}
                        onChangeText={(text)=>handleChange('password', text)}
                        placeholder="Mot de passe"
                        icone={'lock'}
                        erreur={errors.password}
                        message={errors.password}
                    />
                    <ButtonComponent
                        onPress={()=>{setShowPassword(!showPassword)}}
                        style={styles.icon}
                    >
                        <Icone nom={showPassword ? 'eye' : 'eye-slash'} taille={25} color={'gray'}  />
                    </ButtonComponent>
                </View>

                <ButtonComponent
                    onPress={()=>{navigation.navigate('reset-password')}}
                    style={styles.but}
                >
                    <Text style={styles.bu}>Mot de passe oublié ?</Text>
                </ButtonComponent>
            </View>

            <ButtonComponent
                disabled={loading}
                onPress={handleSubmit}
                style={styles.register}
            >
                {loading ? (
                    <Loader couleur={'#fff'} />
                ):(
                    <Text style={styles.textB}>
                        Connexion
                    </Text>
                )}
                
            </ButtonComponent>
            
        </View>
    )
    }

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 80,
        justifyContent: 'space-between'
    },
    header:{
        backgroundColor: 'rgba(0,0,255,0.7)',
        paddingTop: 80,
        paddingBottom: 30,
        height:300,
        borderBottomLeftRadius: 75,
        borderBottomRightRadius: 75,
        justifyContent: 'space-between'
        // paddingLeft: 20
    },
    headerTitle:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 35,
        marginHorizontal: 35,
        letterSpacing: 2
    },
    headerContent:{
        marginHorizontal: 35,
        gap: 2
    },
    headerInfo:{
        flexDirection: 'row',
        marginHorizontal: 35,
        gap: 5
    },
    text:{
        fontSize: 18,
        fontWeight:'500',
        color: '#fff',
        letterSpacing: 2
    },
    tex:{
        fontSize: 16,
        fontWeight:'400',
        color: '#fff',
        letterSpacing: 2
    },
    error:{
        color: '#f00',
    },
    button:{

    },
    icon:{
        position: 'absolute',
        top: 10,
        right: 45
    },

    form:{
        gap: 17
    },
    register:{
        backgroundColor: 'rgba(0,0,255,0.7)',
        padding: 12,
        borderRadius: 10,
        marginHorizontal: 35,
        
    },
    textB:{
        color: '#fff',
        textAlign: 'center',
        fontSize: 18
    },
    but:{
        marginHorizontal: 35
    },
    bu:{
        color: '#00f',
        textAlign: 'right',
        fontSize: 16
    }

})