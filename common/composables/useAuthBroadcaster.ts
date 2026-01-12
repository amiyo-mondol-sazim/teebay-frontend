const senderId = crypto.randomUUID();

export function useAuthBroadcaster() {
  const authBroadcastChannel = new BroadcastChannel('auth');

  function broadcastLogin() {
    authBroadcastChannel.postMessage({ type: 'login', senderId });
  }

  function broadcastLogout() {
    authBroadcastChannel.postMessage({ type: 'logout', senderId });
  }

  function onLogout(callback: () => void, { allowSelf = false } = {}) {
    const handler = (event: MessageEvent<{ type: string; senderId: string }>) => {
      if (event.data?.type === 'logout' && (allowSelf || event.data.senderId !== senderId)) {
        callback();
      }
    };
    authBroadcastChannel.addEventListener('message', handler);
    return () => authBroadcastChannel.removeEventListener('message', handler);
  }

  function onLogin(callback: () => void, { allowSelf = false } = {}) {
    const handler = (event: MessageEvent<{ type: string; senderId: string }>) => {
      if (event.data?.type === 'login' && (allowSelf || event.data.senderId !== senderId)) {
        callback();
      }
    };
    authBroadcastChannel.addEventListener('message', handler);
    return () => authBroadcastChannel.removeEventListener('message', handler);
  }

  return {
    broadcastLogout,
    broadcastLogin,
    onLogout,
    onLogin,
  };
}
