import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { Pie2D, Column2D, Bar2D, Doughnut2D } from './Charts';
const Repos = () => {
  const { repos } = React.useContext(GithubContext);
  const languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    if (!language) return total;
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: 1 };
    } else {
      total[language] = { ...total[language], value: total[language].value + 1, stars: total[language].stars + stargazers_count };
    }

    return total;
  }, {});
  //console.log(languages, Object.values(languages));
  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);
  //console.log(mostUsed);

  //Most stars per language
  const mostPopular = Object.values(mostUsed)
    .sort((a, b) => {
      return b.stars - a.stars;
    })
    .slice(0, 5)
    .map((item) => {
      return { ...item, value: item.stars };
    });

  //stars, forks
  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item;
      total.stars[name] = { label: name, value: stargazers_count };
      total.forks[name] = { label: name, value: forks };
      return total;
    },
    { stars: {}, forks: {} }
  );

  stars = Object.values(stars)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  forks = Object.values(forks)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie2D data={mostUsed} />
        <Column2D data={stars} />
        <Doughnut2D data={mostPopular} />
        <Bar2D data={forks} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
