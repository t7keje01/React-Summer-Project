
const Activities = () => {

    return (
        <article id="activitySection" className='homeGrid'>
            <h2>Available Activities</h2>
            <p>Explore a diverse array of games and activities at The Game Garden! Alongside the few shown below, we offer a wide selection of engaging options.</p>
            <p>For any specific inquiries about our activities, feel free to get in touch with us via social media, email, or phone. Of course, the best way to experience the excitement is by joining us at The Game Garden itself.</p>
            <section className='galleryWrapper'>
                <div className='activity activityOption1'>
                    <h2 className='activityLabel'>Billiards</h2>
                </div>
                <div className='activity activityOption2'>
                    <h2 className='activityLabel'>Slots</h2>
                </div>
                <div className='activity activityOption3'>
                    <h2 className='activityLabel'>Air Hockey</h2>
                </div>
                <div className='activity activityOption4'>
                    <h2 className='activityLabel'>Pinball</h2>
                </div>
                <div className='activity activityOption5'>
                    <h2 className='activityLabel'>Skeeball</h2>
                </div>
                <div className='activity activityOption6'>
                    <h2 className='activityLabel'>Arcade</h2>
                </div>
            </section>
        </article>
    );
}

export default Activities;