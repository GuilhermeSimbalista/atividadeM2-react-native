// importando as bibliotecas
import React, { useEffect, useState } from 'react'
import { Image, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from '../style/styles'
import { firebase } from '../../firebase/config'

export default function UtilitiesScreen({navigation, ...props}) {
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [expirationDate, setExpirationDate] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [utilityText, setUtilityText] = useState('')
  const [utilities, setUtilities] = useState([])

  const utilityRef = firebase.firestore().collection('utilities')
  const userId = props.extraData.id

  useEffect(() => {
    utilityRef.where('authorId', '==', userId).onSnapshot(
      querySnapshot => {
        const newUtilities = []
        querySnapshot.forEach(doc => {
          const utility = doc.data()
          utility.id = doc.id
          newUtilities.push(utility)
        })
        setUtilities(newUtilities)
      },
      error => {
        console.log(error)
      }
    )
  }, [])
  const onAddButtonPress = () => {
    if (utilityText && utilityText.length > 0) {
      const timeStamp = firebase.firestore.FieldValue.serverTimestamp()
      const data = {
        name,
        brand,
        expirationDate,
        quantity,
        price,
        text: utilityText,
        authorId: userId,
        createAt: timeStamp
      }
      utilityRef
        .add(data)
        .then(_doc => {
          setName('')
          setBrand('')
          setExpirationDate('')
          setQuantity('')
          setPrice('')
          setUtilityText('')
          Keyboard.dismiss()
        })
        .catch(error => {
          alert(error)
        })
    }
  }
  return (
    <View style={styles.container}>
        <KeyboardAwareScrollView
        style={{
          display: 'flex',
          width: '100%'
        }}
      >
          <Image
          style={styles.logo}
          source={require('../../../assets/icon.png')}
        />
      <Text style={styles.title}>Cadastro de Utilitarios</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira o nome"
          placeholderTextColor="#aaaaaa"
          onChangeText={name => setName(name)}
          value={name}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Insira a marca"
          placeholderTextColor="#aaaaaa"
          onChangeText={brand => setBrand(brand)}
          value={brand}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Insira a data de validade"
          placeholderTextColor="#aaaaaa"
          onChangeText={expirationDate => setExpirationDate(expirationDate)}
          value={expirationDate}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Insira a quantidade"
          placeholderTextColor="#aaaaaa"
          onChangeText={quantity => setQuantity(quantity)}
          value={quantity}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Insira o preço"
          placeholderTextColor="#aaaaaa"
          onChangeText={price => setPrice(price)}
          value={price}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Insira a descrição"
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setUtilityText(text)}
          value={utilityText}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonTwo} onPress={() => navigation.navigate('UtilitiesView')}>
          <Text style={styles.buttonText}>Visualizar</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  )
}
