'use strict';

/**
 * Exposes a post function to dedupe addresses within a given addressnumber cluster
 * @param {Object} feat     GeoJSON Feature to dedupe
 * @return {Object}         Output GeoJSON feature to write to output
 */
function post(feat) {
    if (!feat || !feat.properties || !feat.properties['carmen:addressnumber']) return feat;
    if (!Array.isArray(feat.properties['carmen:addressnumber'])) return feat;
    if (!feat.geometry || !feat.geometry.geometries || !feat.geometry.geometries.length) return feat;

    if (feat.properties['carmen:addressprops']) {
        throw new Error('dedupe must be run before props post script');
    } else if (!feat.properties.address_props) {
        feat.properties.address_props = [];
    }

    for (let i = 0; i < feat.properties['carmen:addressnumber'].length; i++) {
        if (!Array.isArray(feat.properties['carmen:addressnumber'][i])) continue;

        const number = [];
        const coords = [];
        const props = [];

        for (let j = 0; j < feat.properties['carmen:addressnumber'][i].length; j++) {
            if (!feat.properties['carmen:addressnumber'][i][j]) continue;

            if (number.indexOf(feat.properties['carmen:addressnumber'][i][j]) === -1) {
                number.push(feat.properties['carmen:addressnumber'][i][j]);
                coords.push(feat.geometry.geometries[i].coordinates[j]);
                props.push(feat.properties.address_props[j] ? feat.properties.address_props[j] : {});
            }
        }

        feat.properties['carmen:addressnumber'][i] = number;
        feat.geometry.geometries[i].coordinates = coords;
        feat.properties.address_props = props;

        if (feat.properties['carmen:addressnumber'][i].length === 0) {
            delete feat.properties['carmen:addressnumber'];
            ['carmen:parityl', 'carmen:lfromhn', 'carmen:ltohn', 'carmen:parityr', 'carmen:rfromhn', 'carmen:rtohn'].forEach((prop) => {
                feat.properties[prop].pop();
            });
            feat.geometry.geometries.splice(i, 1);

            return feat;
        }
    }

    return feat;
}

module.exports.post = post;
