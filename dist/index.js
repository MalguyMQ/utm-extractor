'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utm = exports.Utm = function () {
  _createClass(Utm, null, [{
    key: 'removeValueBeforeParameters',
    value: function removeValueBeforeParameters() {
      return this.url = this.url.substr(this.url.indexOf('?')).replace('?', '&');
    }
  }, {
    key: 'removeOthersParametersThanUtm',
    value: function removeOthersParametersThanUtm(object) {

      var utmObject = {
        utm_source: "",
        utm_medium: "",
        utm_campaign: "",
        utm_term: "",
        utm_content: ""
      };

      return Utm.compareObjectAndRemovePropertyNotInFirstObject(utmObject, object);
    }
  }, {
    key: 'compareObjectAndRemovePropertyNotInFirstObject',
    value: function compareObjectAndRemovePropertyNotInFirstObject(utmObject, object) {
      for (var prop in object) {
        if (!utmObject.hasOwnProperty(prop)) {
          delete object[prop];
        }
      }
      return object;
    }
  }]);

  function Utm(url) {
    _classCallCheck(this, Utm);

    this.url = url;
  }

  _createClass(Utm, [{
    key: 'extractParamsFromQueryString',
    value: function extractParamsFromQueryString() {

      var queryObject = Object.create({});
      var arrayOfParameters = this.url.split('&');

      arrayOfParameters.forEach(function (e) {
        if (e.includes('=')) {
          var pair = [].concat(_toConsumableArray(e.split('=')));
          if (pair[0].length > 0 && pair[1].length > 0) {
            queryObject[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || undefined);
          }
        }
      });

      return Utm.removeOthersParametersThanUtm(queryObject);
    }
  }, {
    key: 'get',
    value: function get() {
      if (this.url.length === 0) {
        throw {
          name: "Error",
          message: "Please, insert a valid url"
        };
      }

      if (!this.url.includes('?')) {
        return this.extractParamsFromQueryString();
      }

      if (this.url.includes('?')) {
        this.url = this.url.replace('?', '&');
        return this.get();
      }

      if (this.url.charAt(0) === '?' || this.url.indexOf('?') > 0) {
        Utm.removeValueBeforeParameters();
        return this.get();
      }
    }
  }]);

  return Utm;
}();