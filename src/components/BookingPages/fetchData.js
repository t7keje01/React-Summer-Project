
export const fetchData = async (game, selectedDate, index) => {
    const response = await fetch("https://api.jsonbin.io/v3/b/64fde979e4033326cbd51569");
    const json = await response.json();

    if (index === 1) {
        const filteredData = json.record
            .filter(item => item.game === game && item.targetDate !== null)
            .map(item => new Date(item.targetDate));
        return filteredData;
    } 
    else if (index === 2) {    
        const filteredTimes = json.record
            .filter(item => new Date(item.targetDate).toLocaleDateString() === new Date(selectedDate).toLocaleDateString() && item.game === game)
            .map(item => ({ time: item.time, duration: item.duration }));
    
        return filteredTimes;
    };
};