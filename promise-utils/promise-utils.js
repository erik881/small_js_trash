// TODO: first, last, none, any, map, some, forEach, every

function first(promises) {
	// typecheck
	// TODO: reject if all failed
	return new Promise(function(resolve, reject) {
		promises.forEach(function(promise) {
			Promise.resolve(promise) // convert any values to promise like
				.then(resolve);
		});
	});
}

function last(promises) {
	return new Promise(function(resolve, reject) {
		var fullfilled = false,
			lastFullfilledValue,
			processedPromises = 0;

		function onFullfilled(value) {
			fullfilled = true;
			lastFullfilledValue = value;
			accumulateResults();
		}

		function accumulateResults() {
			processedPromises++;
			if (processedPromises === promises.length) {
				fullfilled ? resolve(lastFullfilledValue) : reject('All promises are rejected');
			}
		}

		promises.forEach(function(promise) {
			Promise.resolve(promise)
				.then(onFullfilled, accumulateResults);
		});
	});
}

function delayedPromise(resolveValue, delay) {
	return new Promise(function(resolve) {
		setTimeout(function() {
			resolve(resolveValue)
		}, delay);
	});
}

console.log('script start');
// first([delayedPromise(1, 200), delayedPromise(2, 100), delayedPromise(3, 150)])
// 	.then(function(v) {
// 		console.log(v);
// 	});

last([delayedPromise(1, 200), delayedPromise(2, 100), delayedPromise(3, 150)])
	.then(function(v) {
		console.log('FIRST', v);
	});

last([1, 2, 3])
	.then(function(v) {
		console.log('SECOND', v);
	});

last([Promise.reject(1), Promise.reject(2), Promise.reject(3)])
	.then(function(v) {
		console.log('THIRD', v);
	}, function() {
		console.log('THIRD ERROR');
	});

console.log('script end');