import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { useState } from 'react';

const Tournaments = () => {

    const [activated, setActivated] = useState(false);

    const tournamentData = [
        {
          id: "td1",
          title: "Weekly Slot Tournament",
          "date": "Saturday, 16.09.2023",
          "requirements": "No real currency needed",
          "how to win": "The one who earns the most currency within 30 mins",
          "rules": "Competitors choose from three different game options. The slot machine used will be decided with a lottery for each competitor",
          "reward": "1st Place: 50 euro restaurant gift card, 2nd Place: 20 euro game gift card to Steam. 3rd Place: Free monthly pass to The Game Garden",
          "registeration": "Open for registrations in Wed 13.09.2023",
          getImageSrc: () => require("../../images/neonsign_slotmachine.JPG"),
        },
        {
          id: "td2",
          title: "Mario Kart Grand Prix 5",
          "date": "Sunday, 17.09.2023",
          "requirements": "You've registered to the Grand Prix",
          "how to win": "The higher your position, the more points earned",
          "rules": "Competitors will drive in the order of the current total score, so the last one drives first. Everyone gets two tries: a warmup and the actual drive",
          "reward": "Grand Prix points. Also 1st Place: Three drink coupons to our drink vending machine",
          "registeration": "Registration closed",
          getImageSrc: () => require("../../images/neonsign_mario.JPG"),
        },
        {
          id: "td3",
          title: "Skeeball Team Tournament",
          "date": "TBA",
          "requirements": "Team must consist of three members",
          "how to win": "The team with highest total score",
          "rules": "Each team gets 9 balls in total, 3 per team member. Playing order within the team is up to the team, but the team order will be drawn.",
          "reward": "TBA",
          "registeration": "TBA",
          getImageSrc: () => require("../../images/neonsign_arcade.JPG"),
        },
    ]

    const titles = ["Date", "Requirements", "How to Win", "Rules", "Reward", "Registeration"];

    const toggleCardEnter = () => {
        setActivated(true);
    }

    const toggleCardLeave = () => {
        setActivated(false);
    }
  
    return (
        <article className='homeGrid' id="tournamentSection">
            <h2>Tournaments</h2>
            <section className="tournaments">
                <div id="tournamentInfobox">
                    <h3 id="blinkingText">"Embrace the Quest for Glory!"</h3>
                    <p>At The Game Garden, we believe in celebrating greatness. Our tournaments are the battlegrounds where legends are forged. From epic showdowns to strategic faceoffs, we offer a diverse array of tournaments, each with its unique flavor and challenges. No matter your game, there's a tournament that awaits your conquest.</p>
                </div>
                <div>
                    <h3 id="blinkingText">Glory Awaits Every Victor</h3>
                    <p>Every tournament champion at The Game Garden ascends to the hall of fame with a coveted prize. It's not just about the glory, it's about the rewards that come with it. Are you ready to seize your moment in the spotlight?</p>
                </div>
                <div>
                    <h3 id="blinkingText">Stay Tuned for Upcoming Tournaments</h3>
                    <p>Keep an eye on our upcoming tournaments below, and make sure to bookmark this page. With new tournaments in the pipeline, there's always an opportunity to prove your mettle and stake your claim as the ultimate champion. Also all participants will be awarded with free game currency!</p>
                </div>
            </section>
            <section className='tournamentCards'>
            {tournamentData.map((data, index) => (
                <Card key={data.id} id="neonSign" className='cardEffect' onMouseLeave={() => toggleCardLeave(index)} onMouseEnter={() => toggleCardEnter(index)}>
                    <Card.Img variant="top" src={data.getImageSrc()} alt="Game type"/>
                    {activated ? (
                    <Card.Body>
                        <Card.Title>{data.title}</Card.Title>
                        <Accordion defaultActiveKey="0">
                            {titles.map((title, index) => (
                            <Accordion.Item eventKey={index.toString()} key={index} id="accordionItem">
                                <Accordion.Header>{title}</Accordion.Header>
                                <Accordion.Body id="tournamentInfoText">
                                    {data[title.toLowerCase()]}
                                </Accordion.Body>
                            </Accordion.Item>
                            ))}
                        </Accordion>
                    </Card.Body>) : (
                    <></>
                    )}
                </Card>
            ))}
            </section>
        </article>
    );
}
  
export default Tournaments;