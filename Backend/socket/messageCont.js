import Message from "../models/message.js";
import onlineUser from "./helper.js"

export const messageCont = (socket , io) => {
    const uid = socket.userId;

    socket.on("send-message" , async (data , ack) => {
        try {
            const message = await Message.create({
                from: uid,
                to: data.to,
                text: data.text || "",
                image: data.imageUrl || null,
            })

            const receiverSocket = onlineUser.get(data.to);
            if(receiverSocket){
                for(const sid of receiverSocket){
                    io.to(sid).emit("recieve-message" ,message);
                }
            }
            if(ack){
                ack({
                    ok: true,
                    message
                })
            }
        } catch (error) {
            console.log("send-message error" , error);
            if (ack) ack({ok: false})
        }
    })

    socket.on("typing" , ({to}) => {
        const receiverSockets = onlineUser.get(to);
        if(receiverSockets){
            for (const sid of receiverSockets){
                io.to(to).emit("typing" ,{from: uid})
            }
        } 
    })
}