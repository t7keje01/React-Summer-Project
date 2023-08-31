import { FaBicycle } from 'react-icons/fa';

const Specials = () => {
    const specialsFoods = [
        {
          id: "sf1",
          title: "Greek Salad",
          price: "$12.99",
          description:
            "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
          getImageSrc: () => require("../../images/greek salad.jpg"),
        },
        {
          id: "sf2",
          title: "Bruchetta",
          price: "$5.99",
          description:
            "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
          getImageSrc: () => require("../../images/bruchetta.JPG"),
        },
        {
          id: "sf3",
          title: "Lemon Dessert",
          price: "$5.00",
          description:
            "This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
          getImageSrc: () => require("../../images/lemon dessert.jpg"),
        },
    ]

    return (
        <article className='homeGrid'>
            <div className='specialTitle'>
                <h2>This Weeks Specials!</h2>
            </div>
            <div className='specialButton'>
                <button id="blackButton" aria-label="To online menu.">Online Menu</button>
            </div>
            <div className='specialCard'>
            {specialsFoods.map((sp) => (
                <section key={sp.id} aria-label="Available speciality food">
                    <img src={sp.getImageSrc()} alt=''/>
                    <div>
                        <h3>{sp.title}</h3>
                        <p>{sp.price}</p>
                    </div>
                    <p>{sp.description}</p>
                    <h4>Order a Delivery <FaBicycle/></h4>
                </section>
            ))}
            </div>
        </article>
    );
}

export default Specials;