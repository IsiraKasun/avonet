
import axios from 'axios';
import { configs } from '../app/appConfigs';

const baseURL = configs.baseURL;

const useCallAPI = async(configs) => {
  configs.baseURL = baseURL;

  const response = await axios(configs);

  return response;
    
};

export default useCallAPI;