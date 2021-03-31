
import React, { Component } from 'react';
export default class ApiHandler{  //single instance static class, same instance called when imported, all used for API interaction
static self = null
constructor(){ //singleton pattern in javascript
    if (self != null){ return self }
    else { self = this}
}

static getHashKey(){ //gets the haskey from 
}

//submits register/login data, could find way to prevent use in LoginBox/RegisterBox 

static createRequest(address, json){
    fetch(address, {
        method:"POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    }).then(
        response => response.json() 
    ).then(
        res => console.log(res)
    )
}


//used to hash data before updating state json -> fix hash function
static hash(val, hashkey){
    //var sum = 0
    //for (var char in val){
     //   sum += Number(char);
    //}
    //return sum % hashkey;
    return val
}

}
var ApiHandlerInstance = new ApiHandler() //ApiHandlerInstance thats used by other classes