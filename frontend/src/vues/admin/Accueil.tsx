import React from "react";
import { Text, View , StyleSheet} from "react-native";
import HeaderComponent from "../../components/specifics/Header";
import { useGet } from "../../hooks/useGet";
import Loader from "../../components/commons/LoadingComponent";
import CardStats from "../../components/specifics/admin/CardStats";

export default function Accueil(){


    const {loading, error, data, getData} = useGet('/admin/stats')


    return(
        <View style={styles.container}>
            <HeaderComponent title="Bienvenue" icone="dashboard" />
            <View style={styles.conu}>
                <View style={styles.conud}>
                    <Text style={styles.conuo}>Total Utilisateurs</Text>
                    {loading ? (
                        <Loader couleur={'white'} />
                    ):(
                        <Text style={styles.conuot}>{data?.user > 9 ? data?.user : `0${data?.user}` || 'N/A'}</Text>
                    )}

                    {error && (<Text style={styles.er}>{error}</Text>)}
                </View>
            </View>

            <View style={styles.coi}>
                <CardStats
                    loading={loading}
                    error={error}
                    titre={'Total Médécins'}
                    nombre={data?.medecin > 9 ? data?.medecin : `0${data?.medecin}` || 'N/A'}
                />

                <CardStats
                    loading={loading}
                    error={error}
                    titre={'Total Patients'}
                    nombre={data?.patient > 9 ? data?.patient : `0${data?.patient}` || 'N/A'}
                />
               
            </View>

            <View style={styles.coi}>
                <CardStats
                    loading={loading}
                    error={error}
                    titre={'Total Spécialités'}
                    nombre={data?.specialite > 9 ? data?.specialite : `0${data?.specialite}` || 'N/A'}
                />

                <CardStats
                    loading={loading}
                    error={error}
                    titre={'Rendez-Vous'}
                    nombre={data?.rendezVous > 9 ? data?.rendezVous : `0${data?.rendezVous}` || 'N/A'}
                />
                
            </View>

            


        </View>
    )
}


const styles = StyleSheet.create({
    coi:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    hide:{
        display: 'none'
    },
    aucun:{
        color: 'gray',
        textAlign: 'center'
    },
    er:{
        color: '#f00',
        fontWeight: 'bold'
    },
    contain:{
        marginTop: 40,
        gap: 20
    },
    conupd:{
        backgroundColor: 'rgba(0,0,255,0.7)',
        width:180,
        gap: 20,
        padding: 20,
        borderRadius: 5
    },
    conud:{
        backgroundColor: 'rgba(0,0,255,0.7)',
        justifyContent: 'flex-start',
        gap: 20,
        padding: 20,
        borderRadius: 5
    },
    conu:{
        
        paddingTop: 30
    },
    conuo:{
        fontWeight: 'bold',
        fontSize: 18,
        color:'#fff'
    },
    conuotr:{
        fontWeight: 'bold',
        fontSize: 18,
        backgroundColor: '#fff',
        alignSelf: 'center',
        padding: 20,
        borderRadius: 15
    },
    conuot:{
        fontWeight: 'bold',
        fontSize: 18,
        backgroundColor: '#fff',
        alignSelf: 'flex-start',
        padding: 20,
        borderRadius: 15
    },
    container:{
        marginHorizontal: 20,
        flex: 1
    }
})