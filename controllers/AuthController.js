var AWS = require('aws-sdk');
AWS.config.setPromisesDependency(require('bluebird'));
let CognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({
    
    region: 'us-east-1'
});

const crypto = require('crypto');


module.exports = {
    confirmSignup: async (req, res, next) => {

        const confirmationCode = req.query.code;
        const username = req.query.username;
        const clientId = req.query.clientId;
        const region = req.query.region;
        const email = req.query.email;
        



        let params = {
            ClientId: clientId,
            ConfirmationCode: confirmationCode,
            Username: username
        }

        

        console.log('1querrrrrrrrrryyyyyyyyy', req.query)
        console.log('2paraaamsssssss', params);
        let redirectUrl = process.env.POST_REGISTRATION_VERIFICATION_REDIRECT_URL;

        var confirmSignUp = CognitoIdentityServiceProvider.confirmSignUp(params).promise()

        confirmSignUp.then(
          (data) => {
            let redirectUrl = process.env.POST_REGISTRATION_VERIFICATION_REDIRECT_URL
            res.redirect(redirectUrl);
          }
        ).catch(
          (error) => {
            next(error)
          }
        )

    }
}