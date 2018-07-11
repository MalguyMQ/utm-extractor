#Install utm-extractor

````
yarn add utm-extractor or npm install utm-extractor --save
````

#Usage
````
import {Utm} from 'utm-extractor'
const utm = new Utm('?utm_source=Google&utm_medium=cpc&utm_campaign=spring_sale&utm_term=running+shoes&utm_content=logolink')
const values = utm.get()

console.log(values)

{
    utm_source : "Google",
    utm_medium: "cpc",     
    utm_campaign: "spring_sale",
    utm_term: 'running+shoes',
    utm_content: 'logolink'
}

````

