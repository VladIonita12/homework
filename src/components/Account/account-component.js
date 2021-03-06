import React, { Component} from 'react';

import Button from 'react-bootstrap/Button'
import UserPachetStore from '../../store/UserPachetStore'
import AccountStore from '../../store/AccountStore'
import Form from 'react-bootstrap/Form'

class AccountComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userPachet: null,
            accArr: [],
            instaAcc: [],
            isOk: false,
            value: ''

        }
        this.store = new UserPachetStore();
        this.store1 = new AccountStore();
        this.handleChange = (evt) => {
            this.setState({
                [evt.target.name]: evt.target.value
            })
        }

        this.delete = () => {
            this.props.onDelete(this.props.item.id)
        }

        this.save = () => {
            this.props.onSave({ numeInsta: this.state.value })

        }

        this.select = () => {
            this.props.onSelect(this.props.item)

        }

        this.isOk = () => {
            this.props.item = this.state.value
        }

        this.tooMany = () => {
            if (this.props.nrConturiFacute >= this.props.nrConturi)
                return true;
        }

    }
    componentDidMount() {



    }
    render() {

        

        return (
            <div className="container">


                <div> <Form.Group>
                    <Form.Label>{this.props.number + 1}. Instagram Account</Form.Label>
                    <Form.Control value={this.state.value} name='value' placeholder="Enter Account" onChange={this.handleChange} />
                </Form.Group>
                    <Button onClick={this.save} disabled={this.tooMany()}>Save</Button>

                </div>

            </div>
        )
    }
}
export default AccountComponent