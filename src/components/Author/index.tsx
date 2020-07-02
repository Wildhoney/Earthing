import React, { ReactElement } from 'react';
import { Text, TouchableOpacity, Linking } from 'react-native';
import styles from './styles';

const url = 'https://github.com/Wildhoney';

export default function Author(): ReactElement {
    const handleClick = async () => {
        try {
            await Linking.canOpenURL(url);
            Linking.openURL(url);
        } catch {}
    };

    return (
        <TouchableOpacity onPress={handleClick}>
            <Text style={styles.container}>{url}</Text>
        </TouchableOpacity>
    );
}
