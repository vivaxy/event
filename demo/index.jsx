/**
 * @since 2015-09-21 13:20
 * @author vivaxy
 */

import EventEmitter from '../src/event-emitter.js';
import EventEmitter2 from '../src/event-emitter2.js';

let event = new EventEmitter();

event.on('lol', (data1, data2) => {
  console.log(this, data1, data2);
});

event.emit('lol', 1, 2); // => undefined 1 2

let test = (e) => {
  console.log(e);
};

event.on('test', test);
event.on('test', test);
event.on('test', test);

event.emit('test', '这是测试'); // => 这是测试 x3
event.off('test', test);
event.emit('test', '这是测试'); // => 这是测试 x2
event.off('test');
event.emit('test', '这是测试');

const event2 = new EventEmitter2();
const callback1 = (event, data, sender, refer) => {
  console.log(event, data, sender, refer);
};
const refer1 = { name: 'refer1' };
event2.on('lol', callback1, refer1);
event2.emit('lol', { name: 'data1' }, { name: 'sender' }); // => lol { name: "data1" } { name: "sender" } { name: "refer1" }
event2.off('lol', callback1, refer1);
event2.emit('lol', { name: 'data2' }, { name: 'sender' });
