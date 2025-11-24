
import onlineUser from "./helper.js"

export const userCont = (socket , io) => {
    const uid = socket.userId;
    const set = onlineUser.get(uid) || new Set()
    set.add(socket.id)
    onlineUser.set(uid, set)

    console.log("user connected" , uid , socket.id)

   socket.on("disconnect", () => {
    const set = onlineUser.get(uid);
    if (set) {
      set.delete(socket.id);
      if (set.size === 0) onlineUser.delete(uid);
      else onlineUser.set(uid, set);
    }
    console.log("user disconnected", uid, socket.id);
  });
}