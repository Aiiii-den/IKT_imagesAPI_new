# IKT_imagesAPI_new

### Third REST-APIs for my final PWA project

__1. Images API :__ enables write, read all, read one random and delete functionality
```
LOCAL ENDPOINTS:
POST: https://localhost:8080/image
GET one: https://localhost:8080/image/:id
GET all: https://localhost:8080/image
```
```
DEPLOYED ENDPOINTS:
POST: https://ikt-imagesapi-new.onrender.com/image
GET one: https://ikt-imagesapi-new.onrender.com/image/:id
GET all: https://ikt-imagesapi-new.onrender.com/image
```

__2. Prompt API:__ https://github.com/Aiiii-den/IKT_promptAPI  
__3. Writings API:__ https://github.com/Aiiii-den/IKT_writingsAPI  


### How to install:
1. Clone repository locally
2. Run `npm i`
3. Set up MongoDB (either on Atlas or Compass) : https://www.mongodb.com/
4. Create a .env file with the following structure and add your database credentials
    ``` .env
   DB_CONNECTION: mongodb+srv://<user>:<password>@<collection>.mongodb.net/?retryWrites=true&w=majority
   DATABASE: <database>
   ```
5. Run with `npm run watch`  

### Postman examples requests:


### Frontend:
Frontend repository can be found at the following URL: https://github.com/Aiiii-den/IKT_frontendNew  
Or deployed at: https://ikt-frontend-new.vercel.app/
