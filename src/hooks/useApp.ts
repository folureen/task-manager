import { initialAppContextState } from "providers/app-context/AppContext";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { equalTo, getDatabase, limitToFirst, onValue, orderByChild, push, query, ref, set, startAt, update } from "firebase/database";
import { FIREBASE_ERRORS } from "../common/constants/firebaseErrors";
import { NETWORK_STATE } from "../common/constants/network";
import { STATUS } from "common/constants/todo";

const useApp = () => {
  const [state, setState] = useState(initialAppContextState);

  const handleLogIn = useCallback(
    (data: { email: string; password: string }) => {
      const { email, password } = data;
      setState((prev) => ({
        ...prev,
        auth: { ...prev.auth, loading: NETWORK_STATE.PENDING },
      }));
      signInWithEmailAndPassword(getAuth(), email, password)
        .then((resolve) => {
          setState((prev) => ({ ...prev, auth: { ...prev.auth, isAuth: true, loading: NETWORK_STATE.RESOLVED } }));
        })
        .catch((error) => {
          const VALIDATION_ERRORS = [
            FIREBASE_ERRORS.USER_NOT_FOUND,
            FIREBASE_ERRORS.INVALID_PASSWORD,
            FIREBASE_ERRORS.TOO_MANY_REQUESTS,
          ];
          if (VALIDATION_ERRORS.includes(error.code)) {
            setState((prev) => ({
              ...prev,
              auth: {
                ...prev.auth,
                error: error.code,
                loading: NETWORK_STATE.REJECTED,
              },
            }));
          }
        });
    },
    []
  );

  const handleRegistration = useCallback(
    (data: { name: string; email: string; password: string }) => {
      const { name, email, password } = data;
      setState((prev) => ({
        ...prev,
        auth: { ...prev.auth, loading: NETWORK_STATE.PENDING },
      }));
      createUserWithEmailAndPassword(getAuth(), email, password)
        .then((resolve: UserCredential) => {
          updateProfile(resolve.user, { displayName: name });

          const db = getDatabase();
          const usersListRef = ref(db, `users`);
          const newUserRef = push(usersListRef);
          set(newUserRef, {
            name: name,
            email: email,
            createdAt: +new Date(),
            id: newUserRef.key
          });

          setState((prev) => ({
            ...prev,
            auth: {
              ...prev.auth,
              error: null,
              isAuth: true,
              loading: NETWORK_STATE.RESOLVED,
            },
          }));
        })
        .catch((error) => {
          setState((prev) => ({
            ...prev,
            auth: {
              ...prev.auth,
              error: error.code,
              loading: NETWORK_STATE.REJECTED,
            },
          }));
        });
    },
    []
  );

  const handleLogOut = useCallback(() => {
    getAuth().signOut();
    setState(initialAppContextState);
  }, [])


  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setState((prev) => ({
          ...prev,
          auth: { ...prev.auth, isAuth: true },
        }));
      } else {
        setState((prev) => ({
          ...prev,
          auth: { ...prev.auth, isAuth: false },
        }));
      }
    });
  }, [])

  const setTask = useCallback((title: string, description: string) => {
    const db = getDatabase();
    const taskListRef = ref(db, `tasks/`);
    const newTaskRef = push(taskListRef);
    set(newTaskRef, {
      title: title,
      description: description,
      status: STATUS.IN_PROGRESS,
      createdAt: +new Date(),
      createdBy: getAuth().currentUser?.uid,
      assignId: getAuth().currentUser?.uid,
      assignName: getAuth().currentUser?.displayName,
      id: newTaskRef.key
    });
  }, [])

  const getTasks = useCallback(async () => {
    const db = getDatabase();
    const tasksRef = ref(db, `tasks`);
    const getFilteredTasksQuery = query(tasksRef, orderByChild("assignId"), equalTo(getAuth().currentUser?.uid as string))
    onValue(getFilteredTasksQuery, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        setState(prev => ({ ...prev, tasks: Object.values(data) }))
      }
    });
  }, [])

  const deleteTask = useCallback((id: string) => {
    const db = getDatabase();
    const tasksRef = ref(db, `tasks/${id}`)
    set(tasksRef, null)
    getTasks();
  }, [getTasks])

  const sendComment = useCallback((comment: string, taskId: string) => {
    const db = getDatabase();
    const taskListRef = ref(db, `comments/${taskId}`);
    const newCommentRef = push(taskListRef);
    set(newCommentRef, {
      commentText: comment,
      id: newCommentRef.key,
      userId: getAuth().currentUser?.uid,
      timestamp: +new Date(),
      name: getAuth().currentUser?.displayName,
    });
  }, [])

  const getComments = useCallback((taskId: string) => {
    const db = getDatabase();
    const starCountRef = ref(db, `comments/${taskId}`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        setState(prev => ({ ...prev, comments: Object.values(data) }))
      }
    });
  }, [])

  const changeTaskParam = useCallback((taskId: string, changes: Record<string, any>) => {
    const db = getDatabase();
    const task = ref(db, `tasks/${taskId}`);
    update(task, {
      ...changes
    })
  }, [])

  const getUserInfoById = useCallback((userId: string) => {
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        return Object.values(data);
      }
    });
  }, [])

  const getUsersOptions = useCallback((name: string) => {
    const db = getDatabase();
    const userRef = ref(db, `users`);
    const getFilteredUsersQuery = query(userRef, limitToFirst(5), orderByChild("name"), startAt(name))
    onValue(getFilteredUsersQuery, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        setState(prev => ({ ...prev, optionsList: Object.values(data) }))
      }
    });
  }, [])

  const actions = useMemo(
    () => ({
      handleLogIn,
      handleRegistration,
      handleLogOut,
      setTask,
      getTasks,
      deleteTask,
      sendComment,
      getComments,
      changeTaskParam,
      getUserInfoById,
      getUsersOptions,
    }),
    [handleLogIn, handleRegistration, handleLogOut, setTask, getTasks, deleteTask, sendComment, getComments, changeTaskParam, getUserInfoById, getUsersOptions]
  );

  return useMemo(() => ({ state, actions }), [actions, state]);
};

export default useApp;
