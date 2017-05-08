(function() {
    'use strict';

    function onChange(e) {
        console.log(e.target.value);
    }

    function throttle(f, delay) {
        var isThrottled = false;
        var savedArgs, savedThis;


        return function() {
            savedArgs = arguments;
            savedThis = this;
            if (isThrottled) {
                return;
            }


            isThrottled = true;
            setTimeout(function () {
                f.apply(savedThis, savedArgs);
                isThrottled = false;
                savedArgs = null;
                savedThis = null;
            }, delay);

        }
    }

    var onChange100 = throttle(onChange, 1000);

    var input = document.getElementById('val');

    input.addEventListener('change', onChange100);
    input.addEventListener('keyup', onChange100);

}());