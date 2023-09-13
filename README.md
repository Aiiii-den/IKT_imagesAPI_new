# IKT_backend

### REST-API containing core functionalities of two APIs
*Dev mode differentiates a bit from deployed API*

__1. Prompt API :__ enables write, read all, read one random and delete functionality
> Endpoints:
> <br>  POST: https://localhost:8080/prompt
> <br>  GET all: https://localhost:8080/prompt/all
> <br>  GET random: https://localhost:8080/prompt/random
> <br>  DELETE: https://localhost:8080/prompt/:id

__2. Writings API :__ enables write, get all and delete text and upload, get all and delete image
> Endpoints:
> <br>  POST text: https://localhost:8080/text
> <br>  GET all texts: https://localhost:8080/text/all
> <br>  DELETE text: https://localhost:8080/text/:id
> <br>  POST image: https://localhost:8080/image
> <br>  GET all image: https://localhost:8080/image/all
> <br>  DELETE image: https://localhost:8080/image/:id


### How to install:
1. Clone repository locally
2. Set up MongoDB (either on Atlas or compass) - LINK
3. Create a .env file with the following structure and add your database credentials
![[picture]]
4. Run with npm run watch  
P.S. before the app is useful at least one prompt needs to be added to the database (POST https://localhost:8080/text) -- see .yaml for further request details

### Postman examples requests:



### Frontend:
Frontend repository can be found at the following URL: https://github.com/aiiii-den/IKT_frontend  
Or deployed at: https://lalalala
