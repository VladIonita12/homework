import React, {Component} from 'react'
import UserPachetStore from '../../store/UserPachetStore'
import AccountStore from '../../store/AccountStore'
import AccountComponent from './account-component'
import InstaAccount from './insta-account'
import App from '../../App'
import Button from 'react-bootstrap/Button'
import InstaFrame from './insta-frame'
class AccountList extends Component {
    constructor(){
        super()
        this.state= {
            accounts: null,
            selectedAccount: null,
            isLogout: false,
            
        }
        this.store = new UserPachetStore();
        this.store1 = new AccountStore();
        this.add = (account)=>{
            console.log(account)
            console.log(this.props.account.id)
            this.store1.addAccount(this.props.account.id, account)
        }
        this.delete = (id)=>{
            this.store1.deleteUser(id)
        }
        
        
        this.select = (account) =>{
            
            this.setState({
                selectedAccount: account
            })
        }
        this.cancel = ()  => {
            this.setState({
                selectedAccount:null
            })
        }
        this.logout = () =>{
            this.setState({
                isLogout: !this.state.isLogout
            })
        }
        
    }
    componentDidMount(){
        this.store.getUserPacket(this.props.account.id)
        this.store1.getAccounts(this.props.account.id)
        
      
        this.store1.emitter.addListener('GET_ACC_SUCCESS',()=>{
            this.setState({
                accounts: this.store1.accounts
            })
        })
        this.store.emitter.addListener('GET_CONT_SUCCESS', ()=>{
      
            this.setState({
                userPachet: this.store.numarCont
            })
            
        })
        console.log(this.state.accounts)
        console.log(this.store1.accounts)
    }
    render(){
        
        if(this.state.isLogout)
        return <App></App>

        if(this.state.selectedBus){
            return <InstaAccount item={this.state.selectedBus} onCancel={this.cancel}/>
        }
        else{
              return <div className="container">
                  <Button onClick={this.logout}>LogOut</Button>
                    <h2>Buna, {this.props.account.numeClient}</h2>
            <h2>Tip Pachet: {this.props.account.tipClient}</h2>
          
                    {
                    Array.from(Array(this.state.userPachet)).map((x, index) => <AccountComponent key={index} id={this.props.account.id} number={index} item={x} onDelete={this.delete} onSave={this.add} onSelect={this.select} />)
                    
                    }
                    
                   {
                       this.state.accounts.map((x,index) => <InstaFrame key={index} item={x} i={index}></InstaFrame>)
                   }
                    
                    </div>
        }
        
      
    }
}

export default AccountList