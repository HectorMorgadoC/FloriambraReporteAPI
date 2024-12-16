# API for storing maintenance reports in the company matfilm
### routes

`GET: '/'`
A confirmation of connection to the service is sent

`GET: '/login'`
The user and their credentials must be received and the token and level must be answered if the user is authorized.

`GET: '/report'`
Responds to reporters, machine descriptions, work routines and assigned

`POST: '/report'`
The data must be received for the registration of a report