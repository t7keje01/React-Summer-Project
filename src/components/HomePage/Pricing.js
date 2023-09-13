import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Pricing = () => {

    return (
        <article className="homeGrid" id="pricingSection">
            <h2>Pricing Details</h2>
            <div>
                <div>
                    <h3>Pricing Information</h3>
                    <ul>
                        <li>All our machines operate exclusively on game currency, known as "credits."</li>
                        <li>The credits will be deposited on an unique, reusable card.</li>
                        <li>The minimum amount of credits that can be purchased is 5 euros, which gives you 50 credits due to our generous 10x exchange rate.</li>
                        <li>For every 20 euros used, an extra 30 credits are awarded, providing even more gaming value.</li>
                    </ul>
                </div>
                <div>
                    <h3>Spending Your Credits</h3>
                    <ul>
                        <li>Please note that credits cannot be exchanged back for real currency.</li>
                        <li>However, they can be used to acquire goods from our vending machines.</li>
                        <li>Better yet, we offer an extensive selection of special game prizes that can be purchased with your hard-earned credits.</li>
                        <li>If you have leftover credit, it is possible to store it until your next visit.</li>
                        <li>Stored credit will expire after 6 months.</li>
                    </ul>
                </div>
                <div>
                    <h3>Limited Top Prizes</h3>
                    <ul>
                        <li>Be aware that there is a finite supply of top prizes available.</li>
                        <li>To claim one, you'll need a combination of luck and dedication as an avid player.</li>
                    </ul>
                </div>
            </div>
            <p className='moreInfoText'>For further information on prices, check the below!</p>
            <div id='neonSign' className='pricingDetails'>
                <Tabs
                    defaultActiveKey="profile"
                    id="justify-tab-example"
                    className="mb-3"
                    justify 
                    variant='underline'>
                    <Tab eventKey="table" title="Table Games">
                        <p>25 credits per 30 mins.</p>
                        <p>After an hour, the consecutive 30 mins will be 20 credits.</p>
                    </Tab>
                    <Tab eventKey="arcade" title="Arcade Games">
                        <p>Pinballs: 15 credits per game.</p>
                        <p>Racing Games: 20 credits per game.</p>
                        <p>Skeeball: 25 credits per game.</p>
                        <p>Other Games: 20 credits per game.</p>
                    </Tab>
                    <Tab eventKey="slots" title="Slot Machines">
                        <p>The minimum bet is 10 credits and the maximum is 1000 credits.</p>
                        <p>If the credit amount drops below the minimum, the credit will be gambled until the amount is lost or exceeds the minimum.</p>
                    </Tab>
                    <Tab eventKey="board" title="Board Games">
                        <p>20 credits per 30 mins.</p>
                        <p>After an hour, the consecutive 30 mins will be 15 credits.</p>
                    </Tab>
                    <Tab eventKey="vendor" title="Vending Machines">
                        <p>We have multiple vending machines varying from drinks, treats and snacks.</p>
                        <p>You are able to use them with real currency and credits.</p>
                        <p>Prices vary between different products, but on average the credit price is 2x of the real currency one.</p>
                    </Tab>
                    <Tab eventKey="special" title="Special Events">
                        <p>We offer the opportunity to rent our space for larger groups!</p>
                        <p>We welcome all kinds of events, whether it'll be a company event or a birthday party.</p>
                        <p>We have a deal with several restaurants nearby and thus can offer affordable catering if needed.</p>
                        <p>Our prices are flexible and largely depend on the circumstances of the reservation such as the needed date, amount of people etc.</p>
                        <p>For more information, please contact us!</p>
                    </Tab>
                </Tabs>
            </div>
        </article>
    );
};

export default Pricing;