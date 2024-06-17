'use client'

import { FaImage } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { useRef, useState } from "react";
import Image from "next/image";
import Button from "./Button";

interface Props {
    onChange: (e: any) => void
}

const FileInput: React.FC<Props> = ({
    onChange,
}) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [drag, setDrag] = useState(false)
    const [error, setError] = useState("")
    const [file, setFile] = useState("")

    const handleDrag = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDrag(true)
        } else if (e.type === 'dragleave' || e.type === 'drop') {
            setDrag(false)
        }
    }

    const handleDrop = async (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.dataTransfer.files[0].size > 8*1024*1024) {
            setError("Fle must be less than 8MB")
            setDrag(false)
            return
        }
        if (e.dataTransfer.files.length > 1) {
            setError("Only one file at a time")
            setDrag(false)
            return
        }
        setDrag(false)
        setError("")
        const newFile = e.dataTransfer.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(newFile)
        reader.onload = (e) => {
            if (!e.target?.result) return
            const base64String = e.target?.result as string
            setFile(base64String)
            onChange(base64String)
        }
    }

    const handleChange = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        if (!e.target.files) return
        if (e.target.files.length > 1) {
            setError("Only one file at a time")
            setDrag(false)
            return
        }
        if (e.target.files[0].size > 8*1024*1024) {
            setError("Fle must be less than 8MB")
            setDrag(false)
            return
        }
        const newFile = e.target.files[0]

        const reader = new FileReader()
        reader.readAsDataURL(newFile)
        reader.onload = (e) => {
            if (!e.target?.result) return
            const base64String = e.target?.result as string
            setFile(base64String)
            onChange(base64String)
        }
        setDrag(false)
        setError("")
    }

    if (file) {
        return (
                <div className="w-full p-4 flex flex-col gap-2 items-center border-2 border-slate-300 rounded-2xl">
                    <p className="text-white">File Uploaded</p>
                    <Image
                    className="rounded-full"
                    src={file as string} alt="uploaded file" width={100} height={100} />
                    <Button isSmall actionLabel="Remove" className="w-max" secondary onClick={() => setFile("")}/>
                </div> 
        )
    }

    return ( 
        <div
        className="w-full h-[150px] border-2 flex flex-col justify-center items-center border-slate-300 rounded-2xl p-4">
            {
                 drag
                    ? <div className="border-2 border-dashed flex flex-col justify-center items-center border-slate-700 rounded-2xl p-2" 
                    onDrop={(e) => handleDrop(e)} onDragEnter={(e) => handleDrag(e)} onDragLeave={(e) => handleDrag(e)} onDragOver={(e) => handleDrag(e)} >
                        <FaChevronDown className="text-5xl text-white animate-bounce" />
                        <p className="text-white p-2">Drop the file here</p>
                    </div>
                    : <div className=" flex flex-col gap-2 justify-center items-center  rounded-2xl p-2" onDragEnter={(e) => handleDrag(e)} onDragLeave={(e) => handleDrag(e)} onDragOver={(e) => handleDrag(e)}>
                        <button
                            className="border-2 border-dashed flex flex-col justify-center items-center border-slate-700 rounded-2xl p-2"
                            onClick={() => inputRef.current?.click()}
                        >

                            <FaImage
                            
                            className="text-5xl text-white hover:scale-110 duration-300 spring-1" />
                        </button>
                        <div className="text-center">
                            <p className="text-white">Drag and drop the file here</p>
                            <p className="text-white">or click icon to upload</p>
                        </div>
                    </div>
            }
            {error && <p className="text-red-500">{error}</p>}
            <input ref={inputRef} type="file" hidden onChange={handleChange} accept="image/*"  />
        </div>
     );
}
 
export default FileInput;