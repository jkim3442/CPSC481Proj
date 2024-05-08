## CPSC 481 Project

The basis of this project was to create a Flight Itinerary Optimizer application. In this application, a person can set a destination from the capital of each respective state, from where they start to their target destination, and then see the resulting flight optimized path.

## Installation

### Backend

To run the algorithm.py file you will need to install pandas, networkx, flask, and flask-cors. To do this go into your terminal and run the command:

```terminal
py -m pip install package
```

Replace 'package' with the required packages and you should be able to install them.

Otherwise use requirements.txt file

```bash
pip install -r requirements.txt
```

to uninstall the packages run...

```bash
pip uninstall -r requirements.txt -y
```

To start up Flask all you have to do is run the python file

```bash
python algortihm.py
```

This will start the backend and be running on `http://localhost:5000` by default. To stop the server, use **CTRL + C**

### Frontend

Make sure to install the LTS version of Node.js (20.x.x) [here](https://nodejs.org/en/download/current)

Once installed go into the frontend directory

```bash
cd frontend
npm install
npm run dev
```

Once running you'll be given a local environment in `http://localhost:5173` to view the page. To stop the environment, use **CTRL + C**

## Usage

The Starting State section has a drop down menu that allows you to choose a starting destination from the 50 states.

The End State section has a drop down menu that allows you to choose a final destination from the the 50 states.

Once you have updated the Starting and End States, press the 'Go!' button and in the Result section should display the Optimized Itinerary.
