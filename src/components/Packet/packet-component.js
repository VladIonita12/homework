import React, {Component, useState} from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import BeneficiiStore from '../../store/BeneficiiStore'
import AOS from 'aos'
class PacketCard extends Component{

    constructor(props){
        super(props);
        this.state = {
          beneficii: [],
          platestePachet: false
          
        };
        this.select = () =>{
          this.props.onSelect(this.props.item)
          
      }

        

        this.store = new BeneficiiStore();
      }
      async componentDidMount() {
    
        this.store.getBeneficii(this.props.item.id)
        
        this.store.emitter.addListener('GET_BNF_SUCCESS', ()=>{
          
            this.setState({
                beneficii: this.store.beneficii
            })
            
        })
        AOS.init();
      }

    render(){
      


        return(

            <div class="main " >
<Card bg="white" text="dark" className="text-center" data-aos="zoom-in">
   <Card.Body>
    <Card.Title>{this.props.item.numePachet}</Card.Title>
   
    {
                    this.state.beneficii.map((e,i) => <Card.Text key={i}  item={e}  >- {e.descriereBeneficiu}</Card.Text>)
                    
                    }
   <Card.Text>Numar conturi disponibile: {this.props.item.numarConturi}</Card.Text>
    <Button variant="primary" onClick={this.select} >Plateste</Button>
  </Card.Body>
  
</Card>

            </div>
        )
    }


}


export default PacketCard