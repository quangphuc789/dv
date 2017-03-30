// Export module
module.exports = function(results) {
    if (results.length > 0) {
        if (results[0].value !== null) {
            return results[0].value;
        } else {
            return 'value is null';
        }
    } else {
        return 'no result';
    }
}