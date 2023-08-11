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
        class_name: "tb1",
        table: "Table 1",
        image: available8HorImage,
        available: true,
    },
    {
        id: "tb_2",
        class_name: "tb2",
        table: "Table 2",
        image: unavailable8VerImage,
        available: false,
    },
    {
        id: "tb_3",
        class_name: "tb3",
        table: "Table 3",
        image: unavailable4Image,
        available: false,
    },
    {
        id: "tb_4",
        class_name: "tb4",
        table: "Table 4",
        image: available6Image,
        available: true,
    },
    {
        id: "tb_5",
        class_name: "tb5",
        table: "Table 5",
        image: unavailable6Image,
        available: false,
    },
    {
        id: "tb_6",
        class_name: "tb6",
        table: "Table 6",
        image: unavailable6Image,
        available: false,
    },
    {
        id: "tb_7",
        class_name: "tb7",
        table: "Table 7",
        image: unavailable4Image,
        available: false,
    },
    {
        id: "tb_8",
        class_name: "tb8",
        table: "Table 8",
        image: unavailable4Image,
        available: false,
    },
    {
        id: "tb_9",
        class_name: "tb9",
        table: "Table 9",
        image: available4Image,
        available: true,
    }
]

const tableSet2 = [
    {
        id: "tb_1",
        class_name: "tb1",
        table: "Table 1",
        image: unavailable8HorImage,
        available: false,
    },
    {
        id: "tb_2",
        class_name: "tb2",
        table: "Table 2",
        image: available8VerImage,
        available: true,
    },
    {
        id: "tb_3",
        class_name: "tb3",
        table: "Table 3",
        image: unavailable4Image,
        available: false,
    },
    {
        id: "tb_4",
        class_name: "tb4",
        table: "Table 4",
        image: unavailable6Image,
        available: false,
    },
    {
        id: "tb_5",
        class_name: "tb5",
        table: "Table 5",
        image: unavailable6Image,
        available: false,
    },
    {
        id: "tb_6",
        class_name: "tb6",
        table: "Table 6",
        image: unavailable6Image,
        available: false,
    },
    {
        id: "tb_7",
        class_name: "tb7",
        table: "Table 7",
        image: available4Image,
        available: true,
    },
    {
        id: "tb_8",
        class_name: "tb8",
        table: "Table 8",
        image: available4Image,
        available: true,
    },
    {
        id: "tb_9",
        class_name: "tb9",
        table: "Table 9",
        image: available4Image,
        available: true,
    }
]

const tableSet3 = [
    {
        id: "tb_1",
        class_name: "tb1",
        table: "Table 1",
        image: available8HorImage,
        available: true,
    },
    {
        id: "tb_2",
        class_name: "tb2",
        table: "Table 2",
        image: available8VerImage,
        available: true,
    },
    {
        id: "tb_3",
        class_name: "tb3",
        table: "Table 3",
        image: unavailable4Image,
        available: false,
    },
    {
        id: "tb_4",
        class_name: "tb4",
        table: "Table 4",
        image: available6Image,
        available: true,
    },
    {
        id: "tb_5",
        class_name: "tb5",
        table: "Table 5",
        image: unavailable6Image,
        available: false,
    },
    {
        id: "tb_6",
        class_name: "tb6",
        table: "Table 6",
        image: available6Image,
        available: true,
    },
    {
        id: "tb_7",
        class_name: "tb7",
        table: "Table 7",
        image: available4Image,
        available: true,
    },
    {
        id: "tb_8",
        class_name: "tb8",
        table: "Table 8",
        image: available4Image,
        available: true,
    },
    {
        id: "tb_9",
        class_name: "tb9",
        table: "Table 9",
        image: available4Image,
        available: true,
    }
]

const TableSystem = ({ tableSetIndex, onTableSelect }) => {
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
        <div className="table_img">
            <div className="dsc">
                <div id="greenBox"></div>
                <div>Available</div>
                <div id="redBox"></div>
                <div>Reserved</div>
            </div>
            <img src={kitchenImage} alt="Kitchen" className="kitchen"></img>
            {selectedTableSet.map((tble, index) => (
                <img
                    src={tble.image}
                    alt={""}
                    className={`image ${selectedImage === index ? "selected" : ""} ${tble.class_name}`}
                    key={tble.id}
                    onClick={tble.available ? () => handleImageClick(index, tble.table) : undefined}
                />
            ))}
        </div>
    );
};

export default TableSystem;