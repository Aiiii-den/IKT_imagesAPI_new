# IKT_imagesAPI_new

### Third REST-API for my final PWA project

__1. Prompt API:__ https://github.com/Aiiii-den/IKT_promptAPI    

__2. Writings API:__ https://github.com/Aiiii-den/IKT_writingsAPI    

__3. Images API :__ enables write, read all and read one functionality
```
Local Endpoints:
POST: https://localhost:8080/image
GET one: https://localhost:8080/image/:id
GET all: https://localhost:8080/image
```
```
Deployed Endpoints:
GET one: https://ikt-imagesapi-new.onrender.com/image/:id
GET all: https://ikt-imagesapi-new.onrender.com/image
```


### How to install:
1. Clone repository locally
2. Run `npm i`
3. Set up MongoDB (https://www.mongodb.com/)
4. Create a .env file with the following structure and add your database, web push and web push subscription credentials
    ``` .env
   DB_CONNECTION: mongodb+srv://<user>:<password>@<collectionId>.mongodb.net/?retryWrites=true&w=majority
   DATABASE: <database>
   
   PUBLIC_KEY = <public web push subscription key>
   PRIVATE_KEY = <private web push subscription key>
   
   ENDPOINT = <subscription endpoint>
   P256DH_KEY = <subscription p256dh>
   AUTH_KEY = <subscription auth>
   ```
5. Run with `npm run watch`  
6. Stop with `Ctrl + C`


### Frontend:
Frontend repository can be found at the following URL: https://github.com/Aiiii-den/IKT_frontendNew  
Or deployed at: https://ikt-frontend-new.vercel.app/
