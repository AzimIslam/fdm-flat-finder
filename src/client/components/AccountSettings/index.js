import React from "react";
import TextField from "@material-ui/core/TextField";
import './style.css';
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'

export default class AddCreateTicketForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //text box with email can't edit 
            //enter password, new password
            // first name, last name, agency name

            details: [],
            newPassword: '',
            userID: sessionStorage.getItem('user_id'),
        }
        this.editRequest = this.editRequest.bind(this)
    }

    editRequest() {
        let req = {
            agencyName: this.state.agencyName,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            newPassword: this.state.newPassword,
            userID: sessionStorage.getItem('user_id'),
        }

        console.log(req)
        fetch(`/api/user/editUser`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
        .then(response => response.json())
        .then(res => {
            console.log(res)
        })
    }

    async componentDidMount() {
        await fetch(`/api/user/getUserDetails`)
            .then(response => response.json())
            .then(data => {
                this.setState({details: data})
            });

        console.log(this.state.details)
    }


    render() {

        return( 
        <TableContainer component={Paper}>
        <Table id="table" aria-label="simple table">
        <TableHead>
            <TableRow>
            <TableCell align="left">Agency Name</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="left">First Name</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="left">Last Name</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="left">Email</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="left">Password</TableCell>
            </TableRow>   
        </TableHead>
        <TableBody>
            {this.state.details.map((row) => (
            <TableRow key={row.UserID}>
                <TableCell align="left">{row.agencyName}</TableCell>
                <TableCell align="left">{row.firstName}</TableCell>
                <TableCell align="left">{row.lastName}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.currentPassword}</TableCell>
                <TableCell align="left" style={{overflow: 'none'}}>
                    <div className="buttons">
                        <Button onClick={() => this.editRequest()} style={{marginLeft: "10px"}} variant="contained" color="primary">Edit</Button>
                    </div>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    </TableContainer>
        )
      
    }
}
