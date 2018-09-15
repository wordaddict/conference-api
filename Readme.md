This is the Capital conference API will 4 endpoint

start the application with
npm run start

start the test with
npm run test

The first endpoint is a POST method-
/talk - Adds a talk for the conference with a sample payload
{
	"title":"node",
	"abstract":"amazing language",
	"room": 765,
	"speaker": {
		"name": "Micheal",
		"company": "Terra",
		"email": "madeyinka6@example.com",
		"bio": "Goal getter, JavaScript Engineer"
	}
}

with the title (required)

2) second endpoint adds an attendee (POST)
/attendee

with a sample payload
{
	"name":"Charles",
	"company":"chatit",
	"email": "charles@example.com"
}

3) The third endpoint Adds an attendee to a talk given the name of the attendee and the title of the talk (POST)
/conf

with a sample payload
{
	"name": "Charles",
	"title": "node"
}

4) The fourth and last endpoint deletes a talk with the talk title passes as a parameter
/talk/:title (DELETE)

sample endpoint request
localhost:3700/talk/node