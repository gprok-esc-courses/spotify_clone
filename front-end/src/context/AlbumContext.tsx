import React, { useContext, useReducer } from "react";
import {
  albumDispatchContext,
  IAlbumInfoContext,
  IChildrenProvider,
  TAlbumAction,
} from "../Model/models";

// INterface for album context default state
interface IAlbumStateContext {
  albums: Array<IAlbumInfoContext>;
}

// Default state fot the user context
const defaultState: IAlbumStateContext = {
  albums: [
    {
      id: undefined,
      name: undefined,
      release_date: undefined,
      genre: undefined,
    },
  ],
};

const AlbumStateContext = React.createContext<IAlbumStateContext | undefined>(
  undefined
);

AlbumStateContext.displayName = "AlbumStateContext";

const AlbumDispatchContext = React.createContext<
  albumDispatchContext | undefined
>(undefined);

// Reducer function
const appReducer = (state: IAlbumStateContext, action: TAlbumAction) => {
  switch (action.type) {
    case "FETCH_ALL_ALBUMS":      
      return { ...state, albums: action.albums };
    default:
      return { ...state };
  }
};
// Context Provider for the album
const AlbumContextProvider = ({ children }: IChildrenProvider) => {
  const [albumState, albumDispatch] = useReducer(appReducer, defaultState);

  return (
    <AlbumStateContext.Provider value={albumState}>
      <AlbumDispatchContext.Provider value={albumDispatch}>
        {children}
      </AlbumDispatchContext.Provider>
    </AlbumStateContext.Provider>
  );
};
// Pass the state of the albums
const useAlbumState = (): IAlbumStateContext => {
  const context = useContext(AlbumStateContext);
  if (context === undefined) {
    throw new Error("useAlbumState must be used within AlbumDispatchContext");
  }
  return context;
};

// Function to use the albumDispatch
const useAlbumDispatch = (): albumDispatchContext => {
  const context = useContext(AlbumDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useAlbumDispatch must be used within AlbumDispatchContext"
    );
  }
  return context;
};

export { AlbumContextProvider, useAlbumState, useAlbumDispatch };
