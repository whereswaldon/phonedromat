var Phonedromat = (function(document, window) {

  var _chisel = function(newValue) {
    return newValue.split('')
      .filter(function(char) {
        return '0' <= char && '9' >= char;
      }).reduce(function(whole, char, index) {
        switch (index) {
          case 0:
            return whole + '(' + char;
          case 2:
            return whole + char + ')';
          case 3:
            return whole + ' ' + char;
          case 6:
            return whole + '-' + char;
          case 10:
            return whole + ' .ext ' + char;
          default:
            return whole + char;
        }
      }, '');
  }

  var mould = function(id) {
    var target = document.getElementById(id);
    var lastValue = target.value;
    var shape = function() {
      var newValue = this.value;
      //if nothing has changed, do nothing
      if (newValue == lastValue) {
        return;
      }
      //if a character has been removed, do nothing
      else if (lastValue.length - 1 == newValue.length) {
        lastValue = newValue;
        return;
      }
      this.value = _chisel(newValue);
      lastValue = this.value;
    };

    var chop = function() {
      this.value = _chisel(this.value);
      lastValue = this.value;
    }
    target.addEventListener('input', shape, false);
    target.addEventListener('blur', chop, false);
  };

  return {
    mould: mould
  };
})(document, window);

Phonedromat.mould('phone');
