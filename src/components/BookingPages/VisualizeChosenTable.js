import { useEffect } from "react";
import kitchenImage from "../../images/booking_system/Kitchen.JPG";
import showImage8Hor from "../../images/booking_system/available, 8, tb1.JPG";
import showImage8Ver from "../../images/booking_system/available, 8, tb2.jpg";
import showImage6 from "../../images/booking_system/available, 6, tb4, tb5 & tb6.JPG";
import showImage4 from "../../images/booking_system/available, 4, tb3, tb7, tb8 & tb9.JPG";
import Image8Hor from "../../images/booking_system/unavailable, 8, tb1.JPG";
import Image8Ver from "../../images/booking_system/unavailable, 8, tb2.jpg";
import Image6 from "../../images/booking_system/unavailable, 6, tb4, tb5 & tb6.JPG";
import Image4 from "../../images/booking_system/unavailable, 4, tb3, tb7, tb8 & tb9.JPG";

const tableSet = [
    {
        id: "tbs_1",
        class_name: "tb1",
        table: "Table 1",
        image: Image8Hor,
        showImage: showImage8Hor
    },
    {
        id: "tbs_2",
        class_name: "tb2",
        table: "Table 2",
        image: Image8Ver,
        showImage: showImage8Ver
    },
    {
        id: "tbs_3",
        class_name: "tb3",
        table: "Table 3",
        image: Image4,
        showImage: showImage4
    },
    {
        id: "tbs_4",
        class_name: "tb4",
        table: "Table 4",
        image: Image6,
        showImage: showImage6
    },
    {
        id: "tbs_5",
        class_name: "tb5",
        table: "Table 5",
        image: Image6,
        showImage: showImage6
    },
    {
        id: "tbs_6",
        class_name: "tb6",
        table: "Table 6",
        image: Image6,
        showImage: showImage6
    },
    {
        id: "tbs_7",
        class_name: "tb7",
        table: "Table 7",
        image: Image4,
        showImage: showImage4
    },
    {
        id: "tbs_8",
        class_name: "tb8",
        table: "Table 8",
        image: Image4,
        showImage: showImage4
    },
    {
        id: "tbs_9",
        class_name: "tb9",
        table: "Table 9",
        image: Image4,
        showImage: showImage4
    }
]

const VisualizeChosenTable = ({ chosenTable }) => {

    return (
        <div id="table_reservation_image" aria-label="Image of the reserved table in the restaurant layout">
            <div className="dsc">
                <div id="greenBox"></div>
                <div>Chosen table</div>
            </div>
            <img src={kitchenImage} alt="Kitchen" className="kitchen"></img>
            {tableSet.map((tble) => (
                <img
                    id={chosenTable === tble.table ? "c_tb" : tble.id}
                    src={chosenTable === tble.table ? tble.showImage : tble.image}
                    alt={""}
                    className={tble.class_name}
                    key={tble.id}
                />
            ))}
        </div>
    );
};

export default VisualizeChosenTable;