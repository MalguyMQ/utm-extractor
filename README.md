#Install utm-parser

````
yarn add utm-parser or npm install utm-parser --save
````

#Usage
````
import {Utm} from 'utm-parser'
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

