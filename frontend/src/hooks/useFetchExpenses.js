import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { configs } from '../app/appConfigs';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { fill } from '../features/expenses/expenseSlice';

const baseURL = configs.baseURL;

const useFetchExpenses = (url, category, startDate, endDate, expenseUpdated) => {
  const user = useSelector((state) => state.auth.user);
  const categories = useSelector((state) => state.cat.categories);
  const dispatch = useDispatch();
  
  let configs = {
    baseURL: baseURL,
    url: url,
    method: 'get',
    headers: {'authorization': user.token},
    params: {cat: category, sd: startDate, ed: endDate}
  }

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const callAPI = async () => {
      try {
        if (category && startDate && endDate) {
            const response = await axios(configs);
            let expenses = [];

            if (response && response.data && response.data.expenses && categories && categories.length) {
                expenses = response.data.expenses.map((row) => 
                {
                    return {
                        ...row,
                        date: moment(row.date).format('YYYY-MM-DD'),
                        cat: categories.find((cat) => cat._id === row.catagory)
                    }
                })
            }

            setData(expenses);
            dispatch(fill(expenses));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    callAPI();
  }, [url, category, startDate, endDate, categories, expenseUpdated]);


  return { data, loading, error };
};

export default useFetchExpenses;