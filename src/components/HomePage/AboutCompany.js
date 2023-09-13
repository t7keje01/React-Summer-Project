
const AboutCompany = () => {

  const timeTable = [
    {
      id: "tt1",
      day: "MON",
      open: "12.00am",
      close: "12.00pm"
    },
    {
      id: "tt2",
      day: "TUE",
      open: "12.00am",
      close: "12.00pm"
    },
    {
      id: "tt3",
      day: "WED",
      open: "12.00am",
      close: "02.00am"
    },
    {
      id: "tt4",
      day: "THU",
      open: "12.00am",
      close: "12.00pm"
    },
    {
      id: "tt5",
      day: "FRI",
      open: "12.00am",
      close: "02.00am"
    },
    {
      id: "tt6",
      day: "SAT",
      open: "10.00am",
      close: "02.00am"
    },
    {
      id: "tt7",
      day: "SUN",
      open: "10.00am",
      close: "12.00pm"
    }
  ]

    return (
        <article className='homeGrid' id="aboutSection">
          <section className="aboutUs">
            <h2>About Us</h2>
            <div>
              <p>Welcome to The Game Garden, Oulu's newest gaming oasis! Opened in 2022, we're here to cultivate an atmosphere of pure enjoyment and entertainment for all ages.</p>
              <p>Step into a realm where retro charm meets cyber-futurism, a place where neon lights dance amidst lush virtual greenery. At The Game Garden, we've curated a selection of classic games, from billiards to pinball, ensuring there's something to delight every player.</p>
              <p>But we're more than just a game center. We're a community, and we're here to host tournaments that will challenge your skills and forge new connections.</p>
              <p>So, why not gather your friends and family, and join us in The Game Garden? Let's grow some unforgettable memories together!</p>
            </div>
          </section>
          <section className="openingHours">
            <div className="openingTimeTable" id="neonSign">
              <h2>Opening Hours</h2>
              {timeTable.map((ohrs, index) => 
              <div key={ohrs.id}>
                <div>{ohrs.day}</div>
                <div id={"time" + index}>{ohrs.open} - {ohrs.close}</div>
              </div>
              )}
              <div className="pacman"></div>
            </div>
          </section>
        </article>
    );
}

export default AboutCompany;