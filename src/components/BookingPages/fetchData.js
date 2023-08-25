
export const fetchData = async (date, guests) => {
    const today = '2023-08-25';
    const response =  await fetch("https://api.jsonbin.io/v3/b/64e2990e9d312622a39436ad");
    const json = await response.json();

    if ( date === today ) {
        const filteredTimes = json.record.filter(item => 
            new Date(item.checkDate).toLocaleDateString() === new Date(date).toLocaleDateString() && item.maxGuests >= guests);
        return filteredTimes;
    }
    else {
        const filteredTimes = json.record.filter(item => 
            new Date(item.targetDate).toLocaleDateString() === new Date(date).toLocaleDateString() && item.maxGuests >= guests);
        return filteredTimes;
    }
};