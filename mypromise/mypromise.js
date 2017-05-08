(function() {

  var STATE_PENDING = 1,
    STATE_FULLFILED = 2,
    STATE_REJECTED = 3;



  function MyPromise(executor) {
    var state = STATE_PENDING,
      currentValue,
      handlers = [];
    doResolve(executor, resolve, reject);

    function doResolve(fn, resolve, reject) {
      setTimeout(function() {
        try {
          fn(resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    }

    function handle(handler) {
      if (state === STATE_PENDING) {
        handlers.push(handler);
      } else if (state === STATE_FULLFILED) {
        if (handler.onFullfilled) {
          handler.onFullfilled(currentValue);
        }
      } else if (state === STATE_REJECTED) {
        if (handler.onRejected) {
          handler.onRejected(currentValue);
        }
      }
    }

    this.then = function(onFullfilled, onRejected) {
      return new MyPromise(function(resolve, reject) {
        return handle({
          onFullfilled: function(result) {
            if (onFullfilled) {
              try {
                return resolve(onFullfilled(result));
              } catch (e) {
                reject(e);
              }
            } else {
              resolve(result);
            }
          },
          onRejected: function(error) {
            if (onRejected) {
              try {
                return resolve(onRejected(error))
              } catch (e) {
                reject(e);
              }
            } else {
              reject(error)
            }
          }
        })
      });
    };

    function resolve(value) {
      if (value.then) {
        doResolve(value.then.bind(value), resolve, reject);
        return;
      }
      state = STATE_FULLFILED;
      currentValue = value;
      handlers.forEach(handle);
      handlers = [];
    }

    function reject(value) {
      state = STATE_REJECTED;
      currentValue = value;
      handlers.forEach(handle);
      handlers = [];
    }

  }


  window.MyPromise = MyPromise;
})();