import React from 'react';
import { Text, TouchableOpacity, Linking } from 'react-native';
import style from './styles';

const url = 'https://github.com/Wildhoney';

export default function Author() {
    const handleClick = async () => {
        try {
            await Linking.canOpenURL(url);
            Linking.openURL(url);
        } catch {}
    };

    return (
        <TouchableOpacity onPress={handleClick}>
            <Text style={style.container}>{url}</Text>
        </TouchableOpacity>
    );
}
