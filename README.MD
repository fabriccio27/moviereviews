# Summary
This server was developed to receive and answer API calls to get movies and ratings/review information stored in the sqlite3 development database provided by django, from a `React` app. I used the `django-rest-framework` to efficiently generate endpoints interact with the model layer and views (with function and class-based views) and later installed libraries to deploy to Heroku (`psycopg, whitenoise, django-heroku`, and a couple more), but despite the build and deploy being successful, the app didn't work (big Not found error, which may have something to do with django not picking up the react build). I'm sure there's room for improvement in the model design, and would've liked to have time to write custom error messages for my serializers. I'm planning to take on those topics in the following weeks with fresh eyes.

# Goals
* Create endpoint to register users
    * Write serializers for incoming data.
    * Validate data and register user.
    * Set up signal to create watchlist on succesful user registration.
    * ~~Send response to frontend to redirect to login~~
* Create endpoint to authenticate users.
    * Use drf tool for this, they receive token to perform future requests.
* Create endpoint to retrieve all movie reviews.
* Create endpoint to create movie.
* Create endpoint to retrieve, update and delete movie reviews.
* Create watchlist for user.
    * Need to configure signal to create watchlist on registration.
* Create endpoint to add movie to user watchlist or get watchlist if user is authenticated.

## Advances

- set up drf to use token authentication.
- generated token for user through command line.
- made GET request with 'Authorization' and 'Token fjdjsfks' in header and worked for list view with permissions specified. Just for quick test, seeing movie list it's not meant to be restricted.
- set `api-auth-token/` url to make POST requests with username and password in exchange for a token. Token must be stored somewhere to make subsequents requests. If using Postman, set "Accept":"application/json" in headers, and body as raw/json
- set permissions to alter existing data.
- set foreign key relationship to movies created.
- set foreign key relationships (movie and user) to rating created.
- set watchlist for user.