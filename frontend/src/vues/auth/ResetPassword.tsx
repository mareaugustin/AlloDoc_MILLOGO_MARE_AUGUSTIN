import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import HeaderComponent from "../../components/specifics/auth/HeaderComponent";
import ButtonComponent from "../../components/commons/ButtonComponent";
import TextInputComponent from "../../components/specifics/auth/TextInput";
import Icone from "../../components/commons/IconeComponent";
import Loader from "../../components/commons/LoadingComponent";
import { usePost } from "../../hooks/usePost";
import Toast from "react-native-toast-message";


export default function ResetPassword({navigation}){


    const [formData, setFormData] = useState({
        email:'',
        password:'',
    })
    const [confirm_password, setConfirmpassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setError] = useState({})

    const {loading, success, error, data, reset, postData} = usePost('/auth/reset-password')

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

        if(!confirm_password.trim() || confirm_password !== formData.password){
            newErrors.confirm_password = 'Mot de passe différent'
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
                text1: 'Mot de passe reinitialisé avec succès',
                text2: 'Redirection...'
            })
            
            setTimeout(()=>{
                navigation.goBack()
                reset()
            }, 2500)
            
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
        
            <HeaderComponent title={'Réinitialisation'}
                children1={
                    <>
                    <Text style={styles.text}>Entrez votre adresse email servit</Text>
                    <Text style={styles.text}>lors de la création de votre</Text>
                    <Text style={styles.text}>compte Allo Doc et validez</Text>
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
                <TextInputComponent 
                    secureTextEntry={!showPassword}
                    value={formData.password}
                    onChangeText={(text)=>handleChange('password', text)}
                    placeholder="Nouveau Mot de passe"
                    icone={'lock'}
                    erreur={errors.password}
                    message={errors.password}
                />
                <View>
                    <TextInputComponent 
                        secureTextEntry={!showPassword}
                        value={confirm_password}
                        onChangeText={(confirm_password)=>{
                            setConfirmpassword(confirm_password)
                            setError(prev => ({...prev, confirm_password: ''}))
                        }}
                        placeholder="Confirmer mot de passe"
                        icone={'lock'}
                        erreur={errors.confirm_password}
                        message={errors.confirm_password}
                    />
                    <ButtonComponent
                        onPress={()=>{setShowPassword(!showPassword)}}
                        style={styles.icon}
                    >
                        <Icone nom={showPassword ? 'eye' : 'eye-slash'} taille={25} color={'gray'}  />
                    </ButtonComponent>
                </View>
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
                        Réinitialiser
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

})