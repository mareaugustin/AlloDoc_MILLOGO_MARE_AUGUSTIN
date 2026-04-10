import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet, ScrollView, Modal } from "react-native";
import HeaderBack from "../../components/commons/HeaderBack";
import ImageComponent from "../../components/commons/ImageComponent";
import Icon from "../../components/commons/IconComponent";
import Icone from "../../components/commons/IconeComponent";
import { FormatDate } from "../../services/FormatDate";
import ButtonComponent from "../../components/commons/ButtonComponent";
import { usePost } from "../../hooks/usePost";
import { getToken } from "../../services/AuthStorage";
import Toast from "react-native-toast-message";
import ModalComponent from "../../components/commons/ModalComponent";
import Loader from "../../components/commons/LoadingComponent";
import ModalValidateRdv from "../../components/specifics/patient/ModalRdv";
import { FormatDateIso } from "../../services/FormatDate";

export default function PrendreRdv({navigation, route}){

    const { medecin } = route.params || {}
    const [visible, setVisible] = useState(false)
    const [selectHeure, setSelectHeure] = useState(null)

    const {loading, error, success, postData, reset} = usePost('/rdv/prendre')

    function handleBack(){
        navigation.goBack()
    }

    async function handlePriseRdv() {
        const token = await getToken()
        if(!token) return
        const dateRdv = FormatDateIso(medecin.date)
        await postData(
            {
                date: dateRdv,
                heures: selectHeure,
                medecinId: medecin.medecinId
            },{
            headers : {
                Authorization: `Bearer ${token}`
            }}
        )
        
    }

    useEffect(()=>{
        if(success){
            setVisible(false)
            Toast.show({
                type: 'success',
                text1: 'Rendez-vous CONFIRMER',
                text2: 'Votre rendez-vous a été prise avec succès'
            })
            reset()
        }

        if(error){
            setVisible(false)
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: error
            })
            reset()
        }
    }, [success, error])


    return(
        <>
        <View style={styles.conta}>
            <HeaderBack title={medecin.fullName || 'N/A'} onPress={()=>{handleBack()}} />
            
            <ScrollView
                contentContainerStyle={{paddingBottom: 10}}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.infoContainSu}>
                    <View style={styles.infoContainimg}>
                        {medecin?.photo_profil ? (
                            <ImageComponent source={medecin?.photo_profil} style={styles.img}  />
                        ):(
                            <Icon nom={'doctor'} taille={105} color={'rgba(0,0,0,0.1)'} style={styles.ico} />
                        )}
                    </View >
                    <View style={styles.infoContaineg}>
                        <Text style={styles.infoContain}>Spécialité</Text>
                        <Text style={styles.infoContaind}>{medecin?.specialite || 'N/A'}</Text>
                    </View>
                </View>

                <View>
                    <Text style={styles.dat}>Les heures de disponibilité</Text>
                    <Text style={styles.daat}>Choisissez une heure ci-dessous qui vous convient et validez votre rendez-vous.</Text>
                </View>

                <View style={styles.da}>
                    <Text style={styles.date}>{FormatDate(medecin?.date) || 'N/A'}</Text>
                    <Icone nom={'calendar'} taille={24} color={'rgba(0,0,255,0.3)'} />
                </View>

                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    
                >
                    <View style={styles.btn}>
                        {medecin?.heures.map((heure,index) => (
                            <ButtonComponent key={index}
                                onPress={()=>{
                                    setSelectHeure(heure)
                                    setVisible(true)
                                }} 
                                style={styles.heure}
                            >
                                <Text style={styles.heureT}>{heure}</Text>
                            </ButtonComponent>
                        ))}
                    </View>
                </ScrollView>

                <View style={styles.abou}>
                    <Text style={styles.ttt}>Savoir plus sur {medecin.fullName || 'N/A'}</Text>
                    <View style={styles.desc}>
                        <Text style={styles.tt}>À propos</Text>
                        <Text style={[styles.content, !medecin?.a_propos && styles.any]}>
                            {medecin?.a_propos ? medecin?.a_propos : 'Aucune description'}
                        </Text>
                    </View>

                    <View style={styles.desc}>
                        <Text style={styles.tt}>Formation</Text>
                        <Text style={[styles.content, !medecin?.a_propos && styles.any]}>
                            {medecin?.formation ? medecin?.formation : 'Aucune description'}
                        </Text>
                    </View>

                </View>

            </ScrollView>
        </View>

        <ModalValidateRdv
            visible={visible}
            onRequestClose={()=>{setVisible(false)}}
            item={medecin}
            loading={loading}
            heure={selectHeure}
            pressAnnuler={()=>{setVisible(false)}}
            pressConfirm={()=>{handlePriseRdv()}}
        />
        </>
    )
}

const styles = StyleSheet.create({
    btnn:{
        borderTopColor: 'rgba(0,0,0,0.2)',
        borderTopWidth: 1,
        // alignSelf: 'center',
        flexDirection: 'row',
        // marginHorizontal: 55,
        justifyContent: 'space-between',
        padding:10,
        marginTop:15
    },
    btnA:{
         borderRightColor: 'rgba(0,0,0,0.2)',
        borderRightWidth: 1,
        width: '50%'
    },
    btnO:{

        width: '50%',

        //  borderTopColor: 'rgba(0,0,0,0.2)',
        // borderTopWidth: 1,
    },
    txtA:{
        color: 'gray',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center'
    },
    txtO:{
        color: '#00f',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center'
    },
    modalpm:{
        color: 'gray',
        // backgroundColor: 'rgba(0,0,255,0.1)',
        padding: 15,
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal:15,
        borderRadius:10,
        borderColor:'rgba(0,0,255,0.1)',
        borderWidth:2
    },
    modall:{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        
    },
    modalm:{
        // textAlign: 'center'
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 1,
        color: 'rgba(0,0,0,0.8)'
        
    },
    modal:{
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: 'gray',
        flex: 1,
        marginVertical:310,
        marginHorizontal: 55,
        justifyContent: 'center',
        alignContent: 'center',
        gap: 5,
        borderRadius:10
        
    },
    content:{
       textAlign: 'justify'
    },

    any:{
        textAlign: 'center',
        color:'rgba(0,0,0,0.5)',
        height:100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ttt:{
        fontSize: 18,
        fontWeight: 'bold',
        color:'rgba(0,0,0,0.7)'
    },
    tt:{
        fontSize: 16,
        fontWeight: '400',
        color: 'rgba(0,0,0,0.8)'
    },
    desc:{
        gap:2
    },
    abou:{
        marginVertical:20,
        gap: 10
    },
    da:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginVertical:20
    },
    daat:{
        textAlign: 'center',
        color: 'gray'
    },
    dat:{
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    },
    btn:{
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
    },
    date:{
        fontSize: 16,
        color: '#00f',
        fontWeight: '400',
        letterSpacing: 1
    },
    heure:{
        backgroundColor: 'rgba(0,0,255,0.7)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    heureT:{
        fontWeight: 'bold',
        color:'#fff',
        fontSize: 18
    },
    infoContaind:{
        color: '#00f',
        fontSize: 18
    },
    infoContain:{
        fontWeight: 'bold',
        fontSize: 30,
        letterSpacing: 1,
        color:'rgba(0,0,0,0.7)'
    },
    infoContaineg:{
        gap: 3
    },
    infoContainSu:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(0,0,255,0.1)',
        marginVertical: 30,
        padding: 30,
        gap: 15
    },
    infoContainimg:{
        borderColor: 'gray',
        borderWidth: 1,
        padding: 60,
        borderRadius: 10,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center'
    },
    img:{
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    ico:{
        position: 'absolute',
        bottom: -10
    },
    conta:{
        marginHorizontal: 20,
        flex: 1
    }
})