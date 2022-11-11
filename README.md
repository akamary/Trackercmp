<center><h1> Products Stock Tracker Compare </h1></center>

## Description
The goal of this project is to implement an Restfull API application for <br>tracking and fetching products by implementing a backend app using Spring Boot in addition to a <br>frontend app using Reactjs and other technologies.
Authentication and Authorization for securing both apps.

<p align="center"> --- Currently working on this repo   --- </p>  
<p align="center"><img width="600" src="https://github.com/akamary/StockTrackerCompare/blob/master/gifs/halfDemo.gif">


## 



## Technologies used
>backend
* Java 17
* Spring Boot
* Spring Boot security
* JWT
* PostgreSQL
* Spring Data JPA
* Maven
* jsoup library, for fetching products data
* postman for checking the API

>frontend
* React
* Redux
* MaterialUI
* Bootstrap
* Axios

## 

### Sign-In
`Method POST-> http://localhost:8080/rest/user/authenticate`

USER - Role
```
email: test@user.com
password: 123456
```

 <br>      
 
 ADMIN - Role:
```                
email: test@admin.com
password: 123456
``` 

### backend
ADMIN Role - SignIn 
```
test@admin.com
123456
``` 

<img width="600" src="https://github.com/akamary/StockTrackerCompare/blob/master/gifs/POST_signInBackAdmin.png">


```
USER Role- SignIn
test@user.com
123456
``` 

<img width="600" src="https://github.com/akamary/StockTrackerCompare/blob/master/gifs/POST_signInBack.png">




## SignUp

* #### back

`Method: POST-> http://localhost:8080/rest/user/register`

```
    username: ""
    email: ""
    fullname: ""
    password: ""
```

<img width="600" src="https://github.com/akamary/StockTrackerCompare/blob/master/gifs/signUp.png">





## Configuration of Spring JPA, Datasource, JWT secret, etc.
 #### Add this file to the following path and name it as `application.properties`: 
`src/main/resources/application.properties`
  
```
server.servlet.context-path=/rest

spring.datasource.url=jdbc:postgresql://localhost:5432/{dbName}
spring.datasource.username={postgres}
spring.datasource.password={password}
spring.datasource.driver-class-name=org.postgresql.Driver

spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true

jwt.secret-key={secret}
server.error.include-message=always
```


## Docs and more:
* https://maven.apache.org/guides/index.html
* https://docs.spring.io/spring-boot/docs/2.6.12/maven-plugin/reference/htmlsingle/
* https://docs.spring.io/spring-boot/docs/2.6.12/reference/htmlsingle/#data.sql.jpa-and-spring-data
* https://docs.spring.io/spring-boot/docs/2.6.12/reference/htmlsingle/#web
* https://spring.io/guides/gs/rest-service/
* https://spring.io/guides/gs/accessing-data-jpa/
* https://docs.spring.io/spring-security/reference/index.html
* https://mui.com/material-ui/getting-started/overview/
