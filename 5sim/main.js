const axios = require("axios")
const Delay = require("delay")

class FiveSim{

    constructor(apiKey) {
        this.apiKey = apiKey
        this.stopCheck = false
        this.interval = 500
        this.stopCheckAfter = 100000
    }

    getBalance = async ()=>{

        const config = {
            method: "get",
            url:"https://5sim.net/v1/user/profile",
            headers: {
                'Authorization' : 'Bearer ' + this.apiKey
            }
        }
        let response = await axios(config)
        return response.data
    }

    getAuthorizationNumber = async (country, operator, name)=>{
        let config = {
            method: 'get',
            url: 'https://5sim.net/v1/user/buy/activation/' + country + '/' +operator + '/' +name,
            headers:{
                'Authorization':'Bearer ' + this.apiKey
            }
        }
        let response = await axios(config)
        this.id = response.data.id
        return response.data
    }
    waitForCode = async (manualId, interval, stopCheckAfter) =>{
        if ( !this.isIdSet(manualId) ){
            return
        }
        if ( interval !== undefined ){
            this.interval = interval
        }

        if ( stopCheckAfter !== undefined ){
            this.stopCheckAfter = stopCheckAfter
        }


        new Promise( async () =>{
            await Delay(this.stopCheckAfter)
            this.stopCheck = true
        })

        let code = undefined
        while ( true ){
            if ( this.stopCheck ) {
                break
            }
            await Delay(this.interval)
            try {
                let phoneCheck = await this.checkOrder()
                code = phoneCheck.sms[0].code;
                new Promise( async ()=>{
                    await this.finishOrder(this.id)
                })
                break
            }catch ( e){

            }
        }


        return code

    }

    checkOrder = async (manualId) =>{
        if ( !this.isIdSet(manualId) ){
            return
        }

        let config = {
            method: 'get',
            url: 'https://5sim.net/v1/user/check/' + this.id,
            headers: {
                'Authorization': 'Bearer ' + this.apiKey
            }
        }

        let response = await axios(config)
        return response.data

    }
    finishOrder = async(manualId) =>{
        this.stopChecking()
        if ( !this.isIdSet(manualId) ){
            console.log("Must request number first")
            return
        }

        let config = {
            method: 'get',
            url: 'https://5sim.net/v1/user/finish/' + this.id,
            headers: {
                'Authorization':'Bearer ' + this.apiKey
            }
        }
        let response = await axios(config)
        return response.data

    }

    cancelOrder = async (manualId)=>{
        if ( !this.isIdSet(manualId) ){
            console.log("Must request number first")
            return
        }
        this.stopChecking()
        let config = {
            method: 'get',
            url: 'https://5sim.net/v1/user/cancel/' + this.id,
            headers: {
                'Authorization' : 'Bearer ' + this.apiKey
            }
        }
        let response = await axios(config)

        return response.data

    }
    banNumber = async (manualId)=>{
        if ( !this.isIdSet(manualId) ){
            console.log("Must request number first")
            return
        }
        this.stopChecking()
        let config = {
            method:'get',
            url: 'https://5sim.net/v1/user/ban/' +this.id,
            headers: {
                'Authorization' : 'Bearer ' + this.apiKey
            }


        }
        let response = await axios(config)
        return response.data
    }
    isIdSet = (manualId)=>{
        if ( this.id === undefined && manualId === undefined ){
            return false
        }
        if ( this.id === undefined ){
            this.id = manualId
        }
        return true;
    }
    stopChecking = ()=>{
        this.stopCheck = true
    }

}



module.exports = FiveSim
