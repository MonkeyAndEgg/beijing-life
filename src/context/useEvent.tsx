import { useDisclosure } from "@chakra-ui/react";
import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from "react";
import { EventModalData } from "../models/eventModalData";

export interface EventContextValue {
  isOpen: boolean;
  events: EventModalData[];
  onOpen: (events: EventModalData[]) => void;
  onClose: () => void
}

export const EventContext = createContext<EventContextValue>({} as EventContextValue);

export function useEvent() {
  return useContext(EventContext);
}

export function EventProvider({ children }: PropsWithChildren<{}>) {
  const { isOpen, onOpen: _onOpen, onClose: _onClose } = useDisclosure();
  const [ events, setEvents ] = useState([] as EventModalData[]);

  const onOpen = useCallback((currentEvents: EventModalData[]) => {
    _onOpen();
    setEvents(currentEvents);
  }, [_onOpen]);

  const onClose = useCallback(() => {
    _onClose();
  }, [_onClose]);

  const value = useMemo<EventContextValue>(
    () => ({
      isOpen,
      events,
      onOpen,
      onClose
    }),
    [isOpen, events, onOpen, onClose]
  );

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
}
