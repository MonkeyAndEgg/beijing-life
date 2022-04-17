import { useDisclosure } from "@chakra-ui/react";
import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from "react";
import { Item } from "../models/item";

export interface TransactionContextValue {
  isOpen: boolean;
  item: Item; // transaction item
  onOpen: (item: Item) => void;
  onClose: () => void
}

export const TransactionContext = createContext<TransactionContextValue>({} as TransactionContextValue);

export function useTransaction() {
  return useContext(TransactionContext);
}

export function TransactionProvider({ children }: PropsWithChildren<{}>) {
  const { isOpen, onOpen: _onOpen, onClose: _onClose } = useDisclosure();
  const [ item, setItem ] = useState({} as Item);

  const onOpen = useCallback((item) => {
    _onOpen();
    setItem(item);
  }, [_onOpen, setItem]);

  const onClose = useCallback(() => {
    _onClose();
  }, [_onClose]);

  const value = useMemo<TransactionContextValue>(
    () => ({
      isOpen,
      item,
      onOpen,
      onClose
    }),
    [isOpen, item, onOpen, onClose]
  );

  return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>;
}
