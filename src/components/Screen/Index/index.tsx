import React, { useEffect } from 'react';
import useAsyncRetry from 'react-use/lib/useAsyncRetry';
import useGetSet from 'react-use/lib/useGetSet';
import { camelizeKeys } from 'humps';
import { SafeAreaView, Text, ScrollView, Button, View } from 'react-native';
import { API_URL } from 'dotenv';
import url from 'url-join';
import { Magnetometer } from 'expo-sensors';
import Place from '../../Place';
import { Model as PlaceModel } from '../../Place/types';
import Loading from '../../Loading';
import Error from '../../Error';
import * as t from './types';
import style from './styles';

Magnetometer.setUpdateInterval(1000);

export default function App() {
    const [getHeading, setHeading] = useGetSet(0);

    const state: t.Places = useAsyncRetry(async () => {
        const response = await fetch(
            url(API_URL, `51.5074/0.1278/${getHeading()}`)
        ).then((response) => response.json());

        return { list: camelizeKeys(response.countries), heading: getHeading() };
    }, []);

    useEffect(() => {
        const subscription = Magnetometer.addListener((result) => setHeading(result.x));
        return () => subscription.remove();
    }, []);

    return (
        <SafeAreaView style={style.container}>
            {state.loading ? (
                <Loading />
            ) : (
                <>
                    {state.error ? (
                        <Error />
                    ) : (
                        <ScrollView style={style.scroll}>
                            <Text style={style.description}>
                                Walking {Math.round(state.value.heading)}˚ from your current
                                location in a straight line would take you through the following
                                countries:
                            </Text>

                            <Button
                                title={`Refresh List for ${Math.round(getHeading())}˚`}
                                color="white"
                                accessibilityLabel={`Refresh the list of countries for ${Math.round(
                                    getHeading()
                                )}˚`}
                                onPress={state.retry}
                            />

                            <View style={{ marginTop: 20 }}>
                                {state.value.list
                                    .filter((place: PlaceModel) => place.minimumDistance > 0)
                                    .map((place: PlaceModel) => (
                                        <Place key={place.name} model={place} />
                                    ))}
                            </View>
                        </ScrollView>
                    )}
                </>
            )}
        </SafeAreaView>
    );
}
