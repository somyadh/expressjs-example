# expresjs-example

## About

This is a simple HTTP API which can convert temperature from Celsuis to Fahrenheit or vice-versa. The result is given upto 2 decimal places by default but can be changed as per user's requirement.

### Why Express.js in 2021?
With great new framworks like Deno.JS, Next.js I still think Express.JS is good enough for simple projects where one doesn't need a lot of ammunition. This also gives an opportunity to build the project as per the requirement and play around when requirements change.

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

Convert temperature from Celsuis to Fahrenheit or vice-versa. The result is given upto 2 decimal places by default but can be changed as per user's requirement.

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