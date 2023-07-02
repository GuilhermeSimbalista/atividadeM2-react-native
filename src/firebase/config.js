// importando a biblioteca do Firebase
import firebase from 'firebase/compat/app'
// importando a biblioteca para autenticação
import 'firebase/compat/auth'
// importando a biblioteca para o banco de dados
import 'firebase/compat/firestore'

//criando o objeto que ira conter os parâmetros de conexão com a aplicação Firebase
const firebaseConfig = {
    apiKey : 'AIzaSyDyaJyMMrj5JJhBJgJaigLWc0_m9RzVVAg',
    authDomain : 'atividade-react-native.firebaseapp.com',
    databaseURL : 'https://atividade-react-native.firebaseio.com',
    projectId : 'atividade-react-native',
    appId : '1:653183840442:ios:d3d16c714941107dde9283'
}


// inicializando o Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

// exportando o modulo
export { firebase }