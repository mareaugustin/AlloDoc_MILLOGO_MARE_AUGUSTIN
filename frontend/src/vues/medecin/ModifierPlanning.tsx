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
import { usePut } from "../../hooks/usePut";


export default function ModifierPlanning({navigation, route}){

    const {horaire} = route.params || {}
    const [selected, setSelected] = useState('')
    const today = new Date().toISOString().split('T')[0]
    const [date, setDate ] = useState(new Date())
    const [open, setOpen]= useState(false)
    const heure = date.toTimeString().split(' ')[0]; 
    

    const {loading, error, success, putData, reset} = usePut(horaire ? `/horaires/modifier/${horaire.id}` : null)
    
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
        await putData(
            {
                date: selected,
                heures: heure
            }
        )
        
    }

    useEffect(()=>{
        if(success){
            handleBack()
            Toast.show({
                type: 'success',
                text1: 'Mis à jour de planning réussie',
                text2: 'Votre planning a été modifié avec succès'
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
                        current={horaire?.date || today}
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

                    <View style={[styles.sel, selected && styles.hide]}>
                        <Text style={styles.caal}>Date actuelle:</Text>
                        <Text style={styles.kjh}>{FormatDate(horaire?.date)}</Text>
                    </View>

                    {selected && (
                        <View style={styles.sel}>
                            <Text style={styles.caal}>Nouvelle date:</Text>
                            <Text style={styles.kjh}>{FormatDate(selected)}</Text>
                        </View>
                    )}
                </View>


                <View style={styles.cal}>
                    <ButtonComponent
                        onPress={()=>{setOpen(true)}}
                        style={styles.kk}
                    >
                        <Text style={styles.caall}>Cliquez ici pour Mettre à jour l'heure</Text>
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

                    <View style={styles.sel}>
                        <Text style={styles.caal}>Heure actuelle de votre créneau:</Text>
                        <Text style={styles.kjh}>{horaire?.heures || 'r'}</Text>
                    </View>
                    <View style={styles.sel}>
                        <Text style={styles.caal}>Nouvelle heure par defaut:</Text>
                        <Text style={styles.kjh}>{
                            date ? date.toLocaleTimeString(['fr-FR'],{
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                            }): 'Pas encore choisie'}
                        </Text>
                    </View>
                </View>


                <ButtonComponent
                    style={[styles.save, !validateForm() && styles.fel]}
                    disabled={loading || !validateForm()}
                    onPress={()=>{handleHoraire()}}
                >
                    {loading ? (
                        <Loader couleur={'white'} />
                    ):(
                        <Text style={[styles.saveff]}>Mettre à jour</Text>
                    )}
                </ButtonComponent>

            </ScrollView>
            
            
        </View>
    )
}


const styles = StyleSheet.create({
    hide:{
        display: 'none'
    },

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