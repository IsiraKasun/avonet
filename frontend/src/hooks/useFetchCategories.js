import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { configs } from '../app/appConfigs';
import { fill } from '../features/categories/catSlice';
import { useDispatch } from 'react-redux';

const baseURL = configs.baseURL;

const useFetchCategories = (url, categoryUpdated) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  let configs = {
    baseURL: baseURL,
    url: url,
    method: 'get',
    headers: {'authorization': user.token}
  }

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const callAPI = async () => {
      try {
        const response = await axios(configs);
        console.log(response.data.catagories);
        setData(response.data.catagories);
        dispatch(fill(response.data.catagories));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    callAPI();
  }, [url, categoryUpdated]);

    
  return { data, loading, error };
};

export default useFetchCategories;