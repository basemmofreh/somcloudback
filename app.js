const logger = require('winston');
const expressWinston = require('express-winston');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

// const AWSXRay = require("aws-xray-sdk");
const routes = require('./routes');
const app = express();


// app.use(AWSXRay.express.openSegment("EXPRESS_APPLICATION"));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// if (!process.env.DEV_MODE) {
//   app.use(awsServerlessExpressMiddleware.eventContext());
// }

app.use(cors({ origin: '*' }));


app.use('/', routes);
app.use(
  expressWinston.logger({
    transports: [
      new logger.transports.Console({
        json: false,
        colorize: false
      })
    ],
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  })
);

app.use(function(req, res, next) {
  res.on('finish', function(data) {
    console.log('Finished ' + res.statusCode); // for example
    // res.app.models.sequelize.close();
    // Do whatever you want
  });
  next();
});

// error handler
app.use(function(err, req, res, next) {
  logger.error(err);
  var status =
    err.statusCode && [400, 401, 402, 403, 404, 405, 409, 500, 501].indexOf(err.statusCode) > -1 ? err.statusCode : 500;
  if (err.name === 'SequelizeValidationError') {
    res.status(422).json({
      message: err.message,
      errors: err.errors
    });
  } else {
    res.status(status).json({
      message: err.message,
      //error: (app.get('env') === 'dev') ? err : {}
      error: err
    });
  }
});

// app.use(AWSXRay.express.closeSegment());
process.env.DEV_MODE = true;
console.log('process.envvvv', process.env.DEV_MODE);

if (process.env.DEV_MODE) {
  app.listen(3000);
  console.log('----listening on 3000----');
}

module.exports = app;
