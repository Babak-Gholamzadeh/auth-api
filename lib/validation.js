// Validation field
// Any other validators can be added to this object
// @return a validation object that its methods can be used to chain validators
module.exports = field => ({
  // If field is null or empty, throw an error
  isEmpty(errMsg) {
    if(!field) {
      throw new Error(errMsg);
    }
    // Return this object to have a chain validation
    return this;
  },
  // If field length is less than the value, throw an error
  lenLessThan(value, errMsg) {
    if(field.length < value) {
      throw new Error(errMsg);
    }
    // Return this object to have a chain validation
    return this;
  }
});
