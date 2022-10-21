

export const setStorage = (key: string, data:any) => {
  sessionStorage.setItem(key,JSON.stringify(data))
}

export const getStorage = (key: string) => {
  const value = sessionStorage.getItem(key);
  return JSON.parse(value as string)
}