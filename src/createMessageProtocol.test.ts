import { describe, expect, it, vitest } from "vitest";
import { z } from "zod";
import { createMessageProtocol } from "./createMessageProtocol";

const messageProtocol = createMessageProtocol({
  events: {
    LOG_IN: {
      username: z.string(),
      password: z.string(),
    },
    LOG_OUT: {
      type: z.string(),
    },
  },
});

describe("createMessageProtocol", () => {
  it("Should error if a handled message does NOT match an event", () => {
    const testSender = vitest.fn();
    const sender = messageProtocol.createHandler(testSender);

    expect(() =>
      // @ts-expect-error
      sender({
        type: "LOG_IN",
      })
    ).toThrow();

    expect(testSender).not.toHaveBeenCalled();
  });

  it("Should pass if a handled message matches an event", () => {
    const testSender = vitest.fn();
    const sender = messageProtocol.createHandler(testSender);

    sender({
      type: "LOG_IN",
      password: "password",
      username: "username",
    });

    expect(testSender).toHaveBeenCalledWith({
      type: "LOG_IN",
      password: "password",
      username: "username",
    });

    expect(testSender).toHaveBeenCalledOnce();
  });
});
