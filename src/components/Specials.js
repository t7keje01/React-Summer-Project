import { FaBicycle } from 'react-icons/fa';

const Specials = () => {
    const specialsFoods = [
        {
          title: "Greek Salad",
          price: "$12.99",
          description:
            "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
          getImageSrc: () => require("../images/greek salad.jpg"),
        },
        {
          title: "Bruchetta",
          price: "$5.99",
          description:
            "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
          getImageSrc: () => require("../images/bruchetta.JPG"),
        },
        {
          title: "Lemon Desert",
          price: "$5.00",
          description:
            "This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
          getImageSrc: () => require("../images/lemon dessert.jpg"),
        },
    ]

    return (
        <article className='grid'>
            <div className='sp_title'>
                <h2>This Weeks Specials!</h2>
            </div>
            <div className='sp_button'>
                <button id="blackButton">Online Menu</button>
            </div>
            <div className='sp_card'>
            {specialsFoods.map((sp) => (
                <section>
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