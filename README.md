# FINAL PROJECT - PRACTICUM - NEWS API 

In this project we will create an independent app working on a server about news like a newsfeed.
api.namernews.students.nomoredomainssbs.ru, namernews.students.nomoredomainssbs.ru, www.namernews.students.nomoredomainssbs.ru

# STAGE I  

Backend structure built on Stage I, .

Controllers: users.js , articles.js
errors:  the predefined error classes with their status codes
middleware: auth.js (authorization), errorHandler.js(come handy in prev project), limiter.js (limiting page requests to keep browser side safe), logger.js(winston-express to have error and run logs), validator.js (schema validation rules here with Joi-celebrate addon)
models: user and article schemas
routes: index.js signup and signin validated from validator.js / users.js and article.js - the routes are protected with auth and validated
