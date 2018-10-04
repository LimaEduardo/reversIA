# ReversIA

A reversi game with an Artificial Intelligence built using python (to build AI) and ReactJS (to display the elements on the screen)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for testing purposes.

### Prerequisites

What things you need to install the software and how to install them

```
node
npm
python
pip
```

### Installing

To run this game, you need to install the dependencies for the inteface and the IA.

Clone this repository:
```
git clone https://github.com/LimaEduardo/reversIA.git
```

Install IA dependencies
```
$pip install --user flask
$pip install --user flask-cors
```
Install interface dependencies (in the root of the repository)
```
$npm i
```

### Starting application

After installing those dependencies, start the IA:
```
$cd ./python
export FLASK_APP=server.py
flask run
```

then, start the interface (in the root of the repository):
```
npm start
```

## Built With

* [Create-React-App](https://github.com/facebook/create-react-app) - The web framework used
* [Flask](http://flask.pocoo.org/) - To set-up the python server

## Authors

* [**Eduardo Lima**](https://github.com/LimaEduardo)
* [**Gabriel Ribeiro**](https://github.com/gabriel-gro)
