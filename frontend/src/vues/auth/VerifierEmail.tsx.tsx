import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import HeaderComponent from "../../components/specifics/auth/HeaderComponent";
import ButtonComponent from "../../components/commons/ButtonComponent";
import Loader from "../../components/commons/LoadingComponent";
import { OtpInput } from "react-native-otp-entry";
import { usePost } from "../../hooks/usePost";
import Toast from "react-native-toast-message";
import { getToken, removeToken } from "../../services/AuthStorage";

export default function VerifierEMail({route, navigation}){

    const {email} = route.params || {}
    const [otp, setOtp] = useState('')
    const [errors, setError] = useState({})
    const {loading, error, success, postData} = usePost('/auth/verifier-email')
    

    function validateOtp(){
        let newError = {}
        if(!otp.trim() || otp.length < 6){
            console.log(otp);
            
            newError.otp = 'Code otp invalid'
        }
        setError(newError)
        return Object.keys(newError).length === 0
    }

    async function handleOtp(){
        if(!validateOtp()) return
        
        const token = await getToken()
        if(!token) return
        
        await postData({otp},{
            headers:{
                Authorization: `Bearer ${token}`
            }}
        )
    }

    useEffect(()=>{
        if(success){
            Toast.show({
                type : 'success',
                text1: 'Vérification réussie',
                text2: 'Redirection...'
            })
            removeToken()
            setTimeout(()=>{
                navigation.navigate('connexion')
            }, 2500)
            
        }

        if(error){
            Toast.show({
                type: 'error',
                text1: 'Veuillez réessayer',
                text2: 'Une erreur s\'est produite'
            })
            return
        }
    }, [success, error])

    return(
        <View style={styles.container}>

            <HeaderComponent title={'Vérification'}
                children1={
                    <>
                    <Text style={styles.text}>Un code OTP à 6 chiffres a</Text>
                    <Text style={styles.text}>été envoyé sur</Text>
                    <Text style={styles.text}>{email}</Text>
                    </>
                }
            />

            <View style={styles.otpContain}>
                <View style={styles.otpContainTex}>
                    <Text style={styles.otptext}>Saisissez le code otp, validez pour</Text>
                    <Text style={styles.otptext}>activer votre compte AlloDoc</Text>
                </View>

                <View>
                    <OtpInput 
                        numberOfDigits={6}
                        onTextChange={(otp)=>{setOtp(otp)}}
                        focusColor={'#00f'}
                    />
                    {errors.otp && (<Text style={styles.error}>{errors.otp}</Text>)}
                </View>
            </View>



            <ButtonComponent
                disabled={loading}
                onPress={handleOtp}
                style={styles.register}
            >
                {loading ? (
                    <Loader couleur={'#fff'} />
                ):(
                    <Text style={styles.textB}>
                        Valider
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
    text:{
        fontSize: 18,
        fontWeight:'500',
        color: '#fff',
        letterSpacing: 2
    },

    register:{
       backgroundColor: 'rgba(0,0,255,0.7)',
        padding: 12,
        borderRadius: 10,
        marginHorizontal: 35,
        
    },
    error:{
        color: '#f00'
    },
    textB:{
        color: '#fff',
        textAlign: 'center',
        fontSize: 18
    },
    otpContain:{
        marginHorizontal: 35,
        gap: 20
    },
    otpContainTex:{
        gap: 5
    },
    otptext:{
        fontSize: 16,
        letterSpacing: 2
    }
})