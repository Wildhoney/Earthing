'use strict';

let dbm;
let type;
let seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = function (db) {
    const countries = require('../data/countries.json');

    function asPolygon(coordinates) {
        return JSON.parse(`{
            "type": "Polygon",
            "coordinates": [[${coordinates.map((coordinates) => `[${coordinates.join(', ')}]`)}]]
        }`);
    }

    return db
        .createTable('countries', {
            id: { type: 'int', primaryKey: true, autoIncrement: true },
            name: { type: 'string' },
            area: { type: 'geography' },
        })
        .then(() =>
            countries.features.forEach((feature) => {
                if (feature.geometry.type === 'MultiPolygon') {
                    return feature.geometry.coordinates.map((coordinates) => {
                        return coordinates.map((coordinates) => {
                            return db.runSql(
                                'INSERT INTO countries (name, area) VALUES (?, ST_GeomFromGeoJSON(?))',
                                [feature.properties.ADMIN, JSON.stringify(asPolygon(coordinates))]
                            );
                        });
                    });
                }

                return db.runSql(
                    'INSERT INTO countries (name, area) VALUES (?, ST_GeomFromGeoJSON(?))',
                    [feature.properties.ADMIN, feature.geometry]
                );
            })
        );
};

exports.down = function (db) {
    return db.dropTable('countries');
};

exports._meta = {
    version: 1,
};
