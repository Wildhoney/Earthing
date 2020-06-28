import humps from 'humps';

export function getImage(name: string): { uri: string } {
    try {
        return { uri: require(`../../assets/places/${getSlug(name)}.jpg`) };
    } catch {
        return { uri: '' };
    }
}

export function getSlug(name: string): string {
    return humps.decamelize(name, { separator: '-' }).replace(/\s/, '');
}
