const gameResults = [
  {
    "id": 0,
    "date": "2021-10-22",
    "league": "EPL",
    "description": "1라운드",
    "game_type": "melee",
    "winners": [
      {"user": "Kevin", "race": "terran"}
    ],
    "map": "서킷",
    "losers": [
      {"user": "Dave", "race": "zerg"}
    ],
    "remarks": ""
  },
  {
    "id": 1,
    "date": "2021-10-23",
    "league": "EPL",
    "description": "2라운드",
    "game_type": "melee",
    "winners": [
      {"user": "Dave", "race": "zerg"}
    ],
    "map": "투혼",
    "losers": [
      {"user": "Kevin", "race": "terran"}
    ],
    "remarks": "기권패"
  },
  {
    "id": 2,
    "date": "2021-10-24",
    "league": "EPL",
    "description": "3라운드",
    "winners": [
      {"user": "Dave", "race": "zerg"},
      {"user": "Robb", "race": "zerg"},
      {"user": "Bob", "race": "terran"}
    ],
    "map": "헌터",
    "losers": [
      {"user": "Kevin", "race": "terran"},
      {"user": "John", "race": "protoss"},
      {"user": "Steve", "race": "protoss"}
    ],
    "remarks": ""
  },
  {
    "id": 3,
    "date": "2021-10-23",
    "league": "test",
    "description": "test",
    "game_type": "melee",
    "winners": [
      {"user": "Kevin", "race": "terran"}
    ],
    "map": "tes",
    "losers": [
      {"user": "Dave", "race": "zerg"}
    ],
    "remarks": ""
  },
  {
    "id": 4,
    "date": "2021-10-23",
    "league": "test",
    "description": "test",
    "game_type": "melee",
    "winners": [
      {"user": "Dave", "race": "zerg"}
    ],
    "map": "test1",
    "losers": [
      {"user": "Kevin", "race": "terran"}
    ],
    "remarks": ""
  },
  {
    "id": 5,
    "date": "2021-10-23",
    "league": "test",
    "description": "test2",
    "game_type": "melee",
    "winners": [
      {"user": "Kevin", "race": "terran"}
    ],
    "map": "test",
    "losers": [
      {"user": "Dave", "race": "zerg"}
    ],
    "remarks": ""
  },
  {
    "id": 6,
    "date": "2021-10-23",
    "league": "test",
    "description": "test3",
    "game_type": "melee",
    "winners": [
      {"user": "Dave", "race": "zerg"}
    ],
    "map": "test",
    "losers": [
      {"user": "Kevin", "race": "terran"}
    ],
    "remarks": ""
  },

  {
    "id": 7,
    "date": "2021-10-23",
    "league": "test",
    "description": "test4",
    "game_type": "melee",
    "winners": [
      {"user": "Kevin", "race": "terran"}
    ],
    "map": "test",
    "losers": [
      {"user": "Dave", "race": "zerg"}
    ],
    "remarks": ""
  },
  {
    "id": 8,
    "date": "2021-10-23",
    "league": "test",
    "description": "test5",
    "game_type": "melee",
    "winners": [
      {"user": "Dave", "race": "zerg"}
    ],
    "map": "test",
    "losers": [
      {"user": "Kevin", "race": "terran"}
    ],
    "remarks": ""
  },
  {
    "id": 9,
    "date": "2021-10-23",
    "league": "test",
    "description": "test6",
    "game_type": "melee",
    "winners": [
      {"user": "Kevin", "race": "terran"}
    ],
    "map": "test",
    "losers": [
      {"user": "Dave", "race": "zerg"}
    ],
    "remarks": ""
  },
  {
    "id": 10,
    "date": "2021-10-23",
    "league": "test",
    "description": "test",
    "game_type": "melee",
    "winners": [
      {"user": "Dave", "race": "zerg"}
    ],
    "map": "test",
    "losers": [
      {"user": "Kevin", "race": "terran"}
    ],
    "remarks": ""
  },
  {
    "id": 11,
    "date": "2021-10-23",
    "league": "test",
    "description": "testaa",
    "game_type": "melee",
    "winners": [
      {"user": "Dave", "race": "zerg"}
    ],
    "map": "test",
    "losers": [
      {"user": "Kevin", "race": "terran"}
    ],
    "remarks": ""
  },

  {
    "id": 12,
    "date": "2021-10-23",
    "league": "test",
    "description": "testaaasd",
    "game_type": "melee",
    "winners": [
      {"user": "Dave", "race": "zerg"}
    ],
    "map": "test",
    "losers": [
      {"user": "Kevin", "race": "terran"}
    ],
    "remarks": ""
  },
]

const userProfiles = [
  {
    "name": {"user": "Kevin", "race": "terran"},
    "most_race": "terran",
    "signup_date": "2021-10-21",
    "career": "empty"
  },
  {
    "name": {"user": "Dave", "race": "zerg"},
    "most_race": "protoss",
    "signup_date": "2021-09-02",
    "career": "league mvp"
  },
  {
    "name": "Robb",
    "most_race": "zerg",
    "signup_date": "2021-12-21",
    "career": "league winner"
  },
];


const userElos = [
  {
    "name": "Kevin",
    "elo": [
      { date: "2021-10-21", value: 1200 },
      { date: "2021-10-22", value: 1201 },
      { date: "2021-10-23", value: 1226 },
      { date: "2021-10-25", value: 1212 },
      { date: "2021-10-30", value: 1199 },
      { date: "2021-11-01", value: 1180 },
      { date: "2021-12-12", value: 1195 },
      { date: "2021-12-13", value: 1203 },
    ]
  },
  {
    "name": "Dave",
    "elo": [
      { date: "2021-10-21", value: 1200 },
      { date: "2021-10-22", value: 1223 },
      { date: "2021-10-23", value: 1219 },
      { date: "2021-10-24", value: 1230 },
    ]
  }
];

const fetchPlayerInformationFromApi = (userName) => {
  /*
  Server must return a couple of items. 
  profile, game results, elo, etc. (to be added..)
  Request to server once. Server will response with data.
  */

  let userInformation = {};
  
  userInformation["profile"] = userProfiles.find(e => e["name"] == userName);
  userInformation["elo"] = userElos.find(e => e["name"] == userName)["elo"];
  userInformation["gameResults"] = gameResults;
  
  let winRates = parseGameResult(userInformation["gameResults"], userName)
  userInformation["winRates"] = calculateWinRate(winRates);

  return userInformation;
}

const parseGameResult = (gameResults, userName) => {
  let winRates = {
    melee: {
      total: {
        games: 0,
        wins: 0,
        rate: 0
      },
      protoss: {
        games: 0,
        wins: 0,
        rate: 0
      },
      terran: {
        games: 0,
        wins: 0,
        rate: 0
      },
      zerg: {
        games: 0,
        wins: 0,
        rate: 0
      }
    },
    topAndBottom: {
        games: 0,
        wins: 0,
        rate: 0
    }
  };
  
  const isPlayerWin = (user, winners) => {
    return winners.some(e => e["user"] == user);
  }

  // presuppose that all result is related to player who given.
  gameResults.forEach(game => {
    if(game["game_type"] == "melee"){
      // presume user loses.
      let opponentRace = game["winners"][0]["race"]; 
      if(isPlayerWin(userName, game["winners"])){
        // but user wins, change opponent race.
        opponentRace = game["losers"][0]["race"];
        winRates["melee"][opponentRace].wins++;
      }
      winRates["melee"][opponentRace].games++;
    }
    else{
      // Top and bottom games doesn't count by race.
      // Does only count win.
      if(isPlayerWin(userName, game["winners"])){
        winRates["topAndBottom"].wins++;
      }
      winRates["topAndBottom"].games++;
    }
  });

  winRates["melee"]["total"].games = 
    winRates["melee"]["protoss"].games +
    winRates["melee"]["terran"].games +
    winRates["melee"]["zerg"].games;

  winRates["melee"]["total"].wins = 
    winRates["melee"]["protoss"].wins +
    winRates["melee"]["terran"].wins +
    winRates["melee"]["zerg"].wins;
  return winRates;
}


const calculateWinRate = (winRates) => {
  const calculatePercentage = (obj) => {
    obj.rate = Math.floor(obj.wins / obj.games * 1000 ) / 10;
    if(isNaN(obj.rate)){
      obj.rate = 0;
    }
    return obj;
  }

  winRates["melee"]["total"] = calculatePercentage(winRates["melee"]["total"]);
  winRates["melee"]["protoss"] = calculatePercentage(winRates["melee"]["protoss"]);
  winRates["melee"]["terran"] = calculatePercentage(winRates["melee"]["terran"]);
  winRates["melee"]["zerg"] = calculatePercentage(winRates["melee"]["zerg"]);
  winRates["topAndBottom"] = calculatePercentage(winRates["topAndBottom"]);

  return winRates;
}

export {
  fetchPlayerInformationFromApi
}