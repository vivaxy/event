./dest/event-emitter.js: ./src/event-emitter.js ./dest
	./node_modules/.bin/babel ./src/event-emitter.js -o ./dest/event-emitter.js --modules umd --module-id EventEmitter

./dest:
	mkdir ./dest
