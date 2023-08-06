import "../components/styles.css";
import "../components/layout.css";

const Chigaco = () => {
    return (
        <article className="grid" id="introSection">
            <div className="intro_content">
            <div className="intro_background"></div>
            <div className="intro">
                <h1>Little Lemon</h1>
                <h2>Chigaco</h2>
                <p>Little Lemon is owned by two Italian brothers, Mario and Adrian, who moved to the United States to pursue their shared dream of owning a restaurant. 
                    To craft the menu, Mario relies on family recipes and his experience as a chef in Italy. Adrian does all the marketing for the restaurant 
                    and led the effort to expand the menu beyond classic Italian to incorporate additional cuisines from the Mediterranean region.
                </p>
                </div>
            </div>
        </article>
    );
};

export default Chigaco;