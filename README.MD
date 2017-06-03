# Tunisa Universities

Tunisia is facing a municipal election for the first time after the revolution, with a number of 350 municipality. The concept of municipality is quite new for citizens, that's why this project is about helping ISIE Support team to determine from an adress the municipality where a citizen belongs.

[Hosted Version](isie-support.nadhra.tn)

## Getting Started


### Image
![alt text](https://github.com/hunter-x/where_is_my_mun/blob/master/whereis.PNG)


### Prerequisites

you need to have node.js installed on your machine, respectively npm 


### Installing

* Install the dependacies :

```
npm install
```
The node_modules file will be created for you  with the dependacies inside

* Get a key for the google maps geocoding API 
 
enable google maps API and google maps geocoding API; &nbsp; for more details check : &nbsp;[Get google API Key](https://developers.google.com/maps/documentation/javascript/get-api-key)

* Paste the key under **public/index.html** &nbsp;&nbsp;..*key= your key*

* Now start the project  :

```
npm start
```

## Warning !!

The Google geocoding API is free until exceeding 25,000 map loads per 24 hours.

We provide no warranties or guarantees of any kind as to the correctness or usability of the data.
By using the service you agree that this application is not responsible, in any way, for any consequences resulting from use of information provided by the service.

## Running the tests

Working on it

## Deployment

Generate the bundle file  :

```
npm run build
```
## Built With

* [React](https://facebook.github.io/react/) - Js library to build the User Interface 
* [leaflet](https://leafletjs.com//) - Load the maps
* [mapbox](https://facebook.github.io/react/) - Map Layer & Geocoding API
* [Google maps](https://developers.google.com/maps/documentation/geocoding/start) - Geocoding API

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
Warranties
