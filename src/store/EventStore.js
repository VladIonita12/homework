import {EventEmitter} from 'fbemitter'
const SERVER = 'http://52.15.124.47:8080'

class EventStore{
    
    constructor(){
        this.events = []
        this.emitter = new EventEmitter()
        
    }
    async getEvents(accountId,instaId){
        try{
            let response = await fetch(`${SERVER}/userdata/${accountId}/accounts/${instaId}/events`)
            
            let data = await response.json()
            
            this.events = data
            
            
            this.emitter.emit('GET_EVT_SUCCESS')
        }
        catch(err){
            console.log(err)
            this.emitter.emit('GET_EVT_ERROR')
        }
    }
    
    async addEvents(accountId, instaId, event){
        try{
            
            
            await fetch(`${SERVER}/userdata/${accountId}/accounts/${instaId}/events`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(event)
                
            })
            this.getEvents(accountId,instaId)
            
        }
        catch(err){
            console.warn(err)
            this.emitter.emit("ADD_EVT_ERROR")
        }
    }

    async updateEvent(accountId, instaId,eventId, event){
        try{
            
            
            await fetch(`${SERVER}/userdata/${accountId}/accounts/${instaId}/events/${eventId}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(event)
                
            })
            this.getEvents(accountId,instaId)
            
        }
        catch(err){
            console.warn(err)
            this.emitter.emit("UPDATE_EVT_ERROR")
        }
    }


    
    
    
   
    
}

export default EventStore

