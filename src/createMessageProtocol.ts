import { z } from "zod";
import { EventsConfigToDiscriminatedUnion } from "./types";

export const createMessageProtocol = <
  T extends Record<string, z.ZodRawShape>,
  EventsAsDiscoUnion extends { type: string } = EventsConfigToDiscriminatedUnion<T>
>(opts: {
  events: T;
}) => {
  return {
    createHandler: (sender: (event: EventsAsDiscoUnion) => void) => {
      return (event: EventsAsDiscoUnion) => {
        const eventSchema = z.object({
          ...opts.events[event.type],
          type: z.literal(event.type),
        });

        sender(eventSchema.parse(event) as EventsAsDiscoUnion);
      };
    },
  };
};
