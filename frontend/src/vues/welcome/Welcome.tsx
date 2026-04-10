import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import ImageComponent from "../../components/commons/ImageComponent";
import ButtonComponent from "../../components/commons/ButtonComponent";

export default function Welcome({navigation}){

    const [step, setStep] = useState('step1')

    function handleNext(){
            navigation.navigate('auth')
        
    }

    function handleStep(){
        if(step === 'step1'){
            setStep('step2')
            return
        }
        navigation.navigate('auth')
    }

    return(
        <View style={styles.container}>
            <ButtonComponent
                onPress={handleNext}
                style={styles.next}
            >
                <Text style={styles.textN}>
                    {step === 'step1' ? 'Passer' : 'J\'ai déjà un compte'}
                </Text>
            </ButtonComponent>

            {step === 'step1' && (
                <>
                <View style={styles.imgContainer}>
                    <ImageComponent source={require('../../assets/images/doctor.png')} style={styles.img} />
                </View>

                <View style={styles.textCont}>
                    <Text style={styles.textCont1}>Bienvenue sur</Text>
                    <View style={styles.textContT}>
                        <Text style={styles.textCont2}>Allo</Text>
                        <Text style={styles.textCont3}>Doc</Text>
                    </View>
                    
                </View>

                <Text style={styles.text}>Votre application de service médical.</Text>
                </>
            )}

            {step === 'step2' && (
                <>
                <Text style={styles.textStep}>Notre mission</Text>
                
                <View style={styles.textContS}>
                    <Text style={styles.textCont1S}>Faciliter, Automatisez la prise</Text>
                    <Text style={styles.textCont1S}>de rendez-vous pour les soins</Text>
                    <Text style={styles.textCont1S}>de santé.</Text>
                    
                </View>

                <View style={styles.textContS}>
                    <Text style={styles.textCont1S}>Connectez-vous, recherchez un</Text>
                    <Text style={styles.textCont1S}>médecin, et prenez un rendez</Text>
                    <Text style={styles.textCont1S}>vous en quelques clics.</Text>
                    
                </View>

                <Text style={styles.textS}>Simple - Rapide - Fiable</Text>
                </>
            )}
            

            <View style={styles.step}>
                <View style={[styles.step1, step === 'step1' && styles.activet ]}></View>
                <View style={[styles.step2, step === 'step2' && styles.activet ]}></View>
            </View>

            <View style={styles.cc}>
                <ButtonComponent
                    onPress={handleStep}
                    style={styles.nextStep}
                >
                    <Text style={styles.textB}>
                        {step === 'step1' ? 'Suivant' : 'Créer un compte'}
                    </Text>
                </ButtonComponent>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 80
    },
    containerSub1: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#cff'
    },
    containerSub: {
        gap: 20,
        backgroundColor: '#000'
        
    },
    cc:{
        // backgroundColor: '#0f0',
    },
    imgContainer: {
        height: 400
    },
    textCont: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15
    },
    textContT:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    textCont1:{
        fontSize: 35,
        fontWeight: 'bold'
    },
    textCont2:{
        fontSize: 35,
        fontWeight: 'bold'
    },
    textCont3:{
        fontSize: 35,
        fontWeight: 'bold',
        color: '#00f'
    },
    next:{
        marginHorizontal: 35
        
    },
    textN:{
        color: '#00f',
        fontWeight: '400',
        textAlign: 'right',
        fontSize: 18

    },
    img:{
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    },
    text:{
        textAlign: 'center',
        fontWeight: '500',
        letterSpacing: 2
    },
    step:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    step1:{
        backgroundColor: 'rgba(0,0,0,0.2)',
        width: 14,
        height: 14,
        borderRadius: 7
    },
    activet:{
        // backgroundColor: 'rgba(0,0,0,0.2)',
         backgroundColor: 'rgba(0,0,255,0.7)',
    },
    step2: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        width: 14,
        height: 14,
        borderRadius: 7
    },
    nextStep:{
       backgroundColor: 'rgba(0,0,255,0.7)',
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 35,
        
    },
    textB:{
        color: '#fff',
        textAlign: 'center',
        fontSize: 18
    },

    // Etape 2
    textStep:{
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textS:{
        color: 'rgba(0,0,255,0.7)',
        textAlign: 'center',
        fontSize: 18,
        textTransform: 'uppercase'
    },
    textCont1S:{
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
        letterSpacing: 3
    },
    textContS:{
        gap: 2
    },
    textContt:{
        // height: '50%'
    }
});