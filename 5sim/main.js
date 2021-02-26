const axios = require("axios")


class FiveSim{

    constructor(apiKey) {
        this.apiKey = apiKey
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
        return response.data
    }

    checkOrder = async (id) =>{
        let config = {
            method: 'get',
            url: 'https://5sim.net/v1/user/check/' + id,
            headers: {
                'Authorization': 'Bearer ' + this.apiKey
            }
        }
        let response = await axios(config)
        return response.data

    }

    finishOrder = async(id) =>{
        let config = {
            method: 'get',
            url: 'https://5sim.net/v1/user/finish/' + id,
            headers: {
                'Authorization':'Bearer ' + this.apiKey
            }
        }
        let response = await axios(config)
        return response.data

    }

    cancelOrder = async (id)=>{
        let config = {
            method: 'get',
            url: 'https://5sim.net/v1/user/cancel/' + id,
            headers: {
                'Authorization' : 'Bearer ' + this.apiKey
            }
        }
        let response = await axios(config)

        return response.data

    }
    banNumber = async (id)=>{
        let config = {
            method:'get',
            url: 'https://5sim.net/v1/user/ban/' +id,
            headers: {
                'Authorization' : 'Bearer ' + this.apiKey
            }

        }
        let response = await axios(config)
        return response.data

    }

}


module.exports = FiveSim
