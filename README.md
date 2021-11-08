# Http web service

## To test it

Given there is a websocket server that's running on localhost:7777, run

``` bash
npm install
npm run serve
```

Then make a GET request on localhost:3000/pop (curl or postman).

For unit test, run

``` bash
npm run test
```

## Solution

1. A PriorityQueue model that can take new values in and return the value with highest priority. The time complexity for insert() is O(log n) and for pop() is O(log n) as well.

2. A web service that connects to a customizable websocket server. On each message received, it validates then adds the valid call to it's in-memory queue. It also exposes a /pop endpoint for GET requests that pops the call with highest priority and returns to client.

3. Unit test for the PriorityQueue.

## Future improvements

1. Refactor PriorityQueue to be used generically for any type of data model that has a comparison logic.

2. Add integration test that uses a local http server based on index.js and websocket server.

3. This assumes the queue always has enough capacity, but in a real world scenario, we need to either set a max capacity, or use some kind of buffering mechanism if the capacity is reached.

4. It is mentioned in the requirement that we don't need to worry about data persistence, but if we do, a database is needed.

5. This might have issues on concurrency. One way to fix is to use SQL lock.
