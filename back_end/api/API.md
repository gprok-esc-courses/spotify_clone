# API Documentation

***

```
/api/albums
```

Returns all albums in the database.
***

```
/api/search/album
```

Needs a POST submitted search string (named: term)  
Returns albums matching the term.
***

```
/api/search/artist
```
Needs a POST submitted search string (named: term)  
Returns artist matching the term.
```
/api/login/
```

Used to log user into the app.   
Returns token(temporary until fixed)            
_**Requirements**_:
Needs a **POST** submitted `Email` and `Password`
***

```
/api/register/
```
Register a new user.  
**POST** to submit `username`, `email`, `password`, and `password2`
