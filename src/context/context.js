/** @format */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();
const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [followers, setFollowers] = useState([]);
  // requests loading reset
  const [requests, setRequests] = useState({ limit: 60, remaining: 0 });
  const [reset, setReset] = useState(0);
  const [loading, setLoading] = useState(false);
  // error
  const [error, setError] = useState({ show: false, msg: '' });
  const searchGithubUser = async (user) => {
    toggleError();
    setLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) => {
      console.log(err);
    });
    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;
      await Promise.allSettled([axios(`${rootUrl}/users/${login}/repos?per_page=100&sort=stargazers`), axios(`${followers_url}?per_page=100`)])
        .then((response) => {
          const [repos, followers] = response;
          const status = 'fulfilled';
          if (repos.status === status) {
            setRepos(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toggleError(true, 'user does not exist');
    }
    setLoading(false);
  };
  //check rate
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        const {
          rate: { reset, limit, remaining },
        } = data;
        const now = Math.round(new Date().getTime() / 1000);
        const minutesToReset = Math.ceil((reset - now) / 60);
        setReset(minutesToReset);
        setRequests({ limit, remaining });
        if (remaining === 0) {
          toggleError(true, `sorry, you have exceeded your hourly rate limit! It is based on your IP address.`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function toggleError(show = false, msg = '') {
    setError({ show, msg });
  }
  useEffect(checkRequests, [githubUser, error]);
  return <GithubContext.Provider value={{ githubUser, repos, followers, reset, requests, error, loading, searchGithubUser }}>{children}</GithubContext.Provider>;
};

export { GithubProvider, GithubContext };
