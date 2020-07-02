import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 20,
        minHeight: 50,
        marginTop: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 0,
    },
    count: {
        color: '#777',
        fontSize: 14,
        fontWeight: 'bold',
    },
    distance: {
        fontSize: 12,
        color: '#999',
        marginTop: 3,
    },
});
