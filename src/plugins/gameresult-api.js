const fetchGameResultFromApi = () => {
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
    return gameResults;
};

const fetchUserInformationFromApi = (userName) => {
    const userInformations = [
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

    const userInformation = userInformations.find(userInformation => userInformation["name"] == userName);
    if(userInformation !== undefined){
        return userInformation;
    }
    return {};
}


export{
    fetchGameResultFromApi,
    fetchUserInformationFromApi,
}