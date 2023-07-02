// realizando as importações
import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { FoodScreen, LoginScreen, MidScreen, RegistrationScreen, DrinkScreen, UtilitiesScreen, UtilitiesViewScreen, DrinkViewScreen, FoodViewScreen, EditDrinkScreen, EditFoodScreen, EditUtilityScreen, FrozenScreen, FrozenViewScreen, EditFrozenScreen} from './src/screens'
import { decode, encode } from 'base-64'
import { firebase } from './src/firebase/config'

if (!global.btoa) {
  global.btoa = encode
}

if (!global.atob) {
  global.atob = decode
}

// criando um objeto para a pilha de navegação
const Stack = createStackNavigator()

// criando a aplicação
export default function App() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  /**
   * criando uma estrutura para recuperar os
   * os dados do usuário autenticado no banco
   * e gravar localmente para que, uma vez
   * feito o login, o usuário vá sempre para
   * a Home (a menos que limpe os dados do app)
   */

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users')
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        /**
         * recuperando do 'Firestore' os dados do
         * documento do usuário logado e enviando
         * estes dados para uma constante
         */
        usersRef
          .doc(user.uid)
          .get()
          .then(document => {
            const userData = document.data()
            setLoading(false)
            /**
             * enviando o conteúdo da constante 'userData'
             * (escopo local) para a constante do 'app'
             * chamada 'user'
             */
            setUser(userData)
          })
          .catch(error => {
            setLoading(false)
          })
      } else {
        setLoading(false)
      }
    })
  }, [])

  if (loading) {
    return <></>
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          // se o usuário estiver logado
          // redireciona a rota para a 'Home'
          <Stack.Screen name="Mid">
            {props => <MidScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          // se o usuário não estiver logado
          // disponibiliza os componentes para
          // 'login' ou registro
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            
          </>
        )}
        <Stack.Screen name="Food">
            {props => <FoodScreen {...props} extraData={user} />}
          </Stack.Screen>


            <Stack.Screen name="Drink">
            {props => <DrinkScreen {...props} extraData={user} />}
          </Stack.Screen>

          <Stack.Screen name="Utility">
            {props => <UtilitiesScreen {...props} extraData={user} />}
          </Stack.Screen>

          <Stack.Screen name="UtilitiesView">
            {props => <UtilitiesViewScreen {...props} extraData={user} />}
          </Stack.Screen>

          <Stack.Screen name="FoodsView">
            {props => <FoodViewScreen {...props} extraData={user} />}
          </Stack.Screen>

          <Stack.Screen name="DrinksView">
            {props => <DrinkViewScreen {...props} extraData={user} />}
          </Stack.Screen>

          <Stack.Screen name="DrinksEdit">
            {props => <EditDrinkScreen {...props} extraData={user} />}
          </Stack.Screen>

          <Stack.Screen name="FoodsEdit">
            {props => <EditFoodScreen {...props} extraData={user} />}
          </Stack.Screen>

          <Stack.Screen name="UtilitiesEdit">
            {props => <EditUtilityScreen {...props} extraData={user} />}
          </Stack.Screen>

          <Stack.Screen name="Frozen">
            {props => <FrozenScreen {...props} extraData={user} />}
          </Stack.Screen>

          <Stack.Screen name="FrozenView">
            {props => <FrozenViewScreen {...props} extraData={user} />}
          </Stack.Screen>

          <Stack.Screen name="FrozenEdit">
            {props => <EditFrozenScreen {...props} extraData={user} />}
          </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  )
}