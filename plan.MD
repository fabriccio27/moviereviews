# Goals
* Create endpoint to register users
    * Write serializers for incoming data.
    * Validate data and register user.
    * Send response to frontend to redirect to login
* Create endpoint to authenticate users.
    * Use drf tool for this, they receive token to perform future requests.
* Create endpoint to retrieve all movie reviews.
* Create endpoint to create movie. **Title tiene que ser unique??**
* Create endpoint to retrieve, update and delete movie reviews, only accesible to authenticated users who are also owners.
* Create watchlist for user

## Advances

- set up drf to use token authentication
- generated token for user through command line 
- made GET request with 'Authorization' and 'Token fjdjsfks' in header and worked for list view with permissions specified. Just for quick test, seeing movie list it's not meant to be restricted.
- set `api-auth-token/` url to make POST requests with username and password in exchange for a token. Token must be stored somewhere to make subsequents requests. If using Postman, set "Accept":"application/json" in headers, and body as raw/json
- set permissions to alter existing data.
- set foreign key relationship to movies created.
- set foreign key relationships (movie and user) to rating created.