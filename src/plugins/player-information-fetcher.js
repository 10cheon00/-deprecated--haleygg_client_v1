import { axiosInstance } from "@/plugins/axios-wrapper.js";

const fetchPlayerInformationUsingAxios = (playerName) => {
  return axiosInstance({
    method: "GET",
    url: '/player-information/' + playerName,
  });
}

const fetchPlayerInformationRelatedWithOpponentUsingAxios = 
  (playerName, opponentName) => {
    return axiosInstance({
      method: "GET",
      url: "/player-information/" + playerName + "?versus=" + opponentName
    });
  }

export{
  fetchPlayerInformationUsingAxios,
  fetchPlayerInformationRelatedWithOpponentUsingAxios
}