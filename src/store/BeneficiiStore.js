import {EventEmitter} from 'fbemitter'
const SERVER = 'http://3.17.181.163:8080'

class BeneficiiStore{
    
    constructor(){
        
        this.beneficii = []
        this.emitter = new EventEmitter()
        
    }
    async getBeneficii(pachetId){
        try{
            let response = await fetch(`${SERVER}/packets/${pachetId}/benefits`)
            let data = await response.json()
            this.beneficii = data
            this.emitter.emit('GET_BNF_SUCCESS')
        }
        catch(err){
            console.log(err)
            this.emitter.emit('GET_BNF_ERROR')
        }
    }
    
    async addBeneficiu(pachetId, beneficiu){
        try{
            
            
            await fetch(`${SERVER}/packets/${pachetId}/benefits`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(beneficiu)
                
            })
            this.getBeneficii()
            
        }
        catch(err){
            console.warn(err)
            this.emitter.emit("ADD_BNF_ERROR")
        }
    }
    
    async deleteBeneficiu(pachetId, beneficiuId){
         try{
            
            
            await fetch(`${SERVER}/packets/${pachetId}/benefits/${beneficiuId}`, {
                method: 'delete'
                
                
            })
            this.getBeneficii()
            
        }
        catch(err){
            console.warn(err)
            this.emitter.emit("DELETE_BNF_ERROR")
        }
    }
    
    async updateBeneficiu(pachetId, beneficiuId, beneficiu){
        try{
            
            
            await fetch(`${SERVER}/packets/${pachetId}/benefits/${beneficiuId}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(beneficiu)
                
            })
            this.getBeneficii()
            
        }
        catch(err){
            console.warn(err)
            this.emitter.emit("UPDATE_BNF_ERROR")
        }
    }
    
}

export default BeneficiiStore