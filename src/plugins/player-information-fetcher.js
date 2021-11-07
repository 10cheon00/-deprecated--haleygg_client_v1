import { axiosInstance } from "@/plugins/axios-wrapper.js";

const fetchPlayerInformationUsingAxios = (userName) => {
  return axiosInstance({
    method: "GET",
    url: '/player/' + userName + '/',
  });
}

export{
  fetchPlayerInformationUsingAxios
}