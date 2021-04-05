import React, {Component} from "react";

export default class Member extends React.Component {
    constructor() {
        super()
        this.state = {
            userId: sessionStorage.getItem('user_id'),
            fullName: '',
        }
    }

    render() {
        return (
            <div id="container">

            </div>
        )
    }
}