const useLocalStorage = () => {
    const getLocalStorage = (name: string) => JSON.parse(localStorage.getItem(name) as string)
    const setLocalStorage = (name: string, value: Object) => localStorage.setItem(name, JSON.stringify(value))

    return { getLocalStorage, setLocalStorage };
}

export default useLocalStorage;