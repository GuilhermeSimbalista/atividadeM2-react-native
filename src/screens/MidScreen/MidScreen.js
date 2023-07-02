// importando as bibliotecas
import React, { useEffect, useState } from 'react'
import { Text,TouchableOpacity,View } from 'react-native'
import styles from './styles'
import { firebase } from '../../firebase/config'



export default function MidScreen({navigation}) {


    const onFoodPress = () => {
        navigation.navigate("Food")

    }
    const onDrinkPress = () => {
        navigation.navigate("Drink")
    }
    
    const onUtilitiesPress = () => {
        navigation.navigate("Utility")
    }

    const onFrozenPress = () => {
        navigation.navigate("Frozen")
    }

    return(
        <View>
        <TouchableOpacity style={styles.button} onPress={() => onFoodPress()}>
            <Text style={styles.buttonTitle}>Comidas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {onDrinkPress()}}>
            <Text style={styles.buttonTitle}>Bebidas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {onUtilitiesPress()}}>
            <Text style={styles.buttonTitle}>Utilitário</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {onFrozenPress()}}>
            <Text style={styles.buttonTitle}>Congelados</Text>
        </TouchableOpacity>

        </View>
    )
}