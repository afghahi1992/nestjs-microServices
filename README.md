
# NestJS REST API Gateway with gRPC microservices
This project is a mono repo containing a REST API gateway with gRPC back-end microservices.
all written using the NestJS Framework and TypeScript.

## Architecture Overview
The REST API acts as a gateway/proxy for the different microservices it exposes.
The controllers of the REST API make calls to the gRPC servers/microservices in the back end.
 subsequently, the gRPC handles the request to connect to microservices or any other service it needs to serve requests.
