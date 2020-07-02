import React from 'react';
import { SafeAreaView, Text, ScrollView, View, RefreshControl } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import Place from '../../Place';
import { Model as PlaceModel } from '../../Place/types';
import Error from '../../Error';
import style from './styles';
import * as utils from './utils';

Magnetometer.setUpdateInterval(1000);

export default function App() {
    const getHeading = utils.useHeading();
    const result = utils.useResult(getHeading);
    const heading = getHeading();

    return (
        <SafeAreaView style={style.container}>
            {result.error ? (
                <Error />
            ) : (
                <ScrollView
                    style={style.scroll}
                    refreshControl={
                        <RefreshControl refreshing={result.loading} onRefresh={result.retry} />
                    }
                >
                    {result.value && (
                        <View style={style.background}>
                            <>
                                <Text style={style.description}>
                                    Walking {Math.abs(Math.round(result.value.heading))}˚
                                    {utils.getDirection(result.value.heading)} from your current
                                    location in a straight line would take you through the following
                                    countries:
                                </Text>

                                {heading != null && (
                                    <Text style={style.instruction}>
                                        Swipe down to update the list for{' '}
                                        {Math.abs(Math.round(heading))}˚{' '}
                                        {utils.getDirection(heading)}
                                    </Text>
                                )}

                                <View style={{ marginTop: 20 }}>
                                    {result.value.list
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
