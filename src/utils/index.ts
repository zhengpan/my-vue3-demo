

export const setStorage = (key: string, data:any) => {
  sessionStorage.setItem(key,JSON.stringify(data))
}

export const getStorage = (key: string) => {
  const value = sessionStorage.getItem(key);
  return JSON.parse(value as string)
}

export const durationFormatter = (time:number) => {
  if (!time) return { ss: 0 };
      let t = time;
      const ss = t % 60;
      t = (t - ss) / 60;
      if (t < 1) return { ss };
      const mm = t % 60;
      t = (t - mm) / 60;
      if (t < 1) return { mm, ss };
      const hh = t % 24;
      t = (t - hh) / 24;
      if (t < 1) return { hh, mm, ss };
      const dd = t;
      return { dd, hh, mm, ss };
}