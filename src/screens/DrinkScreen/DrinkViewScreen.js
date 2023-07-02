// importando as bibliotecas
import React, { useEffect, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View, Alert } from 'react-native'
import styles from '../style/styles'
import { firebase } from '../../firebase/config'

export default function DrinkViewScreen({navigation, ...props}) {
  const [drinks, setDrinks] = useState([])

  const drinkRef = firebase.firestore().collection('drinks')
  const userId = props.extraData.id

  useEffect(() => {
    drinkRef.where('authorId', '==', userId).onSnapshot(
      querySnapshot => {
        const newDrink = []
        querySnapshot.forEach(doc => {
          const drink = doc.data()
          drink.id = doc.id
          newDrink.push(drink)
        })
        setDrinks(newDrink)
      },
      error => {
        console.log(error)
      }
    )
  }, [])

  const onEditButtonPress = (itemId) => {
    // abrindo a tela para edição do item e enviando o ID do item como parametro
    navigation.navigate('DrinksEdit', { itemId })
  }

  const onDelButtonPress = (itemId) => {
    Alert.alert(
      'Apagar Item',
      'Você tem, certeza?',
      [{
        text: "Sim",
        // se o usuario clicar em 'Sim' ira executar a rotina para exclusão do documento
        onPress: () => {
          // buscando pelo documento que possui o id no formato
          const entityRef = firebase
                              .firestore()
                              .collection('drinks')
                              .doc(itemId)
          // iniciando o processo para exclusão do documento
          entityRef
            .delete()
            .then((res) => {
              console.log(`Item ${itemId} removido`)
            })
            .catch(error => {
              console.log(error)
            })
        }
      },
      {
        text: "Não",
        onPress: () => 
          console.log("Nenhum item removido"),
          style: 'cancel'
      }
    ],
    {
      cancelable: true
    }
    )
  }

  const renderDrink = ({ item, index }) => {
    return (
      <View style={styles.entityContainer}>
        <Text style={styles.entityText}>{index}</Text>
        <Text style={styles.entityText}>Nome: {item.name}</Text>
        <Text style={styles.entityText}>Marca: {item.brand}</Text>
        <Text style={styles.entityText}>Data de validade: {item.expirationDate}</Text>
        <Text style={styles.entityText}>Quantidade: {item.quantity}</Text>
        <Text style={styles.entityText}>Preço: {item.price}</Text>
        <Text style={styles.entityText}>Descrição: {item.text}</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => onEditButtonPress(item.id)}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => onDelButtonPress(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.buttonView}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Drink')}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={drinks}
          renderItem={renderDrink}
          keyExtractor={item => item.id}
          removeClippedSubviews={true}
        />
      </View>
    </View>
  )
}
