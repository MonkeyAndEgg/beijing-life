import { useDisclosure } from "@chakra-ui/react";
import { createContext, PropsWithChildren, useCallback, useContext, useMemo } from "react";

export interface TransactionContextValue {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void
}

export const TransactionContext = createContext<TransactionContextValue>({} as TransactionContextValue);

export function useTransaction() {
  return useContext(TransactionContext);
}

export function TransactionProvider({ children }: PropsWithChildren<{}>) {
  const { isOpen, onOpen: _onOpen, onClose: _onClose } = useDisclosure();

  const onOpen = useCallback(() => {
    _onOpen();
  }, [_onOpen]);

  const onClose = useCallback(() => {
    _onClose();
  }, [_onClose]);

  const value = useMemo<TransactionContextValue>(
    () => ({
      isOpen,
      onOpen,
      onClose
    }),
    [isOpen, onOpen, onClose]
  );

  return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>;
}
