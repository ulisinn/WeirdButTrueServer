const Parse = require('parse/node');

Parse.initialize("WeirdButTrue");
Parse.serverURL = 'http://localhost:1337/parse';

const CATEGORIES = require('./merged/Categories.json');
const ANIMAL_FACTS = require('./merged/AnimalFacts.json');
const FOOD_FACTS = require('./merged/FoodFacts.json');
const HUMAN_FACTS = require('./merged/HumanFacts.json');
const INSECT_FACTS = require('./merged/InsectFacts.json');
const MISC_FACTS = require('./merged/MiscellaneousFacts.json');
const OUTER_SPACE_FACTS = require('./merged/OuterSpaceFacts.json');
const PLANT_FACTS = require('./merged/PlantFacts.json');
const SEA_WATER_FACTS = require('./merged/SeaWaterFacts.json');
const SPORTS_FACTS = require('./merged/SportsFacts.json');
const TECHNOLOGY_FACTS = require('./merged/TechnologyFacts.json');
const VEHICLE_FACTS = require('./merged/VehicleFacts.json');
const WEATHER_FACTS = require('./merged/WeatherFacts.json');

const Categories = Parse.Object.extend("Categories");
const AnimalFacts = Parse.Object.extend("AnimalFacts");
const FoodFacts = Parse.Object.extend("FoodFacts");
const HumanFacts = Parse.Object.extend("HumanFacts");
const InsectFacts = Parse.Object.extend("InsectFacts");
const MiscellaneousFacts = Parse.Object.extend("MiscellaneousFacts");
const OuterSpaceFacts = Parse.Object.extend("OuterSpaceFacts");
const PlantFacts = Parse.Object.extend("PlantFacts");
const SeaWaterFacts = Parse.Object.extend("SeaWaterFacts");
const SportsFacts = Parse.Object.extend("SportsFacts");
const TechnologyFacts = Parse.Object.extend("TechnologyFacts");
const VehicleFacts = Parse.Object.extend("VehicleFacts");
const WeatherFacts = Parse.Object.extend("WeatherFacts");


function deleteItems(name) {
    const promise = new Parse.Promise();
    const q = new Parse.Query(name);
    q.limit(1000);
    q.find().then(function (cat) {
        Parse.Object.destroyAll(cat).then(function () {
            console.log(`${name} deleted...`, cat);
            promise.resolve();
        });
    });
    return promise;
}

function createItems(name, list, ParseObject) {
    const promise = new Parse.Promise();
    console.log(`Creating ${name}...`, list.length);
    const promises = [];
    list.forEach((item) => {
        const parseObject = new ParseObject();
        promises.push(parseObject.save(item));
    });

    Parse.Promise.when(promises).then(function (response) {
        console.log(`All ${name} created: ${response.length}`);
        promise.resolve();
    }, function error(err) {
        console.error(err);
    });

    return promise;
}


deleteItems('Categories')
.then(createItems('Categories', CATEGORIES, Categories))

.then(deleteItems('AnimalFacts'))
.then(createItems('AnimalFacts', ANIMAL_FACTS, AnimalFacts))

.then(deleteItems('FoodFacts'))
.then(createItems('FoodFacts', FOOD_FACTS, FoodFacts))

.then(deleteItems('HumanFacts'))
.then(createItems('HumanFacts', HUMAN_FACTS, HumanFacts))

.then(deleteItems('InsectFacts'))
.then(createItems('InsectFacts', INSECT_FACTS, InsectFacts))

.then(deleteItems('MiscellaneousFacts'))
.then(createItems('MiscellaneousFacts', MISC_FACTS, MiscellaneousFacts))

.then(deleteItems('OuterSpaceFacts'))
.then(createItems('OuterSpaceFacts', OUTER_SPACE_FACTS, OuterSpaceFacts))

.then(deleteItems('PlantFacts'))
.then(createItems('PlantFacts', PLANT_FACTS, PlantFacts))

.then(deleteItems('SeaWaterFacts'))
.then(createItems('SeaWaterFacts', SEA_WATER_FACTS, SeaWaterFacts))

.then(deleteItems('SportsFacts'))
.then(createItems('SportsFacts', SPORTS_FACTS, SportsFacts))

.then(deleteItems('TechnologyFacts'))
.then(createItems('TechnologyFacts', TECHNOLOGY_FACTS, TechnologyFacts))

.then(deleteItems('VehicleFacts'))
.then(createItems('VehicleFacts', VEHICLE_FACTS, VehicleFacts))

.then(deleteItems('WeatherFacts'))
.then(createItems('WeatherFacts', WEATHER_FACTS, WeatherFacts));

