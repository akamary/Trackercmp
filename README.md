<center><h1> Products Stock Tracker Compare </h1></center>

## Description
The goal of this project is to implement an Restfull API application for <br>tracking and fetching products by implementing a backend app using Spring Boot in addition to a <br>frontend app using Reactjs and other technologies.
Authentication and Authorization for securing both apps.
Spring Data JPA Pagination.

<p align="center"> --- Currently working on this repo   --- </p>  
<p align="center"><img width="600" src="https://github.com/akamary/StockTrackerCompare/blob/master/gifs/halfDemo.gif">


## 
* You can watch all other endpoints in the [Description](#description) above.  

| Action | HTTP method | backURI | Token Required?|
| --- | :---: | --- | :---: |
| [Sign-In](#sign-in) | POST | /8080/rest/user/authenticate | No |
| [Sign-Up](#sign-up) | POST | /8080/rest/register | No |
| Get {userId} Cart | GET | /8080/rest/user/cart/{userId} | Yes |
| Add to Cart product {productId} to Cart of {userId} | POST | 8080/rest/user/cart/{userId}/{productId} | Yes |
| Update product quantity in Cart of {userId} | PUT | 8080/rest/user/cart/{userId} | Yes |
| Delete product {productId} from cart of {userId} | DELETE | 8080/rest/user/cart/{userId}/{productId} | Yes |
| Find all Products | GET | /8080/rest/products/all | Yes |
| Find Product by id | GET | /8080/rest/products/{id} | Yes |
| [Get all Products in {page} "asc" order](#get-all-products-asc-in-page-0) | GET | 8080/rest/products?pageNumber={number}&pageSize=5&sortBy=price&sortDir={asc} | Yes |
| [Get all Products in {page} "desc" order](#get-all-products-desc-in-page-4) | GET | 8080/rest/products?pageNumber={number}&pageSize=5&sortBy=price&sortDir={desc} | Yes |
| [Get all products by given text={searchText}](#search-by-given-text) | GET | /8080/rest/products/search/{searchText} | Yes |


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

## Sign-In
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




## Sign-Up

* #### back

`Method: POST-> http://localhost:8080/rest/user/register`

```
    username: ""
    email: ""
    fullname: ""
    password: ""
```

<img width="600" src="https://github.com/akamary/StockTrackerCompare/blob/master/gifs/signUp.png">

### <mark> After a successful login the user can scan the list, search for specific product<br>(by given text) in the products list and add them to cart (only with the user's Token).<br> </mark>
## Get {userId} Cart
```
Method: GET->http://localhost:8080/rest/user/cart/{userId}
```
<img width="600" src="https://github.com/akamary/StockTrackerCompare/blob/master/gifs/userCart.png">

## Add to Cart
```
Method: POST->http://localhost:8080/rest/user/cart/{userId}/{productId}
```
<img width="600" src="https://github.com/akamary/StockTrackerCompare/blob/master/gifs/addToCart.png">

## Update product
```
Method: PUT->http://localhost:8080/rest/user/cart/{userId}
```
<img width="600" src="https://github.com/akamary/StockTrackerCompare/blob/master/gifs/updateProduct.png">

## Delete product
```
Method: DELETE->http://localhost:8080/rest/user/cart/{userId}/{productId}
```
<img width="600" src="https://github.com/akamary/StockTrackerCompare/blob/master/gifs/deleteProduct.png">
## Pagination API  



#### back  
## Get All Products ASC in Page 0<br>
```
Method: GET->http://localhost:8080/rest/products?pageNumber=0&pageSize=5&sortBy=price&sortDir=asc
Get all products in the given page number, in this example:
page=0, products per page=5, sort by=price, direction=ascending
```  
<img width="600" src="https://github.com/akamary/StockTrackerCompare/blob/master/gifs/paging.png">  
<img width="600" src="https://github.com/akamary/StockTrackerCompare/blob/master/gifs/paging1.png">  

## Get All Products DESC in Page 4<br>
```
Method: GET->http://localhost:8080/rest/products?pageNumber=4&pageSize=5&sortBy=price&sortDir=desc
Get all products in the given page number, in this example:
page=4, products per page=5, sort by=price, direction=descending
```  
<img width="600" src="https://github.com/akamary/StockTrackerCompare/blob/master/gifs/pagingDesc.png"> 

## Search by given text<br>
```
Method: GET-> http://localhost:8080/rest/products/search/{searchText}
searchText="samsung"-> http://localhost:8080/rest/products/search/samsung
```
<img width="600" src="https://github.com/akamary/StockTrackerCompare/blob/master/gifs/pagingSearch.png"> 

```
searchText="Samsung"-> http://localhost:8080/rest/products/search/Samsung
```
<img width="600" src="https://github.com/akamary/StockTrackerCompare/blob/master/gifs/pagingSearch2.png"> 

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
