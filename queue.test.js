// For a production level system, we also need integration test
// which starts a local http server based on index.js
// and a local websocket server that we can send messages whenever
// and however we want to.

const {Call, PriorityQueue}=require('./queue.js');

test('no element', () => {
  const pq=new PriorityQueue();
  const call=pq.pop();
  expect(call).toEqual({});
});

test('single element', () => {
  const pq=new PriorityQueue();
  pq.insert(new Call("First", "Last", "2021-11-08T06:00:40Z", "https://127.0.0.1:33213/cd60be4b-4f0a-496f-a120-d052c5c75e61", "Redmond", "WA", "8332891161", 18));
  const call=pq.pop();
  expect(call).toEqual(new Call("First", "Last", "2021-11-08T06:00:40Z", "https://127.0.0.1:33213/cd60be4b-4f0a-496f-a120-d052c5c75e61", "Redmond", "WA", "8332891161", 18));
});

// As long as priority is different, other properties do not matter in terms of testing the queue behavior
test('two elements', () => {
  const pq=new PriorityQueue();
  pq.insert(new Call("First", "Last", "2021-11-08T06:00:40Z", "https://127.0.0.1:33213/cd60be4b-4f0a-496f-a120-d052c5c75e61", "Redmond", "WA", "8332891161", 18));
  pq.insert(new Call("First", "Last", "2021-11-08T06:00:40Z", "https://127.0.0.1:33213/cd60be4b-4f0a-496f-a120-d052c5c75e61", "Redmond", "WA", "8332891161", 9));
  let call=pq.pop();
  expect(call).toEqual(new Call("First", "Last", "2021-11-08T06:00:40Z", "https://127.0.0.1:33213/cd60be4b-4f0a-496f-a120-d052c5c75e61", "Redmond", "WA", "8332891161", 18));
  call=pq.pop();
  expect(call).toEqual(new Call("First", "Last", "2021-11-08T06:00:40Z", "https://127.0.0.1:33213/cd60be4b-4f0a-496f-a120-d052c5c75e61", "Redmond", "WA", "8332891161", 9));
});

test('multiple elements', () => {
  const pq=new PriorityQueue();
  pq.insert(new Call("First", "Last", "2021-11-08T06:00:40Z", "https://127.0.0.1:33213/cd60be4b-4f0a-496f-a120-d052c5c75e61", "Redmond", "WA", "8332891161", 9));
  pq.insert(new Call("First", "Last", "2021-11-08T06:00:40Z", "https://127.0.0.1:33213/cd60be4b-4f0a-496f-a120-d052c5c75e61", "Redmond", "WA", "8332891161", 18));
  pq.insert(new Call("First", "Last", "2021-11-08T06:00:40Z", "https://127.0.0.1:33213/cd60be4b-4f0a-496f-a120-d052c5c75e61", "Redmond", "WA", "8332891161", 25));
  pq.insert(new Call("First", "Last", "2021-11-08T06:00:40Z", "https://127.0.0.1:33213/cd60be4b-4f0a-496f-a120-d052c5c75e61", "Redmond", "WA", "8332891161", 12));
  pq.insert(new Call("First", "Last", "2021-11-08T06:00:40Z", "https://127.0.0.1:33213/cd60be4b-4f0a-496f-a120-d052c5c75e61", "Redmond", "WA", "8332891161", 13));
  pq.insert(new Call("First", "Last", "2021-11-08T06:00:40Z", "https://127.0.0.1:33213/cd60be4b-4f0a-496f-a120-d052c5c75e61", "Redmond", "WA", "8332891161", 15));
  pq.insert(new Call("First", "Last", "2021-11-08T06:00:40Z", "https://127.0.0.1:33213/cd60be4b-4f0a-496f-a120-d052c5c75e61", "Redmond", "WA", "8332891161", 6));
  pq.insert(new Call("First", "Last", "2021-11-08T06:00:40Z", "https://127.0.0.1:33213/cd60be4b-4f0a-496f-a120-d052c5c75e61", "Redmond", "WA", "8332891161", 16));

  let call=pq.pop();
  expect(call).toEqual(new Call("First", "Last", "2021-11-08T06:00:40Z", "https://127.0.0.1:33213/cd60be4b-4f0a-496f-a120-d052c5c75e61", "Redmond", "WA", "8332891161", 25));
  call=pq.pop();
  expect(call).toEqual(new Call("First", "Last", "2021-11-08T06:00:40Z", "https://127.0.0.1:33213/cd60be4b-4f0a-496f-a120-d052c5c75e61", "Redmond", "WA", "8332891161", 18));
  call=pq.pop();
  expect(call).toEqual(new Call("First", "Last", "2021-11-08T06:00:40Z", "https://127.0.0.1:33213/cd60be4b-4f0a-496f-a120-d052c5c75e61", "Redmond", "WA", "8332891161", 16));
  call=pq.pop();
  expect(call).toEqual(new Call("First", "Last", "2021-11-08T06:00:40Z", "https://127.0.0.1:33213/cd60be4b-4f0a-496f-a120-d052c5c75e61", "Redmond", "WA", "8332891161", 15));
  call=pq.pop();
  expect(call).toEqual(new Call("First", "Last", "2021-11-08T06:00:40Z", "https://127.0.0.1:33213/cd60be4b-4f0a-496f-a120-d052c5c75e61", "Redmond", "WA", "8332891161", 13));
  call=pq.pop();
  expect(call).toEqual(new Call("First", "Last", "2021-11-08T06:00:40Z", "https://127.0.0.1:33213/cd60be4b-4f0a-496f-a120-d052c5c75e61", "Redmond", "WA", "8332891161", 12));
  call=pq.pop();
  expect(call).toEqual(new Call("First", "Last", "2021-11-08T06:00:40Z", "https://127.0.0.1:33213/cd60be4b-4f0a-496f-a120-d052c5c75e61", "Redmond", "WA", "8332891161", 9));
  call=pq.pop();
  expect(call).toEqual(new Call("First", "Last", "2021-11-08T06:00:40Z", "https://127.0.0.1:33213/cd60be4b-4f0a-496f-a120-d052c5c75e61", "Redmond", "WA", "8332891161", 6));
});
