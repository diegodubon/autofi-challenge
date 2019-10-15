# autofi-challenge
api tu parse csv


## Getting Started

```sh
npm install
npm start
```

## Api Endpoint 

Use postman to test this endpoints
```sh
POST /api/v1/uploadCsv

ContentType form-data

parameters :{
    file: File.csv
    provider: providername
}
```
```sh
GET /api/v1/

Returns all data store in memory database

query string params

/api/v1/?provider={providername}
```
