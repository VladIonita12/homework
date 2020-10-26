import {EventEmitter} from 'fbemitter'
const SERVER = 'http://52.15.124.47:8080'

class HashtagStore{
    
    constructor(){
        this.hashtags = []
        this.emitter = new EventEmitter()
        this.events = []
    }
    async getHashtags(accountId,instaId){
        try{

            let response1 = await fetch(`${SERVER}/userdata/${accountId}/accounts/${instaId}/events`)

            let data1 = await response1.json()
            
            let events = data1

            var eventId = events[events.length-1].id

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
    
    async addHashtag(accountId, instaId, hashtag){
        try{
            
            let response1 = await fetch(`${SERVER}/userdata/${accountId}/accounts/${instaId}/events`)

            let data1 = await response1.json()
            
            let events = data1

            var eventId = events[events.length-1].id 

            await fetch(`${SERVER}/userdata/${accountId}/accounts/${instaId}/events/${eventId}/hashtags`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(hashtag)
                
            })
            this.getHashtags(accountId,instaId)
            
        }
        catch(err){
            console.warn(err)
            this.emitter.emit("ADD_HASH_ERROR")
        }
    }

    async deleteHashtag(accountId, instaId, hashtagId){
        try{
           
            let response1 = await fetch(`${SERVER}/userdata/${accountId}/accounts/${instaId}/events`)

            let data1 = await response1.json()
            
            let events = data1

            var eventId = events[events.length-1].id
           await fetch(`${SERVER}/userdata/${accountId}/accounts/${instaId}/events/${eventId}/hashtags/${hashtagId}`, {
               method: 'delete'
               
               
           })
           this.getHashtags(accountId,instaId)
           
       }
       catch(err){
           console.warn(err)
           this.emitter.emit("DELETE_ACC_ERROR")
       }
   }


    
    
    
   
    
}

export default HashtagStore
