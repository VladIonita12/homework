import {EventEmitter} from 'fbemitter'
const SERVER = 'http://52.15.124.47:8080'

class HashtagStore{
    
    constructor(){
        this.hashtags = []
        this.emitter = new EventEmitter()
        
    }
    async getHashtags(accountId,instaId,eventId){
        try{
            let response = await fetch(`${SERVER}/userdata/${accountId}/accounts/${instaId}/events/${eventId}/hashtags`)
            
            let data = await response.json()
            
            this.hashtags = data
            
            
            this.emitter.emit('GET_HASH_SUCCESS')
        }
        catch(err){
            console.log(err)
            this.emitter.emit('GET_HASH_ERROR')
        }
    }
    
    async addHashtag(accountId, instaId, eventId, hashtag){
        try{
            
            
            await fetch(`${SERVER}/userdata/${accountId}/accounts/${instaId}/events/${eventId}/hashtags`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(hashtag)
                
            })
            this.getHashtags(accountId,instaId,eventId)
            
        }
        catch(err){
            console.warn(err)
            this.emitter.emit("ADD_HASH_ERROR")
        }
    }

    async deleteHashtag(accountId, instaId, eventId, hashtagId){
        try{
           
           
           await fetch(`${SERVER}/userdata/${accountId}/accounts/${instaId}/events/${eventId}/hashtags`, {
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

export default HashtagStore
