const FiveSim = require("../main");

let main = async ()=> {
    let apiKey = "PUT_API_KEY_HERE"
    let SimTesting = new FiveSim(apiKey)
    let numberRequest = await SimTesting.getAuthorizationNumber('any','any','google')
    let phoneNumber = numberRequest.phone //Generated phone number
    let id = numberRequest.id //Id to check order
    let check = await SimTesting.checkOrder(id)
    let code = check.sms[0].code//Recieved Code
    let finish = await SimTesting.finishOrder(id)// Finish order if successful
    console.log(finish)

}
main()
