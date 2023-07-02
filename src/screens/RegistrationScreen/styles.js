import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center'
    },
    logo: {
        display: 'flex',
        height: 180,
        width: 300,
        alignSelf: 'center',
        margin: 20
    },
    input: {
        height: 50,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        marginTop: 10,
        marginRight: 30,
        marginBottom: 20,
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
    buttonTitle: {
        color: 'ffffff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    footerView: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: '#788eec',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 50
    },

})