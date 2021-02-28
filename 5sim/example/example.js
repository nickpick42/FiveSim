const FiveSim = require("../main");

let main = async ()=> {

    let apiKey = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDU4NjU3NjMsImlhdCI6MTYxNDMyOTc2MywicmF5IjoiNmNmODYxN2U1YzhkNzZkZDFiODRkNDllNDg4MmZkMDAiLCJzdWIiOjU2MTE2Nn0.sWLxHhUiUFQzQDvZXvFzwbWksA0rJzCDra8MoXGS2R2xb4WOSid4SLeJdOH4OPleaREXaAwII6YEe2_l43lfi2C1SXXcv12sAqj6jqd5wRCNWQJDVRha-kqtC8LtaV6J6T3eJnUBrV9WOMX9mbwGfEIPR7Ld6wIl98QBnVPsSHalZnshXQILZPbwxqDjyeA2H5bks562b9Y67y30krrlXYLI-kpRSLAc3nkEmoyZ8TDOIhEmH5ADjkcGVuYhMI9IXghQcp8Ul-ZzuCyW5TeP3QveBhdc08ChfXy-fJjnLx79g7qBZhkFiHJETc2-_Ulq-4dO84cu3Hq-bKECCaRVdg"
    let SimTesting = new FiveSim(apiKey)
    let numberRequest = await SimTesting.getAuthorizationNumber('any','any','google')
    let phoneNumber = numberRequest.phone //Generated phone number
    /*
    Example:
    await page.type("input[name='phone_number']",phoneNumber)
    await page.click("input[type='submit']")
     */

    let code = await SimTesting.waitForCode().then( verificationCode => verificationCode)

    /*
    Will block until code is recieved or 100 seconds

    Example:
    await page.type("input[name='verification_code']",code)
    await page.click("input[type='submit']")

    If succesfully no further action is required.

    If not recieved or error:
    await SimTesting.banNumber()
    OR
    await SimTesting.finishOrder()





     */

}
main()
