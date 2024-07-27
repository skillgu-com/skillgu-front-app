import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { useSessionStorage } from "src/hooks/useSessionStorage";
import { useViewportSize } from "src/hooks/useViewportSize";

interface LayoutContextType {
  isInitialized: boolean;
  isSidebarOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleSwitch: () => void;
}

const defaultContextValue: LayoutContextType = {
  isInitialized: false,
  isSidebarOpen: false,
  handleOpen: () => {},
  handleClose: () => {},
  handleSwitch: () => {},
};

const LayoutContext = createContext<LayoutContextType>(defaultContextValue);

interface LayoutProviderProps {
  children: ReactNode;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const [value, setValue] = useSessionStorage<boolean>('layout-sidebar-open', {
    defaultValue: false,
});
  // const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const isSidebarOpen = !!value
  const handleOpen = useCallback(() => setValue(true), [setValue]);
  const handleClose = () => setValue(false);
  const handleSwitch = () => setValue(!value);

  const { width } = useViewportSize();
  const widthRef = useRef<number>(0);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (width && width > 1200 && width !== widthRef.current) {
      handleOpen();
      widthRef.current = width;
    }
    setIsInitialized(true);
  }, [handleOpen, width]);

  return (
    <LayoutContext.Provider
      value={{ isInitialized, isSidebarOpen, handleOpen, handleClose, handleSwitch }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);
