var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var adminRouter = require('./src/routers/admin.router');
var userRouter = require('./src/routers/user.router');
var cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
var app = express();
// app.use(cors())


// const options = {
//   definition: {
//     open: "4.3.0",
//     info: {
//       title: "Library API",
//       version: "1.0.0",
//       description: "simple api"
//     },
//     servers: [{ url: "http://localhost:3000" }
//     ],
//     apis: ["./src/routers/*.js"]
//   }
// }
// const specs = swaggerJsDoc(options)

// app.use('/api-docs', swaggerUi.serve, swagger.setup(specs))

// app.use('/api/docs', swaggerUi.serve,
//             swaggerUi.setup(this.swaggerDocument, null, null, this.customCss));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'swagger-ui')));
app.use(express.static(path.join(__dirname, 'src/assets')));

app.use('/user', userRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//connect to server

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/data_user', {});
    console.log('connect success');
  } catch (error) {
    console.log("connect fail");
  }
}
connect()

module.exports = app;
