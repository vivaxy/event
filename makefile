./dest/event.js: ./src/event.js ./dest
	./node_modules/.bin/babel ./src/event.js -o ./dest/event.js
	
./dest:
	mkdir ./dest
	