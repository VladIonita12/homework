import React, {Component, useState} from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import UserPachetStore from '../../store/UserPachetStore'
import Form from 'react-bootstrap/Form'
import PaymentCard from 'react-payment-card-component'
import AccountStore from '../../store/AccountStore'
import EventStore from '../../store/EventStore';
import HashtagStore from '../../store/HashtagStore';
import TimePicker from 'react-bootstrap-time-picker';
class InstaAccount extends Component{

    constructor(props){
        super(props)
        this.state={
            userPachet: null,
            events:[],
            hashtags:[],
            varstaMaxima:'',
            varstaMinima:'',
            timeStart:0,
            time:0,
            timeEnd:0

        }    
        this.cancel = () =>{
            this.props.onCancel()
        }
        this.handleChange = (evt) => {
            this.setState({
                [evt.target.name]: evt.target.value
            })
        }

        this.store= new EventStore()
        this.store1 = new HashtagStore()
        this.getPickerValue = value => {
            console.log(value);
          };

         this.handleTimeChange = (time) =>{
            console.log(time);     // <- prints "3600" if "01:00" is picked
            this.setState({ timeStart: time });
          }

          this.handleTimeChange1 = (time) =>{
            console.log(time);     // <- prints "3600" if "01:00" is picked
            this.setState({ timeEnd: time });
          }
    }
    componentDidMount(){
        console.log(this.props.item)
        console.log(this.props.accountId)

        this.store.getEvents(this.props.accountId, this.props.item.id)
        this.store.emitter.addListener('GET_EVT_SUCCESS', () => {
            this.setState({
                events: this.store.events
            })
        })
        if(this.store.events.length>0){
        this.store1.getHashtags(this.props.accountId, this.props.item.id, this.store.events[this.store.events.length-1].id)
        this.store.emitter.addListener('GET_HASH_SUCCESS', () => {
            this.setState({
                hashtags: this.store1.hashtags
                
            })
        })
        
    }

    console.log(this.state.events)
    console.log(this.state.hashtags)

    }
    render(){
        
       
        return(
            <div className="container">
                <Button onClick={this.cancel}>Cancel selection</Button>
            <h1>Cont selectat: {this.props.item.numeInsta}</h1>
            
            <Form >
                    <h1>Formular creare eveniment</h1>
                   
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Varsta minima</Form.Label>
                        <Form.Control value={this.state.password} name="password" onChange={this.handleChange} type="number" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Varsta Maxima</Form.Label>
                        <Form.Control value={this.state.password} name="password" onChange={this.handleChange} type="number" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Data Incepere</Form.Label>
                        <Form.Control value={this.state.password} name="password" onChange={this.handleChange} type="date" />
                        <TimePicker name="timeStart" onChange={this.handleTimeChange} value={this.state.timeStart} start="10:00" end="21:00" step={10} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Data Incheiere</Form.Label>
                        <Form.Control value={this.state.password} name="password" onChange={this.handleChange} type="date" />
                        <TimePicker name="timeEnd" onChange={this.handleTimeChange1} value={this.state.timeEnd} start="00:00" end="23:59" step={10}  />
                    </Form.Group>

                   
                   
                    
    <br></br>
                    <Button variant="primary" onClick={this.submit}>
                        Submit
  </Button>
  
                </Form>


        </div>
        )
    }
}
export default InstaAccount