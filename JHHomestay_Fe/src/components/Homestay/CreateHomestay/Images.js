import {useState} from "react";
import { XIcon } from "@heroicons/react/outline";

function Images(props) {
    const [images, setImages] = useState([]);
    const setImageSelected=props.imageProps;
    const [oldImages, setOldImages]=useState(props.oldImages);
    const setNewOldImages = props.setNewOldImages;
    const imagesState=props.imagesState

    const viewImage = (files) => {
        if (files) {
            let imagesData = [];
            for(let i = 0; i < files.length; i++) {
                imagesData.push(URL.createObjectURL(files[i]))
            }
            setImages(imagesData);
            console.log("image",imagesData)
        }
    }

    const removeOldImage =(image) =>{
        let images = oldImages.filter((o) => {
            return o.url !== image.url;
        })
        setOldImages(images);
        setNewOldImages(images);
    }

    return (
        <div className="p-2 mt-5 border-t ">
            <h1 className="font-bold h-2 mb-2 text-gray-600 text-sm leading-8 uppercase"> 
                Thêm ảnh
            </h1>

            <input
                type="file"
                name="files"
                className="p-3"
                onChange={(e)=> {
                    viewImage(e.target.files);
                    setImageSelected(e.target.files)
                }}
                multiple={true}
            />
            {oldImages && oldImages.length ? (
                <div className="grid grid-cols-2 gap-3">
                    <div> 
                        <label className="font-semibold uppercase text-xs justify-center"> ẢNH CŨ </label>
                        <div className="grid grid-cols-2 gap-3 relative border-2 border-dashed rounded-md">
                        
                            {oldImages && oldImages.map((image, index) => {
                                return (
                                    <div className="flex items-center">
                                        <img 
                                            className="h-24 w-full 2xl:h-32 rounded-md overflow-x-hidden overflow-y-hidden m-1" 
                                            key={index} 
                                            id={index} 
                                            src={`http://localhost:8000${image.url}`} 
                                            alt="images of homestays"
                                        />
                                        
                                        <button
                                        type="reset"
                                        className="z-30 absolute place-items-end"
                                        onClick={(e)=>{
                                            removeOldImage(image)
                                            }
                                        }
                                    >
                                        <XIcon className="w-7 h-7 mb-20 2xl:mb-28 rounded-full bg-opacity-10 hover:bg-black hover:bg-opacity-20 p-1 text-white" />
                                    </button>
                                    </div>
                                    )
                            })}
                        </div>
                    </div>
                    <div>
                        <label className="font-semibold uppercase text-xs justify-center">ẢNH MỚI</label>
                        <div className="grid grid-cols-2 gap-3 relative border-2 border-dashed rounded-md">
                            {(images.length || 0 ) && images.map((image, index) => {
                                return (
                                    <div className="flex items-center">
                                        <img className="h-24 w-full 2xl:h-32 rounded-md overflow-x-hidden overflow-y-hidden m-1"
                                            key={index} 
                                            id={index} 
                                            src={image} 
                                            alt="images of homestays"
                                        />
                                </div>)
                            })}
                        </div>
                    </div>
                </div>
                ) : (
                <div className="grid grid-cols-4 gap-3 relative border-2 border-dashed rounded-md">
                    {(images.length || 0 ) && images.map((image, index) => {
                        return (
                            <div className="flex items-center">
                                <img className="h-24 w-full 2xl:h-32 rounded-md overflow-x-hidden overflow-y-hidden m-1"
                                    key={index} 
                                    id={index} 
                                    src={image} 
                                    alt="images of homestays"
                                />
                        </div>)
                    })}
                </div>
            )}
        </div> 
        
    )
}
export default Images
