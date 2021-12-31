import axios from "axios";
import * as Config from "./../../constants/Config_Api_Get_Address";

export default function Callapi(endpoint, method = "GET", body) {
  return axios({
    
    method: method,
    url: ` ${Config.API_URL}/${endpoint}`,
    data: body,
  }).catch((error) => {

  });
}
