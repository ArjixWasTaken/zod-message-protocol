# `zod-message-protocol`

Gives you type-safe message passing (using Zod!) between two different environments.

```ts
// protocol.ts

const protocol = createMessageProtocol({
  events: {
    LOG_IN: {
      username: z.string(),
      password: z.string(),
    },
    LOG_OUT: {},
  },
});

// iframe.ts

// Type safe sender!
const sendToParent = protocol.createHandler(window.parent.postMessage);

// Type safe receiver!
const handleParentEvent = protocol.createHandler((event) => {
  console.log(event);
});

window.addEventListener("message", (event) => {
  handleParentEvent(event.data);
});
```

## Installation

`pnpm add @total-typescript/zod-message-protocol`

`npm i @total-typescript/zod-message-protocol`

`yarn add @total-typescript/zod-message-protocol`

## Usage
