import { axiosInstance } from "@/plugins/axios-wrapper.js";

const HaleyGGAPI = {
  axiosInstance: axiosInstance,
  fetchProfile(playerName) {
    return this.axiosInstance({
      method: "GET",
      url: `/profiles/${playerName}/`
    });
  },
  fetchGameResult(params) {
    let index = 0;
    let queryString = "?"
    for(let key in params){
      if(index > 0){
        queryString += "&";
      }
      if(key == "league"){
        const league = params[key];
        queryString += `league=${league}`;
      }
      if(key == "players"){
        const playerNameList = params[key];
        queryString += `players=${playerNameList.join()}`;
      }
      index++;
    }
    return this.axiosInstance({
      method: "GET",
      url: `/game-results${queryString}`
    });
  },
  fetchRankOfLeague(leagueName) {
    return this.axiosInstance({
      method: "GET",
      url: `/rank?league=${leagueName}`
    });
  },
  fetchLeagueList() {
    return this.axiosInstance({
      method: "GET",
      url: `/leagues/`
    });
  },
}

export default HaleyGGAPI
