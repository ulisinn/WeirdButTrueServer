const Parse = require('parse/node');

Parse.initialize("WeirdButTrue");
Parse.serverURL = 'http://localhost:1337/parse';

const CATEGORIES = require('./all_questions_data/Categories.json');
const ANIMAL_FACTS = require('./all_questions_data/AnimalFacts.json');
const FOOD_FACTS = require('./all_questions_data/FoodFacts.json');
const HUMAN_FACTS = require('./all_questions_data/HumanFacts.json');
const INSECT_FACTS = require('./all_questions_data/InsectFacts.json');
const MISC_FACTS = require('./all_questions_data/MiscellaneousFacts.json');
const OUTER_SPACE_FACTS = require('./all_questions_data/OuterSpaceFacts.json');
const PLANT_FACTS = require('./all_questions_data/PlantFacts.json');
const SEA_WATER_FACTS = require('./all_questions_data/SeaWaterFacts.json');
const SPORTS_FACTS = require('./all_questions_data/SportsFacts.json');
const TECHNOLOGY_FACTS = require('./all_questions_data/TechnologyFacts.json');
const VEHICLE_FACTS = require('./all_questions_data/VehicleFacts.json');
const WEATHER_FACTS = require('./all_questions_data/WeatherFacts.json');


// const TEAMS_JSON_URL = "https://gist.githubusercontent.com/jawache/0be7f073eb27762d97cac34972ea3468/raw/e8b4f92e7ca677da38700e43e506971d9d592a2a/premier_teams.json";

// const PLAYERS_JSON_URL = "https://gist.githubusercontent.com/jawache/e281399ba5d63dc10bd170dd2b0f707f/raw/9821e89146b13dc42abcf8fb7e69939c55ee5886/premier_football_players.json";

// const COFFEE_JSON_URL = "https://gist.githubusercontent.com/jawache/2a11d6fb31e79dcf827e2d42d1326e4b/raw/403a967604107e9b9f24df23ce6ba5cb6c7fc5d0/coffee_shops_east_london.json";

// const Team = Parse.Object.extend("Team");
// const Player = Parse.Object.extend("Player");
// const Place = Parse.Object.extend("Place");

// const TEAMS_MAP = {};

const Team = Parse.Object.extend("Team");

const Categories = Parse.Object.extend("Categories");

function deleteCategories() {
    const promise = new Parse.Promise();
    const q = new Parse.Query("Categories");
    q.limit(1000);
    q.find().then(function (cat) {
        Parse.Object.destroyAll(cat).then(function () {
            console.log("Categories deleted... ", cat);
            promise.resolve();
        });
    });
    return promise;
}

function createCategories() {
    const promise = new Parse.Promise();
    console.log("Creating Categories...", CATEGORIES);
    const promises = [];
    CATEGORIES.forEach((item) => {
        const cat = new Categories();
        promises.push(cat.save(item));
    });

    Parse.Promise.when(promises).then(function () {
        console.log("All Categories created");
        promise.resolve();
    }, function error(err) {
        console.error(err);
    });

    return promise;
}


deleteCategories()
.then(createCategories);
// .then(deletePlayers)
// .then(createPlayers)
// .then(deletePlaces)
// .then(createPlaces);

