import {Utm} from '../src';

describe("Extract UTM tracking module information", () => {

  it("should grab any utm parameters dedicated to Marketing room", () => {
    const url = 'aaaa?utm_source=Google&utm_medium=cpc&utm_campaign=spring_sale&utm_term=running+shoes&utm_content=logolink&test=&a=&';
    const utm = new Utm(url);
    expect(utm.get()).toEqual({
      utm_source : "Google",
      utm_medium: "cpc",
      utm_campaign: "spring_sale",
      utm_term: 'running+shoes',
      utm_content: 'logolink'
    });
  });

  it("should grab any utm parameters dedicated to Marketing room even if url isn't valid ", () => {
    const url = '?2a?aa?test=test&utm_source=Google?utm_medium=cpc&utm_campaign=spring_sale&utm_term=running+shoes&utm_content=logo&link&test=&&';
    const utm = new Utm(url);

    expect(utm.get()).toEqual({
      utm_source : "Google",
      utm_medium: "cpc",
      utm_campaign: "spring_sale",
      utm_term: 'running+shoes',
      utm_content: 'logo'
    });
  });

  it("should handle errors dedicated to Marketing room", () => {
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