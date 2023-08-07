import { FaStarHalfAlt, FaStar, FaRegStar } from 'react-icons/fa';

const CustomersSay = () => {
    const reviews = [
        {
            id:"rv1",
            grid: "rvw_card1",
            rating: [FaStar, FaStar, FaStar, FaStar, FaStar],
            userName: "Jessica, 27",
            review: "I absolutely love this place! The food is fantastic!",
            getImageSrc: () => require("../images/Jessica.JPG"),
        },
        {
            id:"rv2",
            grid: "rvw_card2",
            rating: [FaStar, FaStar, FaStar, FaStar, FaStarHalfAlt],
            userName: "Chris, 38",
            review: "My number 1 restaurant. I suggest trying the Lemon Dessert!",
            getImageSrc: () => require("../images/Chris.JPG"),
        },
        {
            id:"rv3",
            grid: "rvw_card3",
            rating: [FaStar, FaStar, FaStar, FaStar, FaRegStar],
            userName: "Sarah, 19",
            review: "A very cozy restaurant with excellent food.",
            getImageSrc: () => require("../images/Sarah.JPG"),
        },
        {
            id:"rv4",
            grid: "rvw_card4",
            rating: [FaStar, FaStar, FaStar, FaStarHalfAlt, FaRegStar],
            userName: "Michael, 55",
            review: "The food was good, but I wish I could have booked a table beforehand.",
            getImageSrc: () => require("../images/Michael.JPG"),
        },
    ]

    return (
        <article id="testimonials" className='homeGrid'>
            <div className='rvw_title'>
                <h2>Testimonials</h2>
            </div>
            {reviews.map((rvw) => (
                <section className={rvw.grid} key={rvw.id}>
                    <>{rvw.rating.map((StarIcon, starIndex) => ( <StarIcon key={starIndex} />))}</>
                    <div>
                        <img src={rvw.getImageSrc()} alt=''/>
                        <h4>{rvw.userName}</h4>
                    </div>
                    <p>{rvw.review}</p>
                </section>
            ))}
        </article>
    );
}

export default CustomersSay;