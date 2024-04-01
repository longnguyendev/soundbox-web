import {
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface IAudio {
  url?: string;
  setUrl: Dispatch<SetStateAction<string | undefined>>;
}

const defaultvalue: IAudio = {
  setUrl: () => {},
};

const AudioContext = createContext<IAudio>(defaultvalue);

export const AudioProvider = ({ children }: PropsWithChildren) => {
  const [url, setUrl] = useState<string>();

  return (
    <AudioContext.Provider
      value={{
        url,
        setUrl,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
