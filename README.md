
<center><h1> Products Stock Tracker Compare </h1></center>

## Description
Implemented a REST API web scraping application that allows users to search and find products from various e-commerce websites, and add them to their cart. The application is built using Spring Boot and utilizes web scraping to retrieve product information. Additionally, it features a frontend app built with ReactJS and other technologies that provides a seamless user experience. The project also includes features for user authentication and authorization to ensure security for both the backend and frontend.


<p align="center"><img width="600" src="https://github.com/akamary/StockTrackerCompare/blob/master/gifs/halfDemo.gif">


## 

* You can watch all other endpoints in the [Description](#description) above.  

| Action | HTTP method | backURI |
| --- | :---: | --- |
| [Sign-In](#sign-in) | POST | /rest/user/authenticate |
| [Sign-Up](#sign-up) | POST | /rest/register |
| [Get Cart](#get-userid-cart) {userId} | GET | /rest/cart/{userId} |
| [Add to Cart product](#add-to-cart) {productId} to Cart of {userId} | POST | /rest/cart/add|
| [Update Product](#update-product) quantity in Cart of {userId} | PUT | /rest/cart/{userId} |
| [Delete Product](#delete-product) {productId} from cart of {userId} | DELETE | /rest/cart/{userId}/{productId} |
| [Find all Products](#find-all) | GET | /rest/products/all |
| [Find Product](#find-specific-product) by id | GET | /rest/products/{id} |
| [Get all Products in {page} "asc" order](#get-all-products-asc-in-page-0) | GET | /rest/products?pageNumber={number}&pageSize=5&sortBy=price&sortDir={asc} |
| [Get all Products in {page} "desc" order](#get-all-products-desc-in-page-4) | GET | /rest/products?pageNumber={number}&pageSize=5&sortBy=price&sortDir={desc} |
| [Get all products by given text={searchText}](#search-by-given-text) | GET | /rest/products/search/{searchText} |




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


>frontend
* React
* Redux
* MaterialUI
* Bootstrap
* Axios

## 

### <mark> <br>not updated. use the table above for the correct forms. each request must starts with "Bearer {jwtToken}"<br> </mark>

## Sign-In
`POST-> http://localhost:8080/rest/user/authenticate`

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

### <mark> <br>Only allowed users<br> </mark>
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

## Find All
```
Method: GET->http://localhost:8080/rest/products/all
```
<img width="600" src="https://github.com/akamary/StockTrackerCompare/blob/master/gifs/allProducts.png">  

## Find specific Product
```
Method: GET->http://localhost:8080/rest/products/{productId}
```
<img width="600" src="https://github.com/akamary/StockTrackerCompare/blob/master/gifs/productById.png">

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
