import { Model } from '../../Place/types';

export type State = {
    value?: { list: Model[]; heading: number };
    error?: Error;
    retry: () => void;
    loading: boolean;
};

export type Directions = 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW' | 'N';
