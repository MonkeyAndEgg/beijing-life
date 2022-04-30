import { useDisclosure } from "@chakra-ui/react";
import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from "react";
import { EventModalData } from "../models/eventModalData";

export interface EventContextValue {
  isOpen: boolean;
  event: EventModalData;
  onOpen: (event: EventModalData) => void;
  onClose: () => void
}

export const EventContext = createContext<EventContextValue>({} as EventContextValue);

export function useEvent() {
  return useContext(EventContext);
}

export function EventProvider({ children }: PropsWithChildren<{}>) {
  const { isOpen, onOpen: _onOpen, onClose: _onClose } = useDisclosure();
  const [ event, setEvent ] = useState({} as EventModalData);

  const onOpen = useCallback((currentEvent: EventModalData) => {
    _onOpen();
    setEvent(currentEvent);
  }, [_onOpen]);

  const onClose = useCallback(() => {
    _onClose();
  }, [_onClose]);

  const value = useMemo<EventContextValue>(
    () => ({
      isOpen,
      event,
      onOpen,
      onClose
    }),
    [isOpen, event, onOpen, onClose]
  );

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
}
