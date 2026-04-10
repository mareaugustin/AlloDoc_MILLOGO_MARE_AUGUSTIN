import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import HeaderBack from "../../components/commons/HeaderBack";
import { Calendar } from "react-native-calendars";
import DatePicker from "react-native-date-picker";
import ButtonComponent from "../../components/commons/ButtonComponent";
import { usePost } from "../../hooks/usePost";
import { getToken } from "../../services/AuthStorage";
import { FormatDate } from "../../services/FormatDate";
import Toast from "react-native-toast-message";
import Loader from "../../components/commons/LoadingComponent";


export default function CreatePlanning({navigation}){

    const [selected, setSelected] = useState('')
    const today = new Date().toISOString().split('T')[0]
    const [date, setDate ] = useState(new Date())
    const [open, setOpen]= useState(false)
    const heure = date.toTimeString().split(' ')[0]; 
    

    const {loading, error, success, postData, reset} = usePost('/horaires/ajouter')
    
    function handleBack(){
        navigation.goBack()
    }

    function validateForm(){
        if(!selected) return false
        if(!date) return false

        return true
    }

    async function handleHoraire() {
        if(!validateForm()) return

        const token = await getToken()
        if(!token) return
        await postData(
            {
                date: selected,
                heures: heure
            },{
            headers : {
                Authorization: `Bearer ${token}`
            }}
        )

        console.log('date', selected);
        console.log('heure', date);
        
        
        
    }

    useEffect(()=>{
        if(success){
            handleBack()
            Toast.show({
                type: 'success',
                text1: 'Ajout de planning réussie',
                text2: 'Votre planning a été ajouté avec succès'
            })
            reset()
        }

        if(error){
            Toast.show({
                type: 'error',
                text1: 'Erreur, veuillez reesayez',
                text2: error
            })
            reset()
        }
    }, [success, error])

    return(
        <View style={styles.conta}>
            <HeaderBack title={'Retour'} onPress={()=>{handleBack()}} />

            <ScrollView
                contentContainerStyle={{paddingBottom: 10}}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.cal}>
                    <Text style={styles.caal}>Chosissez un jour dans le calendrier</Text>
                    <Calendar
                        style={{
                            borderWidth: 1,
                            borderColor: 'gray',
                            height: 380
                        }}
                        current={today}
                        enableSwipeMonths={true}
                        theme={{
                            arrowColor: 'black'
                        }}
                        onDayPress={day => {
                            setSelected(day.dateString);
                        }}
                        markedDates={{
                            [selected]: {selected: true, disableTouchEvent: true, selectedColor: 'blue'}
                        }}
                    />

                    {selected && (
                        <View style={styles.sel}>
                            <Text style={styles.caal}>Date selectionnée:</Text>
                            <Text style={styles.kjh}>{FormatDate(selected)}</Text>
                        </View>
                    )}
                </View>


                <View style={styles.cal}>
                    <ButtonComponent
                        onPress={()=>{setOpen(true)}}
                        style={styles.kk}
                    >
                        <Text style={styles.caall}>Cliquez ici pour changer l'heure</Text>
                    </ButtonComponent>
                    <DatePicker
                        modal
                        open={open}
                        date={date}
                        mode="time"
                        
                        onConfirm={(d)=>{
                            setOpen(false)
                            setDate(d)
                        }}
                        onCancel={()=>{setOpen(false)}}
                    />

                    {date && (
                    <View style={styles.sel}>
                        <Text style={styles.caal}>Heure locale par défaut:</Text>
                        <Text style={styles.kjh}>{
                            date ? date.toLocaleTimeString(['fr-FR'],{
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                            }): 'Pas encore choisie'}
                        </Text>
                    </View>
                    )}
                </View>


                <ButtonComponent
                    style={[styles.save, !validateForm() && styles.fel]}
                    disabled={loading || !validateForm()}
                    onPress={()=>{handleHoraire()}}
                >
                    {loading ? (
                        <Loader couleur={'white'} />
                    ):(
                        <Text style={[styles.saveff]}>Enregistrer</Text>
                    )}
                </ButtonComponent>

            </ScrollView>
            
            
        </View>
    )
}


const styles = StyleSheet.create({
    fel:{
        backgroundColor: 'rgb(126, 126, 241)',
    },
    saveff:{
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    save:{
        padding: 12,
        backgroundColor: '#00f',
        marginTop: 20,
        borderRadius: 10
    },

    kk:{
        borderColor: '#00f',
        borderWidth:1,
        padding: 5,
        borderRadius: 5
    },
    kjh:{
        backgroundColor: '#00f',
        padding: 5,
        color: '#fff',
        fontWeight: 500,
        letterSpacing: 1
    },
    caall:{
        fontSize: 15,
        fontWeight: '500', textAlign: 'center'
    },
    caal:{
        fontSize: 15,
        fontWeight: '500'
    },
    cal:{
        marginVertical: 30,
        gap: 15
    },
    sel:{
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    conta:{
        marginHorizontal: 20,
        flex: 1
    }
})