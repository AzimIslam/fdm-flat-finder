import React, {Component} from "react";
import './style.css'


export default class LandlordCP extends React.Component {
    constructor() {
        super()
        this.state = {
            loggedIn: sessionStorage.getItem('loggedIn'),
            userType: sessionStorage.getItem('userType')
        }
    }
    

    render() {
        return (
            <div>
                {
                    this.state.userType != 'landlord'? <p>You are not a landlord</p>:
                    this.state.loggedIn != 'true' ? <p>You are not logged in</p>:
                    <p>Test</p>
                }
            </div>
        )
    }
}