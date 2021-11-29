import AxiosInstance from "@/plugins/axios-wrapper.js";

const HaleyGGAPI = {
  AxiosInstance: AxiosInstance,
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
    return this.AxiosInstance({
      method: "GET",
      url: `/profiles/`
    });
  },
  fetchProfile(playerName) {
    return this.AxiosInstance({
      method: "GET",
      url: `/profiles/${playerName}/`
    });
  },
  fetchGameResult(params) {
    const queryString = this.parseParams(params)
    return this.AxiosInstance({
      method: "GET",
      url: `/game-results${queryString}`
    });
  },
  fetchStatistics(params) {
    const queryString = this.parseParams(params);
    return this.AxiosInstance({
      method: "GET",
      url: `/statistics${queryString}`
    });
  },
  fetchRanking(params) {
    const queryString = this.parseParams(params);
    return this.AxiosInstance({
      method: "GET",
      url: `/ranking${queryString}`
    });
  }
}

export default HaleyGGAPI
