import React, {Component} from 'react'
import UserPachetStore from '../../store/UserPachetStore'
import AccountStore from '../../store/AccountStore'
import AccountComponent from './account-component'
import InstaAccount from './insta-account'
import App from '../../App'
import './account-list.css'
import Button from 'react-bootstrap/Button'
import InstaFrame from './insta-frame'
class AccountList extends Component {
    constructor(){
        super()
        this.state= {
            accounts: [],
            selectedAccount: null,
            isLogout: false,
            accounts3: []
            
        }
        
        this.add = (account)=>{
            console.log(account)
            console.log(this.props.account.id)
            this.store3.addAccount(this.props.account.id, account)

        }
        this.delete = (id)=>{
            this.store3.deleteAccount(this.props.account.id,id)
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
        this.store = new UserPachetStore();
        this.store1 = new AccountStore();
        this.store3 = new AccountStore()
    }
    componentDidMount(){
        this.store.getUserPacket(this.props.account.id)
        
        this.store.emitter.addListener('GET_CONT_SUCCESS', ()=>{
      
            this.setState({
                userPachet: this.store.numarCont
            })
            
        })
        this.store3.getAccounts(this.props.account.id)
        this.store3.emitter.addListener("GET_ACC_SUCCESS", ()=>{
            this.setState({
                accounts3: this.store3.accounts
            })
        })
        
            this.store1.getAccounts(this.props.account.id)
        
      
        this.store1.emitter.addListener('GET_ACC_SUCCESS',()=>{
            this.setState({
                accounts: this.store1.accounts
            })
        })
        console.log(this.store3.accounts)
        console.log(this.state.accounts3)
        console.log(this.state.accounts)
        console.log(this.store1.accounts)
    }
    render(){
        
        if(this.state.isLogout)
        return <App></App>

        if(this.state.selectedAccount){
           return <InstaAccount onCancel={this.cancel}  item={this.state.selectedAccount} accountId={this.props.account.id}></InstaAccount>
        }
        else{
              return <div className="container">
                  <div>
                  <Button onClick={this.logout}>LogOut</Button>
                  <Button className="margin">Reinnoire plata</Button>
                    </div>
                    <h2>Buna, {this.props.account.numeClient}</h2>
            <h2>Tip Pachet: {this.props.account.tipClient}</h2>
            <h3>Pachetul va expira pe: {this.props.account.dataIncheiere}</h3>
          
                    { this.state.accounts3 && 
                    Array.from(Array(this.state.userPachet)).map((x, index) => <AccountComponent key={index} nrConturi={this.state.userPachet} nrConturiFacute={this.state.accounts3.length} id={this.props.account.id}  number={index} item={x} onDelete={this.delete} onSave={this.add} onSelect={this.select} />)
                    
                    }
                    
                   {this.state.accounts3 && 
                       this.state.accounts3.map((x,index) => <InstaFrame key={index} onSelect={this.select} onDelete={this.delete} item={x} i={index}></InstaFrame>)
                   }
                    
                    </div>
        }
        
      
    }
}

export default AccountList