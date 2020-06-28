import humps from 'humps';

export function getFlag(name: string): { uri: string } {
    function getURI() {
        switch (name) {
            case 'Belgium':
                return require('../../assets/flags/belgium.svg');
            case 'Czech Republic':
                return require('../../assets/flags/czech-republic.svg');
            case 'France':
                return require('../../assets/flags/france.svg');
            case 'Germany':
                return require('../../assets/flags/germany.svg');
            case 'Iran':
                return require('../../assets/flags/iran.svg');
            case 'Ireland':
                return require('../../assets/flags/ireland.svg');
            case 'Italy':
                return require('../../assets/flags/italy.svg');
            case 'Netherlands':
                return require('../../assets/flags/netherlands.svg');
            case 'New Zealand':
                return require('../../assets/flags/new-zealand.svg');
            case 'Poland':
                return require('../../assets/flags/poland.svg');
            case 'Portugal':
                return require('../../assets/flags/portugal.svg');
            case 'Spain':
                return require('../../assets/flags/spain.svg');
            case 'Ukraine':
                return require('../../assets/flags/ukraine.svg');
            case 'United Arab Emirates':
                return require('../../assets/flags/united-arab-emirates.svg');
            case 'United Kingdom':
                return require('../../assets/flags/united-kingdom.svg');
        }
    }

    return { uri: getURI() };
}

export function getSlug(name: string): string {
    return humps.decamelize(name, { separator: '-' }).replace(/\s/, '');
}
