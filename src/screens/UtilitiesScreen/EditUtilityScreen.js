// importando as bibliotecas
import React, { useState, useEffect } from 'react'
import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native'
import styles from '../style/styles'
import { firebase } from '../../firebase/config'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function EditUtilityScreen({ navigation, ...props }) {
    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [expirationDate, setExpirationDate] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [itemText, setItemText] = useState('')
    const [entity, setEntity] = useState({
        name: '',
        brand: '',
        expirationDate: '',
        price: '',
        quantity: '',
        authorId : '',
        text : '',
        createAt : {
            nanoseconds : "",
            seconds : ""
        }
    })

useEffect(() => {
    const entityRef = firebase
                        .firestore()
                        .collection('utilities')

    entityRef.doc(props.route.params.itemId)
                .get()
                .then(firestoreDocument => {
                    if (!firestoreDocument.exists) {
                        alert('Item não encontrado!')
                        return
                    }
                    const item = firestoreDocument.data()
                    setName(item.name)
                    setBrand(item.brand)
                    setExpirationDate(item.expirationDate)
                    setQuantity(item.quantity)
                    setPrice(item.price)
                    setItemText(item.text)
                    setEntity(item)
                })
                .catch(error => {
                    console.log(error)
                })
}, [])
    //Onde iremos realizar a atualização do documento
    const onAlterarButtonPress = () => {
        const entityRef = firebase 
                            .firestore()
                            .collection('utilities')
                            .doc(props.route.params.itemId)

    const timeStamp = firebase.firestore.FieldValue.serverTimestamp()
    //atualizando o documento
    entityRef
        .set({
            name: name,
            brand: brand,
            expirationDate: expirationDate,
            price: price,
            quantity: quantity,
            authorId : entity.authorId,
            text : itemText,
            createAt : entity.createAt,
            updateAt : timeStamp
        })
        .then(() => {
            navigation.navigate('UtilitiesView')
        })
        .catch(error => {
            console.log(error)
        })
    }

    const onVoltarButtonPress = () => {
    navigation.navigate('UtilitiesView')
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
        <TextInput
            style={styles.input}
            onChangeText={name => setName(name)}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            value={name}
        />
        <TextInput
            style={styles.input}
            onChangeText={brand => setBrand(brand)}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            value={brand}
        />
        <TextInput
            style={styles.input}
            onChangeText={expirationDate => setExpirationDate(expirationDate)}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            value={expirationDate}
        />
        <TextInput
            style={styles.input}
            onChangeText={price => setPrice(price)}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            value={price}
        />
        <TextInput
            style={styles.input}
            onChangeText={quantity => setQuantity(quantity)}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            value={quantity}
        />
        <TextInput
            style={styles.input}
            onChangeText={text => setItemText(text)}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            value={itemText}
        />

        <View style={styles.viewButtons}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => onVoltarButtonPress()}
            >
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>

        <TouchableOpacity
            style={styles.button}
            onPress={() => onAlterarButtonPress()}>
            <Text style={styles.buttonText}>Alterar</Text>
        </TouchableOpacity>
    </View>
    </KeyboardAwareScrollView>
</View>
    ) 
}