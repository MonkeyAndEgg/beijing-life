import { useDisclosure } from "@chakra-ui/react";
import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from "react";
import { Item } from "../models/item";

export interface TransactionContextValue {
  isOpen: boolean;
  isBuy: boolean;
  item: Item; // transaction item
  onOpen: (item: Item, isUser: boolean) => void;
  onClose: () => void
}

export const TransactionContext = createContext<TransactionContextValue>({} as TransactionContextValue);

export function useTransaction() {
  return useContext(TransactionContext);
}

export function TransactionProvider({ children }: PropsWithChildren<{}>) {
  const { isOpen, onOpen: _onOpen, onClose: _onClose } = useDisclosure();
  const [ item, setItem ] = useState({} as Item);
  const [ isBuy, setIsBuy ] = useState(true);

  const onOpen = useCallback((item: Item, isUser: boolean) => {
    _onOpen();
    setItem(item);
    setIsBuy(!isUser);
  }, [_onOpen, setItem, setIsBuy]);

  const onClose = useCallback(() => {
    _onClose();
  }, [_onClose]);

  const value = useMemo<TransactionContextValue>(
    () => ({
      isOpen,
      isBuy,
      item,
      onOpen,
      onClose
    }),
    [isOpen, isBuy, item, onOpen, onClose]
  );

  return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>;
}
