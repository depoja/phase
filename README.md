<h1 align="center">
  <a href="#">
    <img src="https://cdn2.iconfinder.com/data/icons/harry-potter-solid-collection/60/36_-_Harry_Potter_-_Solid_-_Time_Turner-256.png" alt="phase" width="125px">
  </a>
  <br>
  phase
</h1>
<h3 align="center">Micro-store/change emitter</h3>
<br>

**phase** is a zero dependency micro-store/change emitter.

## Features

### It's extremely useful for:

- global stores
- local stores
- store change subscriptions

### It has:

- <1kb size
- zero dependencies
- advanced path access/subscriptions
- plugins (ex. react)

## Installation

### npm

`npm i @klintm/phase`

## Usage

```js
import Phase from "@klintm/phase";

// To create a new store an initial state object & an optional function returning actions are passed
const phase = Phase(
  {
    people: [
      {
        name: "Anon",
        age: 123
      }
    ],
    count: 0
  },
  state => ({
    increment: () => state.set("count", state("count") + 1),
    decrement: () => state.set("count", state("count") - 1)
  })
);

phase.set("count", 5); // Sets count to 5
phase.set("people[0].age", 25); // Path accessors for both objects and arrays
phase.set("people[0]['name']"); // Strings can be used as well

const ageChanged = (oldAge, newAge) => console.log(`You are: ${newAge}`);
phase.on("people[0].age", ageChanged); // Subscribe to changes
phase.off(ageChanged); // Remove subscriptions

phase.actions.increment(); // Action dispatches
```
