if (
  typeof localStorage === "undefined" ||
  typeof localStorage.getItem === "undefined"
) {
  global.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    key: () => null,
    length: 0,
  } as Storage;
}
