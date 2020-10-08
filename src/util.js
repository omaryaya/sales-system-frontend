export const formatDate = date => {
    //  "numeric", "2-digit", "narrow", "short", "long"
    var options = {
        weekday: 'short',
        year: '2-digit',
        month: 'short',
        day: 'numeric'
    };
    return new Date(date).toLocaleDateString('en-US', options);
}