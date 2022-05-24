import { useDisclosure } from "@chakra-ui/react";
import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from "react";
import { InfoModalData } from "../models/infoModalData";

export interface InfoContextValue {
  isOpen: boolean;
  infoData: InfoModalData,
  onOpen: (infoData: InfoModalData) => void;
  onClose: () => void
}

export const InfoContext = createContext<InfoContextValue>({} as InfoContextValue);

export function useInfo() {
  return useContext(InfoContext);
}

export function InfoProvider({ children }: PropsWithChildren<{}>) {
  const { isOpen, onOpen: _onOpen, onClose: _onClose } = useDisclosure();
  const [ infoData, setInfoData ] = useState({} as InfoModalData);

  const onOpen = useCallback((infoData: InfoModalData) => {
    if (infoData) {
      _onOpen();
      setInfoData(infoData);
    }
  }, [_onOpen]);

  const onClose = useCallback(() => {
    _onClose();
  }, [_onClose]);

  const value = useMemo<InfoContextValue>(
    () => ({
      isOpen,
      infoData,
      onOpen,
      onClose
    }),
    [isOpen, infoData, onOpen, onClose]
  );

  return <InfoContext.Provider value={value}>{children}</InfoContext.Provider>;
}