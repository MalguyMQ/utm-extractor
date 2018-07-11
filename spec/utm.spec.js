import {Utm} from '../src';

describe("Extract UTM tracking module information", () => {

  it("should grab any utm parameters dedicated to Marketing room", () => {
    const utmSource = 'Google'
    const utmMedium = 'cpc'
    const utmCampaign = 'spring_sale'
    const utmTerm = 'running+shoes'
    const utmContent = 'logolink'
    const url = 'aaaa?utm_source=' + utmSource + '&' +
      'utm_medium=' + utmMedium + '&' +
      'utm_campaign=' + utmCampaign + '&' +
      'utm_term=' + utmTerm + '&' +
      'utm_content=' + utmContent + '&' +
      'test=&a=&'
    const utm = new Utm(url);
    expect(utm.get()).toEqual({
      utm_source : "Google",
      utm_medium: "cpc",
      utm_campaign: "spring_sale",
      utm_term: 'running+shoes',
      utm_content: 'logolink'
    });
  });

  it("should grab any utm parameters dedicated to Marketing room even if url is invalid ", () => {
    const utmSource = 'Google'
    const utmMedium = 'cpc'
    const utmCampaign = 'spring_sale'
    const utmTerm = 'running+shoes'
    const utmContent = 'logolink'
    const url = '?2a?aa?test=test&utm_source=' + utmSource + '&' +
      'utm_medium=' + utmMedium + '&' +
      'utm_campaign=' + utmCampaign + '&' +
      'utm_term=' + utmTerm + '&' +
      'utm_content=' + utmContent + '&' +
      '&link&test=&&'
    const utm = new Utm(url);

    expect(utm.get()).toEqual({
      utm_source : "Google",
      utm_medium: "cpc",
      utm_campaign: "spring_sale",
      utm_term: 'running+shoes',
      utm_content: 'logo'
    });
  });

  it("should inform that the url is required", () => {
    const url = '';
    const utm = new Utm(url);
    expect(() => {
      utm.get();
    }).toThrow({
      name: "Error",
      message: "Please, insert a valid url"
    });
  });

});