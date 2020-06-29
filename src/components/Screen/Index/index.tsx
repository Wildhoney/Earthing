import React from 'react';
import useAsync from 'react-use/lib/useAsync';
import { camelizeKeys } from 'humps';
import { SafeAreaView, Text } from 'react-native';
import Place from '../../Place';
import { Model as PlaceModel } from '../../Place/types';
import Loading from '../../Loading';
import Error from '../../Error';
import * as t from './types';
import getStyles from './styles';

export default function App() {
    const places: t.Places = useAsync(async () => {
        const response = await fetch('http://localhost:5000/51.5074/0.1278/90').then((response) =>
            response.json()
        );
        return camelizeKeys(response);
    });

    const style = getStyles({ isLoading: places.loading });

    return (
        <SafeAreaView style={style.container}>
            {places.loading ? (
                <Loading />
            ) : (
                <>
                    {places.error ? (
                        <Error />
                    ) : (
                        <>
                            {places.value.countries
                                .filter((place: PlaceModel) => place.minimumDistance > 0)
                                .map((place: PlaceModel) => (
                                    <Place key={place.name} model={place} />
                                ))}
                        </>
                    )}
                </>
            )}
        </SafeAreaView>
    );
}
