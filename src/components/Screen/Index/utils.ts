import useMount from 'react-use/lib/useMount';
import useGetSet from 'react-use/lib/useGetSet';
import useAsyncRetry from 'react-use/lib/useAsyncRetry';
import { camelizeKeys } from 'humps';
// @ts-ignore
import { API_URL } from 'dotenv';
import url from 'url-join';
import * as Location from 'expo-location';
import { Model } from '../../Place/types';
import * as t from './types';

export function useResult(getHeading: () => number | null): t.State {
    return useAsyncRetry(async () => {
        const { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') throw new Error('Permission denied.');

        const heading =
            getHeading() ??
            (await (async () => {
                const { trueHeading, magHeading } = await Location.getHeadingAsync();
                return trueHeading === -1 ? magHeading : trueHeading;
            })());

        const {
            coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync();

        const response = await fetch(
            url(API_URL, `${latitude}/${longitude}/${heading}`)
        ).then((response) => response.json());

        return { list: camelizeKeys(response.countries) as Model[], heading };
    }, []);
}

export function useHeading(): () => number | null {
    const [getHeading, setHeading] = useGetSet<number | null>(null);

    useMount(async () => {
        const heading = await Location.watchHeadingAsync(({ trueHeading, magHeading }) =>
            setHeading(trueHeading === -1 ? magHeading : trueHeading)
        );

        return () => heading.remove();
    });

    return getHeading;
}

export function getDirection(degree: number): 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW' | 'N' {
    if (degree >= 22.5 && degree < 67.5) {
        return 'NE';
    } else if (degree >= 67.5 && degree < 112.5) {
        return 'E';
    } else if (degree >= 112.5 && degree < 157.5) {
        return 'SE';
    } else if (degree >= 157.5 && degree < 202.5) {
        return 'S';
    } else if (degree >= 202.5 && degree < 247.5) {
        return 'SW';
    } else if (degree >= 247.5 && degree < 292.5) {
        return 'W';
    } else if (degree >= 292.5 && degree < 337.5) {
        return 'NW';
    }
    return 'N';
}
