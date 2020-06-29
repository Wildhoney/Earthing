import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        minHeight: 100,
        // boxShadow: '0 5px 5px -5px rgba(0, 0, 0, 0.25)',
    },
    flag: {
        width: 55,
        height: 35,
        marginLeft: 20,
        marginRight: 20,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        backgroundColor: 'black',
        color: 'white',
        borderRadius: 3,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 2,
        paddingBottom: 2,
    },
    distance: {
        fontSize: 12,
        color: '#999',
        marginTop: 3,
    },
});
