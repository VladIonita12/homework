import {EventEmitter} from 'fbemitter'
const SERVER = 'http://52.15.124.47:8080'

class AccountStore{
    
    constructor(){
        this.accounts = []
        this.emitter = new EventEmitter()
        
    }
    async getAccounts(accountId){
        try{
            let response = await fetch(`${SERVER}/userdata/${accountId}/accounts`)
            
            let data = await response.json()
            
            this.events = data
            
            this.emitter.emit('GET_ACC_SUCCESS')
        }
        catch(err){
            console.log(err)
            this.emitter.emit('GET_ACC_ERROR')
        }
    }
    
    async addAccount(accountId,account){
        try{
            
            
            await fetch(`${SERVER}/userdata/${accountId}/accounts`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(account)
                
            })
            this.getAccounts(accountId)
            
        }
        catch(err){
            console.warn(err)
            this.emitter.emit("ADD_ACC_ERROR")
        }
    }
    
    async deleteUser(accountId, accountNumber){
         try{
            
            
            await fetch(`${SERVER}/userdata/${accountId}/accounts/${accountNumber}`, {
                method: 'delete'
                
                
            })
            this.getAccounts(accountId)
            
        }
        catch(err){
            console.warn(err)
            this.emitter.emit("DELETE_ACC_ERROR")
        }
    }
    
   
    
}

export default AccountStore
