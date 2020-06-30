import React, { useState, useEffect } from 'react';
import useAsync from 'react-use/lib/useAsync';
import { camelizeKeys } from 'humps';
import { SafeAreaView, Text, ScrollView } from 'react-native';
import { API_URL } from 'dotenv';
import url from 'url-join';
import { Magnetometer } from 'expo-sensors';
import Place from '../../Place';
import { Model as PlaceModel } from '../../Place/types';
import Loading from '../../Loading';
import Error from '../../Error';
import * as t from './types';
import getStyles from './styles';
import * as utils from './utils';

Magnetometer.setUpdateInterval(1000);

export default function App() {
    const [compassHeading, setCompassHeading] = useState(90);

    useEffect(() => {
        const subscription = Magnetometer.addListener((result) => setCompassHeading(result.x));
        return () => subscription.remove();
    }, []);

    const places: t.Places = useAsync(async () => {
        const response = await fetch(
            url(API_URL, `51.5074/0.1278/${compassHeading}`)
        ).then((response) => response.json());
        return camelizeKeys(response);
    }, [utils.toNearestTen(compassHeading)]);

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
                            <Text style={style.description}>
                                Walking {Math.round(compassHeading)}˚ of your current location in a
                                straight line would take you through the following countries:
                            </Text>

                            <ScrollView style={style.scroll}>
                                {places.value.countries
                                    .filter((place: PlaceModel) => place.minimumDistance > 0)
                                    .map((place: PlaceModel) => (
                                        <Place key={place.name} model={place} />
                                    ))}
                            </ScrollView>
                        </>
                    )}
                </>
            )}
        </SafeAreaView>
    );
}
