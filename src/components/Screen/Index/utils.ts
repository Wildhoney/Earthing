import useMount from 'react-use/lib/useMount';
import useGetSet from 'react-use/lib/useGetSet';
import useAsyncRetry from 'react-use/lib/useAsyncRetry';
import { camelizeKeys } from 'humps';
import { API_URL } from 'dotenv';
import url from 'url-join';
import * as Location from 'expo-location';

export function useResult(getHeading) {
    return useAsyncRetry(async () => {
        const { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') throw new Error('Permission denied.');

        // const { trueHeading, magHeading } =
        //     heading != null ? { trueHeading: heading } : await Location.getHeadingAsync();
        // const heading = trueHeading === -1 ? magHeading : trueHeading;

        const heading = getHeading();
        const {
            coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync();

        const response = await fetch(
            url(API_URL, `${latitude}/${longitude}/${heading}`)
        ).then((response) => response.json());

        return { list: camelizeKeys(response.countries), heading };
    }, []);
}

export function useHeading() {
    const [getHeading, setHeading] = useGetSet(null);

    useMount(async () => {
        const heading = await Location.watchHeadingAsync(({ trueHeading, magHeading }) =>
            setHeading(trueHeading === -1 ? magHeading : trueHeading)
        );

        return () => heading.remove();
    });

    return getHeading;
}

export function getDirection(degree: number): string {
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
