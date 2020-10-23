import {EventEmitter} from 'fbemitter'
const SERVER = 'http://52.15.124.47:8080'

class PachetStore{
    
    constructor(){
        this.pachete = []
        this.beneficii = []
        this.emitter = new EventEmitter()
        
    }
    async getPachete(){
        try{
            let response = await fetch(`${SERVER}/packets`)
            let data = await response.json()
            this.pachete = data
            this.emitter.emit('GET_PCK_SUCCESS')
        }
        catch(err){
            console.log(err)
            this.emitter.emit('GET_PCK_ERROR')
        }
    }
    
    async addPachet(pachet){
        try{
            
            
            await fetch(`${SERVER}/packets`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pachet)
                
            })
            this.getPachete()
            
        }
        catch(err){
            console.warn(err)
            this.emitter.emit("ADD_PCK_ERROR")
        }
    }
    
    async deletePachet(id){
         try{
            
            
            await fetch(`${SERVER}/packets/${id}`, {
                method: 'delete'
                
                
            })
            this.getPachete()
            
        }
        catch(err){
            console.warn(err)
            this.emitter.emit("DELETE_PCK_ERROR")
        }
    }
    
    async updatePachet(id, pachet){
        try{
            
            
            await fetch(`${SERVER}/packets/${id}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pachet)
                
            })
            this.getPachete()
            
        }
        catch(err){
            console.warn(err)
            this.emitter.emit("UPDATE_PCK_ERROR")
        }
    }
    
}

export default PachetStore