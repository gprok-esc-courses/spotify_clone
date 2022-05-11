
# General info

This is a spotify clone college student project created with Django in back-end and React typescript in front-end

## Setup

## Front-End

```
$ cd ../client
$ npm install
$ npm start
```
OR
```
$ cd ../client
$ yarn install
yarn start
```

## Back-End

###*How to clone*
1. Clone the project
2. Setup venv in PyCharm
3. Create a .env file (For further instructions including the .env, check below the "IMPORTANT section")
4. `python manage.py migrate`
5. ``` python manage.py createsuperuser```
6. Create a ```media``` folder with ```covers``` and ```songs``` subfolders
7. Install additional packages: ```djangorestframework django-cors-headers==3.11.0 djangorestframework-simplejwt==5.0.0 PyJWT==2.3.0 python-dotenv``` and migrate again

NOTE: To create an .env file, either create a file with right click of the mouse

###*IMPORTANT*
Additionally, in order to run the server, you need to create a .env file in the cmd/powershell or terminal
by typing:

#### For Windows `echo > .env`

#### For mac/linux `touch .env`

Now type inside the .env file

- `SECRET_KEY = '<provide a secret key for the application here e.g. from https://djecrety.ir/>'`
- `ACCESS_TOKEN_LIFETIME = <Provide token lifetime in minutes>`

Or just check the .env_sample, copy all, then change the needed fields

---

**NOTE**

As for the signature key, you can find random signature keys generators online.
An example is "https://djecrety.ir/" .

---
=======
# Spotify clone

This is a student project.

## How to clone
1. Clone the project
2. Setup venv in PyCharm
3. ```python manage.py migrate```
4. ``` python manage.py createsuperuser```
5. Create a ```media``` folder with ```covers``` and ```songs``` subfolders
>>>>>>> fcba104 (initial commit with basic models for Sprint 1)
