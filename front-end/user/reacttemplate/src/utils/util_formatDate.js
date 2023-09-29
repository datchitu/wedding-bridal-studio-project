export default function formatDate(str) {
    var date = new Date(str); 
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth()+1)).slice(-2);
    var dateVal = ('0' + (date.getDate())).slice(-2);
    // var formattedDate = dateVal + '/' + month + '/' + year;
    var formattedDate = year + '-' + month + '-' + dateVal;
    return formattedDate;
}