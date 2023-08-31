import { useState, useEffect } from "react";
import kitchenImage from "../../images/booking_system/Kitchen.JPG";
import available8HorImage from "../../images/booking_system/available, 8, tb1.JPG";
import available8VerImage from "../../images/booking_system/available, 8, tb2.jpg";
import available6Image from "../../images/booking_system/available, 6, tb4, tb5 & tb6.JPG";
import available4Image from "../../images/booking_system/available, 4, tb3, tb7, tb8 & tb9.JPG";
import unavailable8HorImage from "../../images/booking_system/unavailable, 8, tb1.JPG";
import unavailable8VerImage from "../../images/booking_system/unavailable, 8, tb2.jpg";
import unavailable6Image from "../../images/booking_system/unavailable, 6, tb4, tb5 & tb6.JPG";
import unavailable4Image from "../../images/booking_system/unavailable, 4, tb3, tb7, tb8 & tb9.JPG";


const tableSet1 = [
    {
        id: "tb_1",
        potClassName: "tb1",
        table: "Table 1",
        image: available8HorImage,
        size: 8,
        available: true,
    },
    {
        id: "tb_2",
        potClassName: "tb2",
        table: "Table 2",
        image: unavailable8VerImage,
        size: 8,
        available: false,
    },
    {
        id: "tb_3",
        potClassName: "tb3",
        table: "Table 3",
        image: unavailable4Image,
        size: 4,
        available: false,
    },
    {
        id: "tb_4",
        potClassName: "tb4",
        table: "Table 4",
        image: available6Image,
        size: 6,
        available: true,
    },
    {
        id: "tb_5",
        potClassName: "tb5",
        table: "Table 5",
        image: unavailable6Image,
        size: 6,
        available: false,
    },
    {
        id: "tb_6",
        potClassName: "tb6",
        table: "Table 6",
        image: unavailable6Image,
        size: 6,
        available: false,
    },
    {
        id: "tb_7",
        potClassName: "tb7",
        table: "Table 7",
        image: unavailable4Image,
        size:4,
        available: false,
    },
    {
        id: "tb_8",
        potClassName: "tb8",
        table: "Table 8",
        image: unavailable4Image,
        size: 4,
        available: false,
    },
    {
        id: "tb_9",
        potClassName: "tb9",
        table: "Table 9",
        image: available4Image,
        size: 4,
        available: true,
    }
]

const tableSet2 = [
    {
        id: "tb_1",
        potClassName: "tb1",
        table: "Table 1",
        image: unavailable8HorImage,
        size: 8,
        available: false,
    },
    {
        id: "tb_2",
        potClassName: "tb2",
        table: "Table 2",
        image: available8VerImage,
        size: 8,
        available: true,
    },
    {
        id: "tb_3",
        potClassName: "tb3",
        table: "Table 3",
        image: unavailable4Image,
        size: 4,
        available: false,
    },
    {
        id: "tb_4",
        potClassName: "tb4",
        table: "Table 4",
        image: unavailable6Image,
        size: 6,
        available: false,
    },
    {
        id: "tb_5",
        potClassName: "tb5",
        table: "Table 5",
        image: unavailable6Image,
        size: 6,
        available: false,
    },
    {
        id: "tb_6",
        potClassName: "tb6",
        table: "Table 6",
        image: unavailable6Image,
        size: 6,
        available: false,
    },
    {
        id: "tb_7",
        potClassName: "tb7",
        table: "Table 7",
        image: available4Image,
        size: 4,
        available: true,
    },
    {
        id: "tb_8",
        potClassName: "tb8",
        table: "Table 8",
        image: available4Image,
        size: 4,
        available: true,
    },
    {
        id: "tb_9",
        potClassName: "tb9",
        table: "Table 9",
        image: available4Image,
        size: 4,
        available: true,
    }
]

const tableSet3 = [
    {
        id: "tb_1",
        potClassName: "tb1",
        table: "Table 1",
        image: available8HorImage,
        size:8,
        available: true,
    },
    {
        id: "tb_2",
        potClassName: "tb2",
        table: "Table 2",
        image: available8VerImage,
        size: 8,
        available: true,
    },
    {
        id: "tb_3",
        potClassName: "tb3",
        table: "Table 3",
        image: unavailable4Image,
        size:4,
        available: false,
    },
    {
        id: "tb_4",
        potClassName: "tb4",
        table: "Table 4",
        image: available6Image,
        size: 6,
        available: true,
    },
    {
        id: "tb_5",
        potClassName: "tb5",
        table: "Table 5",
        image: unavailable6Image,
        size: 6,
        available: false,
    },
    {
        id: "tb_6",
        potClassName: "tb6",
        table: "Table 6",
        image: available6Image,
        size: 6,
        available: true,
    },
    {
        id: "tb_7",
        potClassName: "tb7",
        table: "Table 7",
        image: available4Image,
        size: 4,
        available: true,
    },
    {
        id: "tb_8",
        potClassName: "tb8",
        table: "Table 8",
        image: available4Image,
        size: 4,
        available: true,
    },
    {
        id: "tb_9",
        potClassName: "tb9",
        table: "Table 9",
        image: available4Image,
        size: 4,
        available: true,
    }
]

const TableSystem = ({ tableSetIndex, onTableSelect, selectedGuests }) => {
    const tableSets = [tableSet1, tableSet2, tableSet3];
    const selectedTableSet = tableSets[tableSetIndex - 1];

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedTable, setSelectedTable] = useState(null);

    const handleImageClick = (imageId, chosenTable) => {
        setSelectedImage(imageId);
        setSelectedTable(chosenTable);
        onTableSelect(chosenTable);
    };

    const resetSelectedTable = () => {
        setSelectedTable(null);
        setSelectedImage(null);
    };

    useEffect(() => {
        resetSelectedTable();
    }, [tableSetIndex]);

    return (
        <div id="tableReservationImg" aria-label="Image of available tables">
            <div className="dsc">
                <div id="greenBox"></div>
                <div>Available</div>
                <div id="redBox"></div>
                <div>Reserved</div>
            </div>
            <img src={kitchenImage} alt="Kitchen" className="kitchen"></img>
            {selectedTableSet.map((tble, index) => (
                <img
                    id={tble.id}
                    src={tble.image}
                    alt={""}
                    className={`image 
                        ${selectedImage === index ? "selected" : ""} 
                        ${tble.potClassName} 
                        ${tble.size < selectedGuests ? "disabled" : ""}`}
                        key={tble.id}
                        onClick={tble.size < selectedGuests || !tble.available ? undefined : () => handleImageClick(index, tble.table)}
                />
            ))}
        </div>
    );
};

export default TableSystem;