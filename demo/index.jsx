/**
 * @since 2015-09-21 13:20
 * @author vivaxy
 */
'use strict';
import EventEmitter from '../src/event-emitter.js';

let event = new EventEmitter();

event.on('lol', (data1, data2) => {
    console.log(this, data1, data2);
});

event.emit('lol', 1, 2);

let test = (e) => {
    console.log(e);
};

event.on('test', test);
event.on('test', test);
event.on('test', test);

event.emit('test', '这是测试');
event.off('test', test);
event.emit('test', '这是测试');
event.off('test');
event.emit('test', '这是测试');
