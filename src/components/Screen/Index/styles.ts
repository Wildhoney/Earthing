import { StyleSheet } from 'react-native';

type Styles = { isLoading: boolean };

export default function getStyles({ isLoading }: Styles) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            marginTop: 5,
            alignItems: isLoading ? 'center' : undefined,
            justifyContent: isLoading ? 'center' : undefined,
        },
    });
}
