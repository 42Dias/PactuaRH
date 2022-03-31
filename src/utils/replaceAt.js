export default String.prototype.replaceAt = function(index, replacement) {
      if (index >= this.length) {
          return this.valueOf();
      }
   
      var chars = this.split('');
      chars[index] = replacement;
      return chars.join('');
  }

    