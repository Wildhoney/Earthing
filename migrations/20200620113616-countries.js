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

    function toPolygon(coordinates) {
        return JSON.parse(`{
            "type": "Polygon",
            "coordinates": [[${coordinates.map((coordinates) => `[${coordinates.join(', ')}]`)}]]
        }`);
    }

    return db
        .createTable('countries', {
            id: { type: 'int', primaryKey: true, autoIncrement: true },
            name: { type: 'string' },
            code: { type: 'string' },
            area: { type: 'geography' },
        })
        .then(() =>
            countries.features.forEach((feature) => {
                if (feature.geometry.type === 'MultiPolygon') {
                    return feature.geometry.coordinates.map((coordinates) => {
                        return coordinates.map((coordinates) => {
                            return db.runSql(
                                'INSERT INTO countries (name, code, area) VALUES (?, ?, ST_GeomFromGeoJSON(?))',
                                [
                                    feature.properties.name,
                                    feature.properties.code,
                                    JSON.stringify(toPolygon(coordinates)),
                                ]
                            );
                        });
                    });
                }

                return db.runSql(
                    'INSERT INTO countries (name, code, area) VALUES (?, ?, ST_GeomFromGeoJSON(?))',
                    [feature.properties.name, feature.properties.code, feature.geometry]
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
