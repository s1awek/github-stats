/** @format */

import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();
const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  // requests loading
  const [requests, setRequests] = useState({ limit: 60, remaining: 0 });
  const [reset, setReset] = useState(0);
  const [loading, setLoading] = useState(false);
  // error
  //check rate
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then((data) => {
        const reset = data.data.rate.reset;
        const limit = data.data.rate.limit;
        const remaining = data.data.rate.remaining;
        const now = Math.round(new Date().getTime() / 1000);
        const minutesToReset = Math.ceil((reset - now) / 60);
        setReset(minutesToReset);
        setRequests({ limit, remaining });
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(checkRequests, []);
  return <GithubContext.Provider value={{ githubUser, repos, followers, reset, requests }}>{children}</GithubContext.Provider>;
};

export { GithubProvider, GithubContext };
