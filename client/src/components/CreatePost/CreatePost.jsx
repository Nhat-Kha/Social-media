import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../redux/actions/UploadAction";
import { apiUploadImages } from "../../api/UploadImage";

export default function CreatePost() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.authData);
  const { loading } = useSelector((state) => state.post.loading);

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const desc = useRef();
  const imageRef = useRef();

  const [image, setImage] = useState(null);
  const [textSearch, setTextSearch] = useState("");

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    //post data
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    // if there is an image with post
    if (image) {
      let images = "";
      const data = new FormData();
      const fileName = Date.now() + image.name;

      data.append("name", fileName);
      data.append("file", image);
      data.append("upload_preset", "social");
      data.append("folder", "social-media");

      let response = await apiUploadImages(data);
      if (response.status === 200) images = response.data?.secure_url;

      newPost.image = images;
      console.log(images);
      try {
        dispatch(uploadImage(images));
      } catch (err) {
        console.log(err);
      }
    }

    dispatch(uploadPost(newPost));
    resetShare();
  };

  const resetShare = () => {
    setImage(null);
    desc.current.value = "";
  };

  return (
    <>
      <form className="bg-white shadow rounded-lg mb-6 p-4">
        <input
          required
          name="message"
          placeholder="Type something..."
          ref={desc}
          className="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
        />
        <footer className="flex justify-between mt-2">
          <div className="flex gap-2">
            <span
              onClick={() => imageRef.current.click()}
              className="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white 
            bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer"
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="css-i6dzq1"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </span>
            <span className="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="css-i6dzq1"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </span>
            <span className="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="css-i6dzq1"
              >
                <polyline points="4 17 10 11 4 5"></polyline>
                <line x1="12" y1="19" x2="20" y2="19"></line>
              </svg>
            </span>
          </div>

          {textSearch === "" ? (
            <button
              className="flex items-center py-2 px-4 rounded-lg text-sm bg-blue-300 text-slate-100 hover:bg-blue-500 
            hover:text-white shadow-lg transition duration-300"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? "uploading" : "Send"}
              <svg
                className="ml-1"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          ) : (
            <button
              className="flex items-center py-2 px-4 rounded-lg text-sm bg-blue-500 
              text-white shadow-lg transition duration-300"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? "uploading" : "Send"}
              <svg
                className="ml-1"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          )}
          <div style={{ display: "none" }}>
            <input type="file" ref={imageRef} onChange={onImageChange} />
          </div>
        </footer>
        {image && (
          <div className="w-1/4">
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="rounded-lg"
            />
          </div>
        )}
      </form>
    </>
  );
}
