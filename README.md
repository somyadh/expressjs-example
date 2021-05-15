# expresjs-example

## About

This is a simple HTTP API which can convert temperature from Celsius to Fahrenheit or vice-versa. The result is given upto 2 decimal places by default but can be changed as per user's requirement.


## Pre-requisite
- Node.JS

## Steps to install and run:
1. Unzip the folder expressjs-example
2. Go to unzippped folder expressjs-example folder
3. Run `npm install`. This will install all neccessary packages.
4. Create a file called ".env" and copy paste the following lines to it:

        NODE_ENV=development
        PORT=3000
    The value of `PORT` can be changed to any number where you want to the server to be listening at.
5. Open up a terminal and go to the folder you unzipped in step 2
6. Execute the following command to start the server:

        npm run dev
    This will start the server to listen at the `127.0.0.1:PORT` and you will see message similiar to this:

    ![Server-start](/images/server-start.png)

7. Open up another terminal and use curl command to check if the setup is proper:

        curl "http://localhost:3000/v1"
    The response of this should be 200 OK and a `Hello World!` message.

Now you are all set to convert temperature from Celsius to Fahrenheit or vice-versa.

## API documentation

### Temperature
Temperature right now has just one functionality which is to convert temperature from one unit of measurement to another unit measurement. 
All the temperature resources will have the base URL:

``` http://localhost:3000/v1 ```

### Convert Temperature resource
```/temperature/convert```

Convert temperature from Celsius to Fahrenheit or vice-versa. The result is given upto 2 decimal places by default but can be changed as per user's requirement.

Parameter | Description | Data Type | Mandatory
--------- | ----------- | --------- | ---------
value | The numerical value of temperature to be converted. | Number | Yes
unit | The unit of measurement of temperature from which is to be converted. The valid ones currently supported are only Celsius(C) and Fahrenheit(F). | String | Yes
precision | The number of decimal places to be present in the output. By default the value is set to be 2. | Integer | No

Returns:

Returns an object containing `value` (in string) in the other unit of measurement and other `unit` of measurement as well.
Follows the format:
```json
{
 "unit": string,
 "value": string
}
```

Examples:

Request

```
> curl "http://localhost:3000/v1/temperature/convert?value=12.13&unit=f&precision=6"                  
```
Response
```json
{
 "unit":"C",
 "value":"-11.038889"
}
```

Request

```
>  curl "http://localhost:3000/v1/temperature/convert?value=12.13&unit=c"                 
```
Response
```json
{
 "unit":"F",
 "value":"53.83"
}
```

Error message details:

Message | Description
--- | ---
UNIT NOT FOUND | The valid input for `unit` param can only be either `C` for Celsius and `F` for Fahrenheit. Anything other than this throws this error. See data object to get more detail.
INVALID VALUE | Only numerical(whole, decimal, positive, negative) input is allowed for this param. Usually comes up when string or empty string is passed to this param. See data object to get more detail.

Example:
Request

```
>  curl  curl "http://localhost:3000/v1/temperature/convert?value=12.13&unit=fc"                 
```
Response
```json
{
 "error":"UNIT NOT FOUND",
 "data":{"unit":"FC"}
}
```
## A word about design, architecture, frameworks used

### Why Express.js in 2021?
With great new framworks like Deno.JS, Next.js I still think Express.JS is good enough for simple projects where one doesn't need a lot of ammunition. This also gives an opportunity to build the project as per the requirement and play around when requirements change.

Mostly just a few things were kept in mind while designing this:

- Layered approach: Layered approach helps us to achieve `separation of concerns` and thus make the code more readable, maintainable and can be evolved better. For example: Here we have two layers: 

    1. Routes + Controllers: These two layers are related to HTTP request/responses. Routes handle the requests and direct it to correct controller. Controller takes the data, validate and then forward to the services for further processing.
    2. Services + Data Acess: These two layers are mainly related business logic. Services get the data from controller and manipulate and process as per our business requirements. These are then passed to data access which talks to our data warehouses and retrieve the data as required by services. Although to keep things simple this example does not have data access part.

Each of these has there own task and if in future we want to replace underlying framework we can do it without thinking about building the whole software from scratch.

- Ease of testing: Quality is one of the most important thing when it comes to deliver any software. This in turn also means that we should write code which is easy to test. For example: When we unit test services, we are essentially testing our core logic minus the external disturbances (e.g. Network disturbances) which helps us to focus on one task and hence give a better quality. 

- Evolution: Softwares are ever-evolving. There are always new business requirements, changed requirements, tech debts to be paid off, bugs to be fixed. Writing a tightly coupled big chunk of code can be anti-evolution. But we cannot also forsee the future requirements. So the code should be written in a manner where it completly solves the problem at hand right now while also have scope to be evolved to even may be something completely different in future.
 For example, Express.JS passed the data received in HTTP requests in `req` object to controllers. What if we later want to use some other framework like Hapi.JS which uses `request` object. For this, at the starting of controller, there is a simple one line added: ``` let { value, unit, precision } = req.query ```. We no longer use `req` object in our services, they are completey independent of the framework which is handling HTTP logics.
 This is one of the many such small things which a developer can do to make their code evolution-friendly, maintainable.

There are more minute things and multiple examples in code which helps us to achieve the above points and even more. This small API doesn't confine to any design pattern or architecture(atleast not known to me) but tries to take good parts and best practices from various resources and implements what I think is good for our problem right now but also has the scope to evolve with time.

Please reach out to me for any suggestions or feedbacks by raising issues.
