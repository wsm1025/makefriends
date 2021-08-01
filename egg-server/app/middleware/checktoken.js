'use strict';
function checkToken() {
  return async function(ctx, next) {
    console.log('hello,middleware');
    await next();
  };
}
module.exports = checkToken;
