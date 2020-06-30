import React, { useEffect, useState } from 'react';
import useAsyncRetry from 'react-use/lib/useAsyncRetry';
import useGetSet from 'react-use/lib/useGetSet';
import { camelizeKeys } from 'humps';
import { SafeAreaView, Text, ScrollView, View, RefreshControl } from 'react-native';
import { API_URL } from 'dotenv';
import url from 'url-join';
import { Magnetometer } from 'expo-sensors';
import Place from '../../Place';
import { Model as PlaceModel } from '../../Place/types';
import Loading from '../../Loading';
import Error from '../../Error';
import * as t from './types';
import style from './styles';
import * as utils from './utils';

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
        const subscription = Magnetometer.addListener((result) =>
            setHeading(utils.toHeading(result))
        );
        return () => subscription.remove();
    }, []);

    return (
        <SafeAreaView style={style.container}>
            {state.error ? (
                <Error />
            ) : (
                <ScrollView
                    style={style.scroll}
                    refreshControl={
                        <RefreshControl refreshing={state.loading} onRefresh={state.retry} />
                    }
                >
                    {state.value && (
                        <View style={style.background}>
                            <>
                                <Text style={style.description}>
                                    Walking {Math.abs(Math.round(state.value.heading))}˚
                                    {utils.getDirection(state.value.heading)} from your current
                                    location in a straight line would take you through the following
                                    countries:
                                </Text>

                                <Text style={style.instruction}>
                                    (Swipe down to update the list for{' '}
                                    {Math.abs(Math.round(getHeading()))}˚{' '}
                                    {utils.getDirection(getHeading())})
                                </Text>

                                <View style={{ marginTop: 20 }}>
                                    {state.value.list
                                        .filter((place: PlaceModel) => place.minimumDistance > 0)
                                        .map((place: PlaceModel) => (
                                            <Place key={place.name} model={place} />
                                        ))}
                                </View>
                            </>
                        </View>
                    )}
                </ScrollView>
            )}
        </SafeAreaView>
    );
}
