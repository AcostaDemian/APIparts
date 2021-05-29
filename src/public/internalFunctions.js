function formatDate (date) {
    var dateParts = date.split("/");
    console.log(dateParts);
    return new Date(+dateParts[2], dateParts[1] -1, +dateParts[0])
}

function formatStringDate (date) {
    return String(date.getDate()).padStart(2, '0') +'/'+ String((date.getMonth() + 1)).padStart(2, '0')  +'/'+ date.getFullYear()
}

function dayOfWeek (date){
    var dayOfWeek = date.getDay();
    return (dayOfWeek === 6) || (dayOfWeek  === 0) ? false : true ;
}

module.exports = {
    formatDate,
    formatStringDate,
    dayOfWeek
}