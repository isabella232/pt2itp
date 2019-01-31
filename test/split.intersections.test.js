const fs = require('fs');
const test = require('tape');
const pg = require('pg');
const { Split, SplitFeat } = require('../lib/map/split');
const turf = require('@turf/turf');

test('Split: Simple Intersection', (t) => {
    let feat = new SplitFeat(
        1,
        [{
            "display": "Dulaney Valley Road",
            "tokenized": "dulaney vly rd",
            "tokenless": "dulaney"
        }],
        {
            1: {"id":1,"output":true,"number":2}
            2: {"id":2,"output":true,"number":10}
            3: {"id":3,"output":true,"number":20}
        },
        { "type": "MultiLineString", "coordinates": [[ [ -79.43969249725342, 38.74246924858317 ], [ -79.43917751312256, 38.74222238816381 ], [ -79.43901658058167, 38.742201467750064 ], [ -79.43888247013092, 38.74234372644267 ], [ -79.43876981735228, 38.74251108924762 ], [ -79.43842113018036, 38.742753764618044 ], [ -79.4379597902298, 38.742791421067146 ], [ -79.43735361099243, 38.74278723701823 ], [ -79.43683326244354, 38.74285836581647 ], [ -79.43651139736176, 38.743004807236844 ], [ -79.43585157394409, 38.74388344945229 ], [ -79.43511664867401, 38.74597541121073 ], [ -79.4350254535675, 38.74628501634416 ], [ -79.43521320819855, 38.74643981840743 ] ] ] }
        {"type":"MultiPoint","coordinates": [[-79.43893074989319, 38.74276213271957], [-79.43694591522217, 38.74308011985037], [-79.43537950515747, 38.74588336618241]] },
        [{
        
        }]
    );

    const split = new Split({
        stdout: false,
        debug: true,
        country: 'us'
    });

    split.split(feat, (err, res) => {
        t.error(err);

        t.equals(res.length, 1);

        res = res[0];

        t.end();
    });
});
