import { get, set, parsePath, isPlainObj } from "./utils";

const Phase = (state, getActions) => {
  getActions = typeof getActions === "function" ? getActions : () => ({});
  state = isPlainObj(state) ? state : {};

  const listeners = [];

  const phase = path => get(state, path);
  const setter = (path, val) => {
    const old = phase(path);
    set(state, path, val);
    notifyListeners(path, old, val);
  };
  const addListener = (path, l) => {
    const paths = Array.isArray(path) ? path : [path];
    l.paths = paths.map(p => parsePath(p).join());
    listeners.push(l);
  };
  const removeListener = l => listeners.splice(listeners.indexOf(l) >>> 0, 1);
  const notifyListeners = (path, old, val) => {
    const pathStr = parsePath(path).join();
    listeners.forEach(
      l =>
        (l.paths.includes("*") || l.paths.some(p => pathStr.startsWith(p))) &&
        l(old, val)
    );
  };

  phase.on = addListener;
  phase.off = removeListener;
  phase.set = setter;
  phase.actions = getActions(phase);

  return phase;
};

export default Phase;
