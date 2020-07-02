import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5,
    },
    background: {
        flex: 1,
        // backgroundColor: '#121212',
        paddingTop: 30,
        paddingBottom: 30,
    },
    scroll: {
        flex: 1,
        display: 'flex',
    },
    description: {
        // color: 'white',
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 10,
        fontSize: 12,
        lineHeight: 18,
    },
    instruction: {
        color: 'darkgray',
        fontSize: 12,
        fontStyle: 'italic',
        lineHeight: 18,
        paddingLeft: 30,
        paddingRight: 30,
    },
});
