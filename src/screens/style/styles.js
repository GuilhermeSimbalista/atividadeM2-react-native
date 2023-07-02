import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    logo: {
        display: 'flex',
        height: 180,
        width: 300,
        alignSelf: 'center',
        margin: 20
    },
    formContainer: {
        height: 80,
        marginTop: 10,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: '600',
        marginRight: 'auto',
        marginBottom: 15,
        marginLeft: 'auto',
    },
    input: {
        height: 50,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        marginTop: 5,
        marginRight: 30,
        marginBottom: 15,
        marginLeft: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 50,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonTwo: {
        backgroundColor: '#788eec',
        marginBottom: 80,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 50,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    listContainer: {
        width:'70%',
        marginTop: 5,
        padding: 20
    },
    entityContainer: {
        marginTop: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    entityText: {
        fontSize: 20,
        color: '#333333'
    },
    buttonView: {
        marginTop: 30,
        width: '70%'
    },
    buttonViewTwo: {
        flex: 1,
        alignItems: 'start',
        justifyContent: 'end'
    }
})