// All of this should be executed after the DOM is ready and the entire skin has been loaded.
// Image size used in the map (tiles 512px * 255 columns =  130560 + 384px padding = 131072)
var MAX_X = 131072; //padding in ts-map 384px
var MAX_Y = 131072; //padding in ts-map 384px
//var MAX_X = 65535; //padding 0
//var MAX_Y = 65535; //padding 0
	
// https://github.com/dariowouters/ts-map/issues/16#issuecomment-716160718
function game_coord_to_pixels(xx, yy) {
	// Values from TileMapInfo.json
	const x1 = -119982.891;
	const x2 = 32459.125;
	const y1 = -74726.88;
	const y2 = 77715.13;

	const xtot = x2 - x1; // Total X length
	const ytot = y2 - y1; // Total Y length

	const xrel = (xx - x1) / xtot; // The fraction where the X is (between 0 and 1, 0 being fully left, 1 being fully right)
	const yrel = (yy - y1) / ytot; // The fraction where the Y is

	return [
		xrel * MAX_X, // Where X actually is, so multiplied the actual width
		MAX_Y - (yrel * MAX_Y) // Where Y actually is, only Y is inverted
	];
}

// https://github.com/richtr/NoSleep.js
// Disabling screen lock on mobile devices
var noSleep = new NoSleep();
function enableNoSleep() {
  noSleep.enable();
  document.removeEventListener('touchstart', enableNoSleep, false);
}

// Enable wake lock.
// (must be wrapped in a user input event handler e.g. a mouse or touch handler)
document.addEventListener('touchstart', enableNoSleep, false);

function buildMap(target_element_id){
    var projection = new ol.proj.Projection({
        // Any name here. I chose "Funbit" because we are using funbit's image coordinates.
        code: 'Funbit',
        units: 'pixels',
        extent: [0, 0, MAX_X, MAX_Y],
        worldExtent: [0, 0, MAX_X, MAX_Y]
    });
    ol.proj.addProjection(projection);

    // Adding a marker for the player position/rotation.
    g_playerIcon = new ol.style.Icon({
        anchor: [0.5, 39],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        rotateWithView: true,
        src: g_pathPrefix + '/img/player_proportions.png'
    });
    var playerIconStyle = new ol.style.Style({
        image: g_playerIcon
    });
    g_playerFeature = new ol.Feature({
        geometry: new ol.geom.Point([MAX_X / 2, MAX_Y / 2])
    });
    // For some reason, we cannot pass the style in the constructor.
    g_playerFeature.setStyle(playerIconStyle);

    // Adding a layer for features overlaid on the map.
    var featureSource = new ol.source.Vector({
        features: [g_playerFeature],
        wrapX: false
    });
    var vectorLayer = new ol.layer.Vector({
        source: featureSource
    });

    // Configuring the custom map tiles.
    var custom_tilegrid = new ol.tilegrid.TileGrid({
        extent: [0, 0, MAX_X, MAX_Y],
        minZoom: 0,
        origin: [0, MAX_Y],
        tileSize: [512, 512],
		//tileSize: [256, 256],
        resolutions: (function(){
            var r = [];
            for (var z = 0; z <= 8; ++z) {
                r[z] = Math.pow(2, 8 - z);
            }
            return r;
        })()
    });

    // Creating custom controls.
    var rotate_control = new ol.control.Control({
        element: document.getElementById('rotate-button-div')
    });
    var speed_limit_control = new ol.control.Control({
        element: document.getElementById('speed-limit')
    });
    var text_control = new ol.control.Control({
        element: document.getElementById('map-text')
    });

    // Creating the map.
    g_map = new ol.Map({
        target: target_element_id,
        controls: [
            // new ol.control.ZoomSlider(),
            // new ol.control.OverviewMap(),
            // new ol.control.Rotate(),
            // new ol.control.MousePosition(),  // DEBUG
            new ol.control.Zoom(),
            rotate_control,
            speed_limit_control,
            text_control
            // TODO: Set 'tipLabel' on both zoom and rotate controls to language-specific translations.
        ],
        interactions: ol.interaction.defaults().extend([
            // Rotating by using two fingers is implemented in PinchRotate(), which is enabled by default.
            // With DragRotateAndZoom(), it is possible to use Shift+mouse-drag to rotate the map.
            // Without it, Shift+mouse-drag creates a rectangle to zoom to an area.
            new ol.interaction.DragRotateAndZoom()
        ]),
        layers: [
            getMapTilesLayer(projection, custom_tilegrid),
            getTextLayer(),
            // Debug layer below.
            // new ol.layer.Tile({
            //     extent: [0, 0, MAX_X, MAX_Y],
            //     source: new ol.source.TileDebug({
            //         projection: projection,
            //         tileGrid: custom_tilegrid,
            //         // tileGrid: ol.tilegrid.createXYZ({
            //         //  extent: [0, 0, MAX_X, MAX_Y],
            //         //  minZoom: 0,
            //         //  maxZoom: 7,
            //         //  tileSize: [256, 256]
            //         // }),
            //         wrapX: false
            //     })
            // }),
            vectorLayer
        ],
        view: new ol.View({
            projection: projection,
            extent: [0, 0, MAX_X, MAX_Y],
            //center: ol.proj.transform([37.41, 8.82], 'EPSG:4326', 'EPSG:3857'),
            center: [MAX_X/2, MAX_Y/2],
            minZoom: 2,
            maxZoom: 9,
            zoom: 5
        })
    });

    // Adding behavior to the custom button.
    var rotate_button = document.getElementById('rotate-button');
    var rotate_arrow = rotate_button.firstElementChild;
    g_map.getView().on('change:rotation', function(ev) {
        rotate_arrow.style.transform = 'rotate(' + ev.target.getRotation() + 'rad)';
    });
    rotate_button.addEventListener('click', function(ev) {
        if (g_behavior_center_on_player) {
            g_behavior_rotate_with_player = ! g_behavior_rotate_with_player;
        } else {
            g_behavior_center_on_player = true;
        }
    });

    // Detecting when the user interacts with the map.
    // https://stackoverflow.com/q/32868671/
    g_map.getView().on(['change:center', 'change:rotation'], function(ev) {
        if (g_ignore_view_change_events) {
            return;
        }

        // The user has moved or rotated the map.
        g_behavior_center_on_player = false;
    });

    return true;
}

function getMapTilesLayer(projection, tileGrid) {
    if (g_runningGame === 'ATS') {
        return new ol.layer.Tile({
            extent: [0, 0, MAX_X, MAX_Y],
            source: new ol.source.XYZ({
                projection: projection,
                url: g_pathPrefix + '/maps/ats/tiles/{z}/{x}/{y}.png',
                tileSize: [512, 512],
				//tileSize: [256, 256],
                // Using createXYZ() makes the vector layer (with the features) unaligned.
                // It also tries loading non-existent tiles.
                //
                // Using custom_tilegrid causes rescaling of all image tiles before drawing
                // (i.e. no image will be rendered at 1:1 pixels), But fixes all other issues.
                tileGrid: tileGrid,
                // tileGrid: ol.tilegrid.createXYZ({
                //     extent: [0, 0, MAX_X, MAX_Y],
                //     minZoom: 0,
                //     maxZoom: 7,
                //     tileSize: [256, 256]
                // }),
                wrapX: false,
                minZoom: 2,
                maxZoom: 9
            })
        });
    }

    return new ol.layer.Tile();
}

var STATE_NAME_TO_CODE = {
"arizona": "az",
"new_mexico": "nm",
"oregon": "or",
"washington": "wa",
"utah": "ut",
"idaho": "nm",
"california": "ca",
"nevada": "nv",
"oregon": "or",
"colorado": "co",
"wyoming": "wy",
"oklahoma": "ok",
"texas": "tx",
"nebraska": "ne",
"missouri": "mo",
};

function getTextFeatures() {
    var fill = new ol.style.Fill();
    fill.setColor('#fff');
    var stroke = new ol.style.Stroke();
    stroke.setColor('#000');
    stroke.setWidth(2);
    var createTextStyle = function(resolution) {
        var scale = Math.min(1, Math.max(0, 1.0 / Math.log2(resolution + 1) - 0.015));
        return [new ol.style.Style({
            //Creating a new image layer
			//If you need to display city flags, uncomment it by removing the comment marks.
 /*           image: new ol.style.Icon(({
                rotateWithView: false,
                anchor: [0.5, 1],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                snapToPixel: false,
                // Flag images from: http://usa.flagpedia.net/
                src: g_pathPrefix + '/flags-usa/' + this.get('cc') + '.png',
                scale: 4 / 16 * scale
            })),*/
            text: new ol.style.Text({
                //text: this.get('Name'),
				text: this.get('LocalizedNames')['en_us'],
                font: 'bold 48pt "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                textAlign: 'center',
                fill: fill,
                stroke: stroke,
                scale: scale,
                offsetY: 96 * scale
            })
        })];
    };
    var features = g_cities_json.map(function(city) {
        var map_coords = game_coord_to_pixels(city.X, city.Y);
        city.cc = STATE_NAME_TO_CODE[city.Country.toLowerCase()];
        var feature = new ol.Feature(city);
        feature.setGeometry(new ol.geom.Point(map_coords));
        feature.setStyle(createTextStyle);
        return feature;
    });
    return features;
}

function getTextLayer() {
    var textSource = new ol.source.Vector({
        features: getTextFeatures(),
        wrapX: false
    });
    var vectorLayer = new ol.layer.Vector({
        source: textSource
    });

    return vectorLayer;
}

// Global vars.
var g_playerFeature;
var g_playerIcon;
var g_behavior_center_on_player = true;
var g_behavior_rotate_with_player = true;
var g_ignore_view_change_events = false;

function updatePlayerPositionAndRotation(lon, lat, rot, speed) {
    var map_coords = game_coord_to_pixels(lon, lat);
    var rad = rot * Math.PI * 2;

    g_playerFeature.getGeometry().setCoordinates(map_coords);
    g_playerIcon.setRotation(-rad);

    g_ignore_view_change_events = true;
    if (g_behavior_center_on_player) {

        if (g_behavior_rotate_with_player) {
            var height = g_map.getSize()[1];
            var max_ahead_amount = height / 3.0 * g_map.getView().getResolution();

			//console.log(parseFloat((speed).toFixed(0)));
			//auto-zoom map by speed
			if(parseFloat((speed).toFixed(0)) >= 15 && parseFloat((speed).toFixed(0))  <= 35) {  g_map.getView().getZoom(g_map.getView().setZoom(9) ); }
			else if(parseFloat((speed).toFixed(0)) >= 51 && parseFloat((speed).toFixed(0)) <= 55) {  g_map.getView().getZoom(g_map.getView().setZoom(8) ); }
			else if(parseFloat((speed).toFixed(0)) >= 61 && parseFloat((speed).toFixed(0)) <= 65) {  g_map.getView().getZoom(g_map.getView().setZoom(7) ); }
			else if(parseFloat((speed).toFixed(0)) >= 81 && parseFloat((speed).toFixed(0)) <= 88) {  g_map.getView().getZoom(g_map.getView().setZoom(6) ); }

            var amount_ahead = speed * 0.25;
            amount_ahead = Math.max(-max_ahead_amount, Math.min(amount_ahead, max_ahead_amount));

            var ahead_coords = [
                map_coords[0] + Math.sin(-rad) * amount_ahead,
                map_coords[1] + Math.cos(-rad) * amount_ahead
            ];
            g_map.getView().setCenter(ahead_coords);
            g_map.getView().setRotation(rad);
        } else {
            g_map.getView().setCenter(map_coords);
            g_map.getView().setRotation(0);
        }
    }
    g_ignore_view_change_events = false;
}
