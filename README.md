
# NestJS REST API Gateway with gRPC microservices

## Overview
This project is a mono repo containing a REST API gateway with gRPC back-end microservices.
all written using the NestJS Framework and TypeScript.

## Architecture
The REST API acts as a gateway/proxy for the different microservices it exposes.
The controllers of the REST API make calls to the gRPC servers/microservices in the back end.
 subsequently, the gRPC handles the request to connect to microservices or any other service it needs to serve requests.

 
<img width="600" alt="archi-diagram" src="https://github.com/afghahi1992/nestjs-microServices/assets/79860891/ba9f23fb-e2f9-47c7-8e54-66244d64cb14">
