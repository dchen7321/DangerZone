## Danger Zone

### Setup

Install node, mongo

```
$ npm install
$ mongoimport -d dangerzone -c crimes --type csv --file ./app/public/assets/data/crime.csv --headerline
```

### Running
```
$ sudo mongod
$ nodemon
```
go to localhost:8080