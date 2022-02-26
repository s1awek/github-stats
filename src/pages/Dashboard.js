/** @format */

import React from 'react';
import { Info, Repos, User, Search, Navbar, DefaultMessage } from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';
const Dashboard = () => {
  const { loading, githubUser } = React.useContext(GithubContext);
  if (loading) {
    return (
      <main>
        <Navbar />
        <Search />
        <img src={loadingImage} alt='loading' className='loading-img' />
      </main>
    );
  } else if (!Object.keys(githubUser).length) {
    return (
      <main>
        <Navbar />
        <Search />
        <DefaultMessage />
      </main>
    );
  } else {
    return (
      <main>
        <Navbar />
        <Search />
        <Info />
        <User />
        <Repos />
      </main>
    );
  }
};

export default Dashboard;
