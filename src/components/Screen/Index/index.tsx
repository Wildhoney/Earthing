import React, { useState } from 'react';
import { useAsync } from 'react-use';
import { camelizeKeys } from 'humps';
import { View } from 'react-native';
import style from './styles';
import Place from '../../Place';

type Place = { name: string };

export default function App() {
    const [active, setActive] = useState(null);

    const places = useAsync(async () => {
        const response = await fetch('http://localhost:5000/51.5074/0.1278/90').then((response) =>
            response.json()
        );
        return camelizeKeys(response);
    });

    return (
        <View style={style.container}>
            {!places.loading &&
                places.value.countries.map((place: Place) => (
                    <Place
                        key={place.name}
                        model={place}
                        isActive={place.name === active}
                        onClick={setActive}
                    />
                ))}
        </View>
    );
}
