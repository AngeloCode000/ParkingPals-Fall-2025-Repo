# ParkingPals-Fall-2025-Repo
Problem Statement: 
With recent changes to parking lots around campus, students and professors often have great difficulty finding a spot to park. Particularly, students have no way of knowing what lots are filled and which are empty, so many students are forced to effectively waste their time driving back and forth through multiple lots to see if there is a spare spot. This can sometimes cause a loss of active class time and unnecessary stress. Both students’ and professors’ time is very valuable, so the parking problem is in immediate need of resolution.

Proposed Solution: 
The proposed solution to the problem is an app that students can use to determine what parking lots have open spots. In scope is tracking location, and to add predictive models based off user data to return how full or how empty a lot typically is at a specific day of the week and time. Out of scope is it match location data with lot location data and allow that for a match.
The commuter user will be able to log into the app using a school account, register their vehicle/parking pass, open a parking map that displays accurate information on open spots and lot color, check in and out of lots from the app, report any issues/complications with the app or parking.
The admin user will be able to log into the app and see more detailed information on who is checked into what lot, have access to all reports made, change lot sizes or availability when events occur. 
Proposed method to solve the problem: 
The proposed method to solve the problem is to create an interface that is updated live using location tracking like traffic is tracked. The user will have to give permission for their phone’s location to be tracked using GPS or Wi-Fi. This will be linked to data tied to the parking pass. Each lot would need an area associated with it so it can be tracked when someone is in a lot. 
We will create an app that will be available on your phone, which will track the user's location, and show available parking spots.  Additionally, we will be programming in Visual Studios in java. The app will ask the user for their parking pass color and will show parking adhering to the user’s pass. Additionally, the app will show an up-to-date parking map.
The user will interact with the app by checking in whenever they park on campus and be able to see available parking. The data needed is how many parking spots are in each lot, a database of parking history (what it looked on Monday at 8am, what it looked at Friday at 3pm, exc.), and how many people have parking passes. For other systems, we will be working with applying it to either android devices or iPhone. For computations and algorithmics, we will be using a predictive system to compute what parking will look like for initial tests.

# ParkingPals Web App

A web application to help users find parking on Embry Riddle Daytona Campus.

## Tech Stack
- Frontend: React (in `src/`)
- Backend: Node.js/Express (in `backend/`)


## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- Python 3.13+ (for models and backend)

### Setup
1. Clone the repository from GitHub.
2. Install dependencies for both frontend and backend.
3. Set up the Python virtual environment:
	 - `python -m venv venv`
	 - Activate with `venv\Scripts\activate.bat` (Windows)
	 - Install Python dependencies:
		 - `pip install -r models/requirements.txt`
		 - `pip install -r backend/requirements.txt`
4. Start the backend server:
	 - Open a terminal and run:
		 - `cd backend`
		 - `npm start` (Node.js backend)
5. Run Python models:
	 - With the virtual environment activated, run:
		 - `venv\Scripts\python.exe models\main.py`

---

If you encounter issues with automated tasks, use the above manual commands to run backend and models.

## Folder Structure
- `src/` - React frontend code
- `backend/` - Node.js backend API
- `public/` - Static assets
- `docs/` - Documentation
- `tests/` - Test files

---

Replace this README with project-specific details as development progresses.
