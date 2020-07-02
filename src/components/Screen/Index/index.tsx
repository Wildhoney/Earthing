import React, { ReactElement } from 'react';
import { SafeAreaView, Text, ScrollView, View, RefreshControl } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import Place from '../../Place';
import Error from '../../Error';
import styles from './styles';
import * as utils from './utils';

Magnetometer.setUpdateInterval(1000);

export default function App(): ReactElement {
    const getHeading = utils.useHeading();
    const result = utils.useResult(getHeading);
    const heading = getHeading();

    return (
        <SafeAreaView style={styles.container}>
            {result.error ? (
                <Error />
            ) : (
                <ScrollView
                    style={styles.scroll}
                    refreshControl={
                        <RefreshControl refreshing={result.loading} onRefresh={result.retry} />
                    }
                >
                    {result.value && (
                        <View style={styles.background}>
                            <>
                                <Text style={styles.description}>
                                    Walking {Math.abs(Math.round(result.value.heading))}˚
                                    {utils.getDirection(result.value.heading)} from your current
                                    location in a straight line would take you through the following
                                    countries:
                                </Text>

                                {heading != null && (
                                    <Text style={styles.instruction}>
                                        Swipe down to update the list for{' '}
                                        {Math.abs(Math.round(heading))}˚{' '}
                                        {utils.getDirection(heading)}
                                    </Text>
                                )}

                                <View style={{ marginTop: 20 }}>
                                    {result.value.list
                                        .filter((place) => place.minimumDistance > 0)
                                        .map((place) => (
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
