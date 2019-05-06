how to deploy this project

goto `~/.aws/credentials` inside your home directory
add this profile to that file

```
[eurosom_dev]
aws_access_key_id=your-access-key
aws_secret_access_key=your-secret-key
```

you will need to install serverless
`npm install -g serverless`
next goto directory and run `sls deploy -s dev`

when you run this command
it will create api-gateway and attach lambda to it.

how to code into this project
first define route in controller
add route in routes.js
next add that route, method and cors option in serverless.yml

after that you need to run the above `sls deploy -s dev` command
you can see its logs inside cloudwatch with
https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logStream:group=/aws/lambda/dev-eurosom-backend

methods used
Right now only one method is added `confirmsignup`
its used for : when user receive verification code on email in that code a link is added
user clicks on that link.
The link will hit to this api gateway and lambda
we will confirm the user manually and redirect him to signin or home page.
you can see that code in side auth controller confirmSignup

Where this can be usefull?
if you need anything in backend like token generation etc.
