import { axiosInstance } from '@/plugins/axios-wrapper.js';

// const userElos = [
//   {
//     "name": "Kevin",
//     "elo": [
//       { date: "2021-10-21", value: 1200 },
//       { date: "2021-10-22", value: 1201 },
//       { date: "2021-10-23", value: 1226 },
//       { date: "2021-10-25", value: 1212 },
//       { date: "2021-10-30", value: 1199 },
//       { date: "2021-11-01", value: 1180 },
//       { date: "2021-12-12", value: 1195 },
//       { date: "2021-12-13", value: 1203 },
//     ]
//   },
//   {
//     "name": "Dave",
//     "elo": [
//       { date: "2021-10-21", value: 1200 },
//       { date: "2021-10-22", value: 1223 },
//       { date: "2021-10-23", value: 1219 },
//       { date: "2021-10-24", value: 1230 },
//     ]
//   }
// ];

const fetchPlayerInformationFromApi = (userName, userInformationRef) => {
  /*
  Server must return a couple of items. 
  profile, game results, elo, etc. (to be added..)
  Request to server once. Server will response with data.
  */

  
  axiosInstance({
    method: "GET",
    url: '/player/' + userName + '/',
  }).then(response => {
    console.log(response.data)
    userInformationRef.value["profile"] = response.data.profile;
    userInformationRef.value["game_results"] = response.data.game_results;
    
    let winRates = parseGameResult(userInformationRef.value["game_results"], userName)
    userInformationRef.value["winRates"] = calculateWinRate(winRates);
  });
  // userInformationRef.value["elo"] = userElos.find(e => e["name"] == userName)["elo"];
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
  
  const isPlayerWin = (username, winners) => {
    return winners.some(e => e["name"] == username);
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