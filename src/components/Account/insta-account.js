import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import EventStore from '../../store/EventStore';
import HashtagStore from '../../store/HashtagStore';
import TimePicker from 'react-bootstrap-time-picker';
import { Alert } from 'react-bootstrap';
import HashTag from './hashtags'
import './insta-account.css'
class InstaAccount extends Component {

    constructor(props) {
        super(props)
        this.dataAcm = new Date()
        this.state = {
            userPachet: null,
            events: [],
            hashtags: [],
            varstaMaxima: '',
            varstaMinima: '',
            timeStart: 0,
            time: 0,
            timeEnd: 0,
            dataIncepere: this.dataDefault,
            dataIncheiere: '',
            hashtag:'#',
            wrongVarsta:true,
            nrEvents:null

        }
        this.cancel = () => {
            this.props.onCancel()
        }

        this.delete = (hashtag) => {
            this.store1.deleteHashtag(this.props.accountId, this.props.item.id, hashtag.id)
        }

      this.dataDefault = () =>{
        var dataAcum = new Date()
        let an = dataAcum.getFullYear()
        let luna = dataAcum.getMonth() + 1
        
        let zi = dataAcum.getDate()
       
        let data = an + "-" + luna + "-" + zi
        return data
      }

        this.handleChange = (evt) => {
            this.setState({
                [evt.target.name]: evt.target.value
            })
        }

        this.store = new EventStore()
        this.store1 = new HashtagStore()

       

        this.getPickerValue = value => {
            console.log(value);
        };

        this.saveHashtag = () =>{
            this.store1.addHashtag(this.props.accountId, this.props.item.id,{hashtag:this.state.hashtag})
            this.setState({
                hashtag:'#'
            })
        }

        this.handleTimeChange = (time) => {
            console.log(time);
            this.setState({ timeStart: time });
        }

        this.handleTimeChange1 = (time1) => {
            console.log(time1);
            this.setState({ timeEnd: time1 });
        }

        this.checkEnd = () => {
            if (this.state.events[this.state.events.length - 1]) {
                var dateNow = new Date()
                var dateEnd = new Date(this.state.events[this.state.events.length - 1].endDate)

                var hourEnd = this.state.events[this.state.events.length - 1].endHour
                var hourNow = dateNow.getHours() * 3600 + 60 * dateNow.getMinutes()


                if (dateNow.getTime() <= (dateEnd.getTime() + hourEnd * 60 * 60))
                    if (hourNow < hourEnd)
                       { 

                        
                        return true
                    }
                    else return false
                else return false
            }
            else return false
        }
        this.saveValue = () => {
            this.validAge()
            console.log(this.state.varstaMinima)
            console.log(this.state.varstaMaxima)
            console.log(this.state.varstaMinima <= this.state.varstaMaxima)
            if(this.state.varstaMinima <= this.state.varstaMaxima){
            this.store.addEvents(this.props.accountId, this.props.item.id, {
                varstaMin: this.state.varstaMinima,
                varstaMax: this.state.varstaMaxima,
                startDate: this.state.dataIncepere,
                endDate: this.state.dataIncheiere,
                startHour: this.state.timeStart,
                endHour: this.state.timeEnd
            })
            
        }
        else this.setState({
            wrongVarsta:false
        })
        
            
        }

        this.validAge = () =>{
            
            if(this.state.varstaMinima>this.state.varstaMaxima)
            {this.setState({
                wrongVarsta:false
            })
            
        }
            else{ this.setState({
                wrongVarsta:true
            })
        
        }
        }

        this.endValue = () => {
            let dataAcum = new Date();
            let an = dataAcum.getFullYear()
            let luna = dataAcum.getMonth() + 1

            let zi = dataAcum.getDate()
            var hourNow = dataAcum.getHours() * 3600 + 60 * dataAcum.getMinutes()

            let data = an + "-" + luna + "-" + zi
            this.store.updateEvent(this.props.accountId, this.props.item.id, this.state.events[this.state.events.length - 1].id, {
                endDate: data,
                endHour: hourNow
            })
        }

    }
    componentDidMount() {


        this.store.getEvents(this.props.accountId, this.props.item.id)
        this.store.emitter.addListener('GET_EVT_SUCCESS', () => {
            this.setState({
                events: this.store.events,
                nrEvents: this.state.events.length
            })
        })
        
        
            this.store1.getHashtags(this.props.accountId, this.props.item.id)
            this.store1.emitter.addListener('GET_HASH_SUCCESS', () => {
                this.setState({
                    hashtags: this.store1.hashtags

                })
            })
          
        

    }
    render() {

       
        

        return (
            <div className="container">
                <Button onClick={this.cancel}>Selecteaza alt cont</Button>
                <h1>Cont selectat: {this.props.item.numeInsta}</h1>

                <Form >
                    <h1>Formular creare eveniment</h1>

                    <Form.Group controlId="formAgeMin">
                        <Form.Label>Varsta Minima</Form.Label>
                        <Form.Control value={this.state.varstaMinima} name="varstaMinima" onChange={this.handleChange} type="number" />
                    </Form.Group>
                    <Form.Group controlId="formAgeMax">
                        <Form.Label>Varsta Maxima</Form.Label>
                        <Form.Control value={this.state.varstaMaxima} name="varstaMaxima" onChange={this.handleChange} type="number" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Data Incepere</Form.Label>
                        <Form.Control value={this.state.dataIncepere} name="dataIncepere" onChange={this.handleChange} type="date" />
                        <TimePicker name="timeStart" onChange={this.handleTimeChange} value={this.state.timeStart} start="00:00" end="23:59" step={5} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Data Incheiere</Form.Label>
                        <Form.Control value={this.state.dataIncheiere} name="dataIncheiere" onChange={this.handleChange} type="date" />
                        <TimePicker name="timeEnd" onChange={this.handleTimeChange1} value={this.state.timeEnd} start="00:00" end="23:59" step={5} />
                    </Form.Group>
                    

                    {!this.state.wrongVarsta && <Alert variant={"danger"}>Varsta minima nu trebuie sa fie mai mare decat cea maxima</Alert>}


                    <br></br>

                    { !this.checkEnd() &&
                        < Button onClick={this.saveValue}>Start Program</Button>
                    }
                    {this.checkEnd() && <Button onClick={this.endValue}>End Program</Button>}
                    <Form.Group controlId="formHashtag">
                        <Form.Label>Adaugare Hashtag</Form.Label>
                        <Form.Control value={this.state.hashtag} name="hashtag" onChange={this.handleChange} />
                        <p></p>
                        <Button onClick={this.saveHashtag}>Save hashtag</Button>
                    </Form.Group>
                    
                </Form>
                <h3>Hashtag-urile ultimului eveniment;</h3>
                <div className="hashtag-list">
                {this.store1.hashtags.map((x,index) => <HashTag onDelete={this.delete} item={x} key={index}></HashTag>)}
                </div>
                {this.state.events.reverse().map((x, index) => <div className="container" key={index}><p key={index}>Event nr.{this.state.events.length-index} care se termina pe {this.state.events[index].endDate.substring(0, 10)} ora </p>
                    <TimePicker disabled={true} value={this.state.events[index].endHour} step={1} className="timeEvent" />
                    <p> cu varsta cuprinsa intre {this.state.events[index].varstaMin} si {this.state.events[index].varstaMax}</p>
                    <hr></hr>
                </div>)}
                
            </div >
        )
    }
}
export default InstaAccount