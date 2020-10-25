import {EventEmitter} from 'fbemitter'
const SERVER = 'http://52.15.124.47:8080'

class UserPachetStore{
    
    constructor(){
        this.numarCont = null
        this.emitter = new EventEmitter()
        this.packets = null
        this.user = null
    }
    async getUserPacket(userId){
        try{
            let response = await fetch(`${SERVER}/userdata/${userId}`)
            let response1 = await fetch(`${SERVER}/packets`)
            let data = await response.json()
            let data1 = await response1.json()
            this.users = data
            this.packets = data1
            if(data1)
            for(let i=0;i< data1.length;i++){
                
                if(data.tipClient===data1[i].numePachet){
                this.numarCont = data1[i].numarConturi
                this.emitter.emit('GET_CONT_SUCCESS')
                
            }
            }
            
        }
        catch(err){
            console.log(err)
            this.emitter.emit('GET_CONT_ERROR')
        }
    }
    
    
    
    
    async updateUser(id, user){
        try{
            
            
            await fetch(`${SERVER}/userdata/${id}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
                
            })
            this.getUsers()
            
        }
        catch(err){
            console.warn(err)
            this.emitter.emit("UPDATE_USER_ERROR")
        }
    }
    
}

export default UserPachetStore
