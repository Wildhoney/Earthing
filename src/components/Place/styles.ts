import { StyleSheet } from 'react-native';

type Styles = { isActive: boolean };

export default function getStyles({ isActive }: Styles) {
    return StyleSheet.create({
        container: {
            backgroundColor: 'lightgray',
            flex: isActive ? 3 : 1,
            textShadow: '1px 1px 1px #333',
            marginBottom: 5,
            marginLeft: 5,
            marginRight: 5,
            minHeight: isActive ? 500 : 200,
        },
        background: {
            padding: 20,
            flex: 1,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
        },
        name: {
            color: 'white',
            fontSize: 24,
            fontWeight: 'bold',
            textTransform: 'capitalize',
        },
        distance: {
            color: 'white',
            fontSize: 12,
        },
    });
}
