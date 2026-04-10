import React, {useState, useEffect} from "react";
import { StyleSheet, View , Text, TextInput, Alert} from "react-native";
import ButtonComponent from "../../components/commons/ButtonComponent";
import Icone from "../../components/commons/IconeComponent";
import TextInputComponent from "../../components/specifics/auth/TextInput";
import Loader from "../../components/commons/LoadingComponent";
import {usePost} from '../../hooks/usePost'
import Toast from "react-native-toast-message";
import {saveToken} from '../../services/AuthStorage'
import HeaderComponent from "../../components/specifics/auth/HeaderComponent";
import {saveData} from '../../services/DataStorage'

export default function Inscription({navigation}){

    const [formData, setFormData] = useState({
        fullName:'',
        email:'',
        telephone: '',
        password:'',
    })
    const [confirm_password, setConfirmpassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setError] = useState({})

    const {loading, success, error, data, reset, postData} = usePost('/auth/inscription')

    function handleChange(name, value){
        setError(prev => ({...prev, [name]: ''}))
        setFormData({...formData, [name]: value})
    }


    function formValidate(){
        let newErrors = {}

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const telRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

        if(!formData.fullName.trim()){
            newErrors.fullName = 'Nom invalide'
        }

        if(!formData.email.trim() || !emailRegex.test(formData.email)){
            newErrors.email = 'Email invalide'
        }

        if(!formData.telephone.trim() || !telRegex.test(formData.telephone)){
            newErrors.telephone = 'Téléphone invalide'
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
                text1: 'Redirection..',
                text2: 'Verification du compte'
            })
            saveToken(data.token)
            
            setTimeout(()=>{
                navigation.navigate('verifier-email', {email: formData.email} )
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

            <HeaderComponent title={'Inscription'}
                children1={
                    <>
                    <Text style={styles.text}>Entrez vos informations et</Text>
                    <Text style={styles.text}>Validez pour vous s'inscrire</Text>
                    <Text style={styles.text}>sur Allo Doc</Text>
                    </>
                }

                children2={
                    <>
                    <Text style={styles.tex}>Déjà un compte ?</Text>
                    <ButtonComponent
                        onPress={()=>{navigation.navigate('connexion')}}
                        style={styles.button}
                    >
                        <Text style={styles.tex}>Se connecter</Text>
                    </ButtonComponent>
                    </>
                }
            />

            <View style={styles.form}>
                <TextInputComponent 
                    value={formData.fullName}
                    onChangeText={(text)=>handleChange('fullName', text)}
                    placeholder="Nom complet"
                    icone={'user'}
                    erreur={errors.fullName}
                    message={errors.fullName}
                    
                />
                <TextInputComponent 
                    value={formData.email}
                    onChangeText={(text)=>handleChange('email', text)}
                    placeholder="Email"
                    icone={'envelope'}
                    erreur={errors.email}
                    message={errors.email}
                />
                <TextInputComponent 
                    value={formData.telephone}
                    onChangeText={(text)=>handleChange('telephone', text)}
                    placeholder="Téléphone"
                    icone={'phone'}
                    erreur={errors.telephone}
                    message={errors.telephone}
                />
                <TextInputComponent 
                    secureTextEntry={!showPassword}
                    value={formData.password}
                    onChangeText={(text)=>handleChange('password', text)}
                    placeholder="Mot de passe"
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
                        S'inscrire
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