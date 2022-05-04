import type { TNetworkState } from "common/types/network";
import { createContext, useContext } from "react";
import { NETWORK_STATE } from "./../../common/constants/network";
import type { TTask, TaskComment, TUser } from "./types";
export const initialAppContextState: TAppContextState = {
  auth: {
    isAuth: false,
    error: null,
    loading: NETWORK_STATE.RESOLVED,
  },
  tasks: [],
  optionsList: [],
  comments: [],
};

export type TAppContextState = {
  auth: {
    isAuth: boolean;
    error: string | null;
    loading: TNetworkState;
  };
  tasks: TTask[];
  optionsList: TUser[];
  comments: TaskComment[];
};

export type TAppContextActions = {
  handleLogIn: (data: { email: string; password: string }) => void;
  handleRegistration: (data: {
    name: string;
    email: string;
    password: string;
  }) => void;
  handleLogOut: () => void;
  setTask: (title: string, description: string) => void;
  getTasks: () => void;
  deleteTask: (id: string) => void;
  sendComment: (comment: string, taskId: string) => void;
  getComments: (taskId: string) => void;
  changeTaskParam: (taskId: string, changes: Record<string, any>) => void;
  getUsersOptions: (name: string) => void;
};

type TAppContext = {
  state: TAppContextState;
  actions: TAppContextActions;
};

export const AppContext = createContext<TAppContext>({
  state: initialAppContextState,
  actions: {
    setTask: () => null,
    getTasks: () => null,
    handleLogIn: () => null,
    handleRegistration: () => null,
    handleLogOut: () => null,
    deleteTask: () => null,
    sendComment: (comment: string, taskId: string) => null,
    getComments: (taskId: string) => null,
    changeTaskParam: (taskId: string, changes: Record<string, any>) => null,
    getUsersOptions: (name: string) => null,
  },
});

const useAppContext = () => {
  return useContext(AppContext);
};

export default useAppContext;
