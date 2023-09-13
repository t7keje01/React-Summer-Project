import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';

const neonBilliards = require("../../images/neon_billiards.png");
const neonArcade = require("../../images/neon_arcade.png");
const neonPinball = require("../../images//neon_pinball.png");
const neonSlots = require("../../images/neon_slots.png");

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const neonImages = [neonPinball, neonPinball, neonPinball, neonArcade, neonArcade, neonSlots, neonBilliards];
  const url = 'https://api.jsonbin.io/v3/b/64fbc4768d92e126ae692960';

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setLeaderboardData(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    if (leaderboardData && leaderboardData.record) {
        setDataLoaded(true);
    }
  }, [leaderboardData]);

  return (
    <article className='homeGrid' id="leaderboardSection">
      <h2>Leaderboard</h2>
      <p>Embark on a journey to greatness and claim your spot among the legends! At The Game Garden, we celebrate excellence with our prestigious leaderboards. Will you rise to the occasion and etch your name in history?</p>
      <p>Glory awaits those who dare to conquer challenges, whether through tournaments, Grand Prix events, or simply by achieving top scores during gameplay. With every triumph, you inch closer to securing a coveted position on our illustrious leaderboards.</p>
      <p>Be the best, compete with the best, and revel in the rewards that await the ultimate victors. Join us in the pursuit of gaming greatness and let your legacy begin!</p>
      {dataLoaded && (
        <Carousel slide={false} className='leaderboard'>
            {Object.entries(leaderboardData.record).map(([title, titleData], index) => (
            <Carousel.Item key={"c" + index} id="carouselItem">
                <section 
                    id="carouselSection"
                    key={"s" + index}
                    style={{ backgroundImage: `url(${neonImages[index]})`}}
                    alt={`Slide ${index + 1}`}>
                    <div key={"lb" + index} id="leaderboardBlock">
                        <h3 key={"h" + index} id='carouselTitle'>{title}</h3>
                        <div key={"rank" + index} id='rank'>Rank</div>
                        <div key={"name" + index} id='name'>Name</div>
                        <div key={"score" + index} id='score'>Score</div>
                        {titleData.map((entry, entryIndex) => (
                            <React.Fragment key={"entry" + entryIndex}>
                                <div key={"r" + entryIndex} id={'carouselRank'+ entryIndex}>{entry.rank}</div>
                                <div key={"n" + entryIndex} id={'carouselName'+ entryIndex}>{entry.name}</div>
                                <div key={"s" + entryIndex} id={'carouselScore'+ entryIndex}>{entry.score}</div>
                            </React.Fragment>
                        ))}
                    </div>
                </section>
            </Carousel.Item>
            ))}
        </Carousel>
        )}
    </article>
  );
};

export default Leaderboard;
