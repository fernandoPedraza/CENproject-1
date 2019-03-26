//This file holds any configuration variables we may need
//'config.js' is usually ignored by git to protect sensitive information, such as your database's username and password


module.exports = {
  db: {
    uri: 'mongodb://troyfischer:gators1@ds064748.mlab.com:64748/bootcamp3cen3031', //place the URI of your mongo database here.
  },
    port: 8080,
    secret: 'somesecret'
};
