
# NestJS REST API Gateway with gRPC microservices

## Overview
This project is a mono repo containing a REST API gateway with gRPC back-end microservices.
all written using the NestJS Framework and TypeScript.

## Architecture
The REST API acts as a gateway/proxy for the different microservices it exposes.
The controllers of the REST API make calls to the gRPC servers/microservices in the back end.
 subsequently, the gRPC handles the request to connect to microservices or any other service it needs to serve requests.

 
<img width="600" alt="archi-diagram" src="https://github.com/afghahi1992/nestjs-microServices/assets/79860891/ba9f23fb-e2f9-47c7-8e54-66244d64cb14">

## Layers
API Layer
NestJS + Express acts as the API Layer for the architecture. It takes care of listening to client requests and calling the appropriate back-end microservice to fulfill them.

Microservice Layer
gRPC was chosen as the framework to do the microservices. Protocol buffers were used as the data interchange format between the client (REST API) and the server (gRPC microservices). NestJS is still the framework used to create the gRPC Microservices.

Persistence Layer
PostgreSQL is used as the database and typeorm is used as the Object-Relational Mapper (ORM).


## Response Format

In the following the template of successful request and error is shown.

```

Success
{
    "message": "The service was executed successfully",
    "statusCode": 200,
    "data": {
        "users": "something",
        "description": "something"
    }
}
```
Error
{
    "message": "something",
    "statusCode": number,
    "error": "something"
}
```
