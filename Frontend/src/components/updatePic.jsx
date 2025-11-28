import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { useAuth } from "../context/User";

export default function UpdatePic({ onBack }) {
    const defaulImages = [
        "https://cdn-icons-png.flaticon.com/512/4140/4140041.png",
        "https://cdn-icons-png.flaticon.com/512/4140/4140043.png",
        "https://cdn-icons-png.flaticon.com/512/4140/4140045.png",
        "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
        "https://cdn-icons-png.flaticon.com/512/4140/4140049.png"
    ];
    const [preview, setPreview] = useState(null);
    const[auth,setAuth] = useAuth()
    const [selected, setSelected] = useState(null);
    const fileRef = useRef(null);
    const [loading, setLoading]= useState(false)

    const handleDimg = (img) => {
        setSelected({type:"img" ,value: img})
        setPreview(img)
    }
    const handleImg = (e) => {
        const file = e.target.files?.[0];
        if(file){
            setSelected({type:"file" , value: file})
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleConfirm = async () =>{
        try {
            if(!selected) return;
            setLoading(true);
            let res;

            if(selected.type === "img"){
                 res = await axios.put("http://localhost:5000/user/updateprofile", 
                    {imageUrl: selected.value},
                    {
                        headers: {Authorization: `Bearer ${auth.token}`},
                        withCredentials: true
                    }
                )
            }

            else if(selected.type === "file"){
                const form = new FormData()
                form.append("image" , selected.value)
                 res = await axios.put("http://localhost:5000/user/updateprofile", 
                    form,
                    {
                        headers: {Authorization:`Bearer ${auth.token}`,"Content-Type": "multipart/form-data"},
                        withCredentials: true
                    }
                )
            }    
            setAuth({
                ...auth,
                user:{...auth.user, profilePic:res.data.user.profilePic}
            })
            localStorage.setItem("auth" , JSON.stringify({
                ...auth,
                user:{...auth.user, profilePic:res.data.user.profilePic}
            }))
            setPreview(null)
            setSelected(null)
            toast.success("Profile picture updated");
            onBack()
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("Error in updating profile picture")
        }
    }

    const handleCancel = ()=> {
        setPreview(null);
    }
    return (
        <div>
            <button
                onClick={onBack}
                className="absolute left-3 top-3 text-gray-400 hover:text-gray-200"
            >
                <FaArrowLeft />
            </button>

            <p className="mt-4 text-lg font-medium text-gray-200">Select your profile picture :</p>
            <div className="mt-4">
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {defaulImages.map((img, index) => (
                        <img onClick={() => handleDimg(img)} key={index} src={img} alt={`avatar-${index}`} className="w-12 h-12 rounded-full object-cover border-2 border-gray-700 hover:border-indigo-500 transition-all duration-200 cursor-pointer" />
                    ))}
                </div>
                {preview && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
                        <div className="bg-gray-900 p-6 rounded-2xl flex flex-col items-center gap-4 shadow-xl">
                            <h3 className="text-lg font-semibold">Preview</h3>
                            <img
                                src={preview}
                                alt="preview"
                                className="w-44 h-44 rounded-full object-cover border-2 border-indigo-500"
                            />
                            <div className="flex gap-4 mt-4">
                                <button
                                    disabled={loading}
                                    onClick={handleConfirm}
                                    className="bg-indigo-600 px-4 py-2 rounded-lg text-white hover:bg-indigo-500 transition-colors"
                                >
                                    {loading ? "Uploading.." : "Yes"}
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="bg-gray-700 px-4 py-2 rounded-lg text-white hover:bg-gray-600 transition-colors"
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex flex-col gap-2">
                    <p className="text-gray-400">Or select from your gallery :</p>
                    <input onChange={handleImg} ref={fileRef} type="file" name="image" accept="image/*" hidden />
                    <button onClick={() => fileRef.current.click()} className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition-colors duration-200 text-white px-4 py-2 rounded-lg shadow-lg">
                        <FaPlus />
                        Upload
                    </button>
                </div>
            </div>
        </div>
    )
}