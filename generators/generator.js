function run(gen) {
	var it = gen();

	return Promise.resolve()
		.then(function handleNext(value) {
			var next = it.next(value);

			return (function handleResult(next) {
				console.log(next);
				if (next.done) {
					return next.value;
				}

				return Promise.resolve(next.value)
					.then(
						handleNext,
						function handleErr(err) {
							return Promise.resolve(it.throw(err)).then(handleResult);
						}
					);
			})(next);
		})
}
