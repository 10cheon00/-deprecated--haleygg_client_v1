const gameResults = [
  {
    "id": 0,
    "date": "2021-10-22",
    "league": "EPL",
    "description": "1라운드",
    "winners": [
      "Kevin"
    ],
    "map": "서킷",
    "losers": [
      "Dave"
    ],
    "remarks": ""
  },
  {
    "id": 1,
    "date": "2021-10-23",
    "league": "EPL",
    "description": "2라운드",
    "winners": [
      "Dave"
    ],
    "map": "투혼",
    "losers": [
      "Kevin"
    ],
    "remarks": "기권패"
  },
  {
    "id": 2,
    "date": "2021-10-24",
    "league": "EPL",
    "description": "3라운드",
    "winners": [
      "Dave",
      "Robb",
      "Ned",
    ],
    "map": "헌터",
    "losers": [
      "Kevin",
      "Steven",
      "Gale"
    ],
    "remarks": ""
  },
  {
    "id": 3,
    "date": "2021-10-23",
    "league": "test",
    "description": "test",
    "winners": [
      "Dave"
    ],
    "map": "tes",
    "losers": [
      "Kevin"
    ],
    "remarks": ""
  },
  {
    "id": 4,
    "date": "2021-10-23",
    "league": "test",
    "description": "test",
    "winners": [
      "Dave"
    ],
    "map": "test1",
    "losers": [
      "Kevin"
    ],
    "remarks": ""
  },
  {
    "id": 5,
    "date": "2021-10-23",
    "league": "test",
    "description": "test2",
    "winners": [
      "Dave"
    ],
    "map": "test",
    "losers": [
      "Kevin"
    ],
    "remarks": ""
  },
  {
    "id": 6,
    "date": "2021-10-23",
    "league": "test",
    "description": "test3",
    "winners": [
      "Dave"
    ],
    "map": "test",
    "losers": [
      "Kevin"
    ],
    "remarks": ""
  },

  {
    "id": 7,
    "date": "2021-10-23",
    "league": "test",
    "description": "test4",
    "winners": [
      "Dave"
    ],
    "map": "test",
    "losers": [
      "Kevin"
    ],
    "remarks": ""
  },
  {
    "id": 8,
    "date": "2021-10-23",
    "league": "test",
    "description": "test5",
    "winners": [
      "Dave"
    ],
    "map": "test",
    "losers": [
      "Kevin"
    ],
    "remarks": ""
  },
  {
    "id": 9,
    "date": "2021-10-23",
    "league": "test",
    "description": "test6",
    "winners": [
      "Dave"
    ],
    "map": "test",
    "losers": [
      "Kevin"
    ],
    "remarks": ""
  },
  {
    "id": 10,
    "date": "2021-10-23",
    "league": "test",
    "description": "test",
    "winners": [
      "Dave"
    ],
    "map": "test",
    "losers": [
      "Kevin"
    ],
    "remarks": ""
  },
  {
    "id": 11,
    "date": "2021-10-23",
    "league": "test",
    "description": "testaa",
    "winners": [
      "Dave"
    ],
    "map": "test",
    "losers": [
      "Kevin"
    ],
    "remarks": ""
  },

  {
    "id": 12,
    "date": "2021-10-23",
    "league": "test",
    "description": "testaaasd",
    "winners": [
      "Dave"
    ],
    "map": "test",
    "losers": [
      "Kevin"
    ],
    "remarks": ""
  },
]

const userProfiles = [
  {
    "name": "Kevin",
    "most_race": "terran",
    "signup_date": "2021-10-21",
    "career": "empty"
  },
  {
    "name": "Dave",
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

const fetchUserInformationFromApi = (userName) => {
  /*
  Server must return a couple of items. 
  profile, game results, elo, etc. (to be added..)
  Request to server once. Server will response with data.
  */

  let userInformation = {};

  userInformation['profile'] = userProfiles.find(e => e["name"] == userName);
  userInformation['elo'] = userElos.find(e => e["name"] == userName)['elo'];
  userInformation['gameResults'] = gameResults;
  return userInformation
}

export {
  fetchUserInformationFromApi
}