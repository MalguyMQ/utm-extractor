export class Utm {

  constructor(url) {
    this.url = url;
  }

  get() {
    if(this.url.length === 0) {
      throw {
        name: "Error",
        message: "Please, insert a valid url"
      }
    }

    if(!this.url.includes('?')) {
      return this.extractParamsFromQueryString();
    }

    if(this.url.includes('?')) {
      this.url = this.url.replace('?', '&');
      return this.get();
    }

    if(this.url.charAt(0) === '?' || this.url.indexOf('?') > 0) {
      this.removeValueBeforeParameters();
      return this.get();
    }
  }


  extractParamsFromQueryString() {

    let queryObject = Object.create({});
    const arrayOfParameters = this.url.split('&');

    arrayOfParameters.forEach((e) => {
      if(e.includes('=')) {
        const pair = [...e.split('=')];
        if (pair[0].length > 0 && pair[1].length > 0) {
          queryObject[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || undefined)
        }
      }
    });

    return Utm.removeOthersParametersThanUtm(queryObject);
  }

  removeValueBeforeParameters() {
    return this.url = this.url.substr(this.url.indexOf('?')).replace('?', '&');
  }

  static removeOthersParametersThanUtm(object) {

    const utmObject = {
      utm_source : "",
      utm_medium: "",
      utm_campaign: "",
      utm_term: "",
      utm_content: ""
    };

    return Utm.compareObjectAndRemovePropertyNotInFirstObject(utmObject, object);
  }

  static compareObjectAndRemovePropertyNotInFirstObject(utmObject, object) {
    for (let prop in object) {
      if (!utmObject.hasOwnProperty(prop)) {
        delete object[prop];
      }
    }
    return object;
  }
}
