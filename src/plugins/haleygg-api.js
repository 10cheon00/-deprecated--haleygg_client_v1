import { axiosInstance } from "@/plugins/axios-wrapper.js";

const HaleyGGAPI = {
  axiosInstance: axiosInstance,
  parseParams(params=undefined) {
    if(params == undefined){
      return "";
    }
    let index = 0;
    let queryString = "?"
    for(let key in params){
      if(index > 0){
        queryString += "&";
      }
      if(key == "players"){
        const playerNameList = params[key];
        queryString += `players=${playerNameList.join()}`;
      }
      else{
        const value = params[key]
        queryString += `${key}=${value}`;
      }
      index++;
    }
    return queryString;
  },
  fetchProfileList() {
    return this.axiosInstance({
      method: "GET",
      url: `/profiles/`
    });
  },
  fetchProfile(playerName) {
    return this.axiosInstance({
      method: "GET",
      url: `/profiles/${playerName}/`
    });
  },
  fetchGameResult(params) {
    const queryString = this.parseParams(params)
    return this.axiosInstance({
      method: "GET",
      url: `/game-results${queryString}`
    });
  },
  fetchStatistics(params) {
    const queryString = this.parseParams(params);
    return this.axiosInstance({
      method: "GET",
      url: `/statistics${queryString}`
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
