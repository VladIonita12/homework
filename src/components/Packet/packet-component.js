import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import BeneficiiStore from '../../store/BeneficiiStore'
import AOS from 'aos'
class PacketCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      beneficii: [],
      platestePachet: false

    };
    this.select = () => {
      this.props.onSelect(this.props.item)

    }



    this.store = new BeneficiiStore();
  }
  async componentDidMount() {

    this.store.getBeneficii(this.props.item.id)

    this.store.emitter.addListener('GET_BNF_SUCCESS', () => {

      this.setState({
        beneficii: this.store.beneficii
      })

    })
    AOS.init();
  }

  render() {


    AOS.init();
    return (

      <div className="main ">
        <Card bg="white" text="dark" className="text-center" aos="fade-right">
          <Card.Body>
            <Card.Title>{this.props.item.numePachet}</Card.Title>

            {
              this.state.beneficii.map((e, i) => <Card.Text key={i} item={e}  >- {e.descriereBeneficiu}</Card.Text>)

            }
            <Card.Text>Numar conturi disponibile: {this.props.item.numarConturi}</Card.Text>
            
          </Card.Body>
            <Card.Footer><Button variant="primary" onClick={this.select} >Plateste</Button></Card.Footer>
        </Card>

      </div>
    )
  }


}


export default PacketCard