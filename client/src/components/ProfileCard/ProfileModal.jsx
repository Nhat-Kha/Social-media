import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../redux/actions/UploadAction";
import { updateUser } from "../../redux/actions/UserAction";
import { apiUploadImages } from "../../api/UploadImage";

export default function ProfileModal({ modalOpened, setModalOpened, data }) {
  const { password, ...other } = data;

  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const param = useParams();

  const { user } = useSelector((state) => state.auth.authData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      let images = "";
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;

      data.append("name", fileName);
      data.append("file", profileImage);
      data.append("upload_preset", "social");
      data.append("folder", "social-media");

      let response = await apiUploadImages(data);
      if (response.status === 200) images = response.data?.secure_url;
      UserData.profilePicture = images;

      try {
        dispatch(uploadImage(images));
      } catch (err) {
        console.log(err);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    // console.log(profileImage);
    dispatch(updateUser(param.id, UserData));
    setModalOpened(false);
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="" onSubmit={handleSubmit}>
        <h3>
          Your Info{" "}
          <span className="font-semibold uppercase">{user.username}</span>
        </h3>
        3
        <form class="p-4 md:p-5">
          <div class="grid gap-4 mb-4 grid-cols-2">
            <div class="col-span-2 sm:col-span-1">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                First Name
              </label>
              <input
                type="text"
                placeholder="First Name"
                name="firstname"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                value={formData.firstname}
                onChange={handleChange}
              />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last Name"
                name="lastname"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                value={formData.lastname}
                onChange={handleChange}
              />
            </div>
            <div class="col-span-2">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Work At
              </label>
              <input
                type="text"
                placeholder="Works At"
                name="worksAt"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                value={formData.worksAt}
                onChange={handleChange}
              />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Live In
              </label>
              <input
                type="text"
                placeholder="Live In"
                name="livesin"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                value={formData.livesin}
                onChange={handleChange}
              />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Country
              </label>
              <input
                type="text"
                placeholder="Country"
                name="country"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
            <div class="col-span-2">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Relationship
              </label>
              <input
                type="text"
                placeholder="Relationship"
                name="relationship"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                value={formData.relationship}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
        <div className="flex pl-5">
          <div className="flex mb-12 gap-3 relative">
            <div>
              <div className="w-full">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Image avatar
                </label>
                <div className="flex gap-4 items-center">
                  {user.profilePicture ? (
                    <div className="relative w-1/3 h-1/3 ">
                      <img
                        src={
                          Array.isArray(user.profilePicture)
                            ? user.profilePicture[0]
                            : user.profilePicture
                        }
                        alt="preview"
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  ) : (
                    <p>No images selected</p>
                  )}
                </div>
              </div>

              <div className="pt-[0.4rem]">
                <div className="mb-3 w-96">
                  <input
                    className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid
                    border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700
                    transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none
                    file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem]
                    file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px]
                    file:[margin-inline-end:0.75rem] hover:file:bg-neutral-500 hover:file:text-white focus:border-primary focus:text-neutral-700
                    focus:shadow-te-primary focus:outline-none "
                    type="file"
                    name="profileImage"
                    multiple
                    onChange={onImageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase
          text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85]
          focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="submit"
        >
          Update
        </button>
      </form>
    </Modal>
  );
}

// import React, { useState } from "react";
// import { Modal, useMantineTheme } from "@mantine/core";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { uploadImage } from "../../redux/actions/UploadAction";
// import { updateUser } from "../../redux/actions/UserAction";
// import { apiUploadImages } from "../../api/UploadImage";

// export default function ProfileModal({ modalOpened, setModalOpened, data }) {
//   const { password, ...other } = data;

//   const [formData, setFormData] = useState(other);
//   const [profileImage, setProfileImage] = useState(null);
//   const [coverImage, setCoverImage] = useState(null);

//   const theme = useMantineTheme();
//   const dispatch = useDispatch();
//   const param = useParams();

//   const { user } = useSelector((state) => state.auth.authData);
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const onImageChange = (event) => {
//     if (event.target.files && event.target.files[0]) {
//       let img = event.target.files[0];
//       event.target.name === "profileImage"
//         ? setProfileImage(img)
//         : setCoverImage(img);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let UserData = formData;
//     if (profileImage) {
//       let images = "";
//       const data = new FormData();
//       const fileName = Date.now() + profileImage.name;

//       data.append("name", fileName);
//       data.append("file", profileImage);
//       data.append("upload_preset", "social");
//       data.append("folder", "social-media");

//       let response = await apiUploadImages(data);
//       if (response.status === 200) images = response.data?.secure_url;
//       UserData.profilePicture = images;

//       console.log("image", images);

//       try {
//         dispatch(uploadImage(images));
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     if (coverImage) {
//       const data = new FormData();
//       const fileName = Date.now() + coverImage.name;
//       data.append("name", fileName);
//       data.append("file", coverImage);
//       UserData.coverPicture = fileName;
//       try {
//         dispatch(uploadImage(data));
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     console.log(profileImage);
//     dispatch(updateUser(param.id, UserData));
//     setModalOpened(false);
//   };

//   return (
//     <Modal
//       overlayColor={
//         theme.colorScheme === "dark"
//           ? theme.colors.dark[9]
//           : theme.colors.gray[2]
//       }
//       overlayOpacity={0.55}
//       overlayBlur={3}
//       size="55%"
//       opened={modalOpened}
//       onClose={() => setModalOpened(false)}
//     >
//       <form className="" onSubmit={handleSubmit}>
//         <h3>
//           Your Info{" "}
//           <span className="font-semibold uppercase">{user.username}</span>
//         </h3>
//         <div>
//           <input
//             value={formData.firstname}
//             onChange={handleChange}
//             type="text"
//             placeholder="First Name"
//             name="firstname"
//             className="infoInput"
//           />
//           <input
//             value={formData.lastname}
//             onChange={handleChange}
//             type="text"
//             placeholder="Last Name"
//             name="lastname"
//             className="infoInput"
//           />
//         </div>

//         <div>
//           <input
//             value={formData.worksAt}
//             onChange={handleChange}
//             type="text"
//             placeholder="Works at"
//             name="worksAt"
//             className="infoInput"
//           />
//         </div>

//         <div>
//           <input
//             value={formData.livesin}
//             onChange={handleChange}
//             type="text"
//             placeholder="Lives in"
//             name="livesin"
//             className="infoInput"
//           />
//           <input
//             value={formData.country}
//             onChange={handleChange}
//             type="text"
//             placeholder="Country"
//             name="country"
//             className="infoInput"
//           />
//         </div>

//         <div>
//           <input
//             value={formData.relationship}
//             onChange={handleChange}
//             type="text"
//             className="infoInput"
//             placeholder="Relationship status"
//             name="relationship"
//           />
//         </div>

//         <div>
//           Profile image
//           <input type="file" name="profileImage" onChange={onImageChange} />
//           Cover image
//           <input type="file" name="coverImage" onChange={onImageChange} />
//         </div>

//         <button
//           className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase 
//           text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] 
//           focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//           type="submit"
//         >
//           Update
//         </button>
//       </form>
//     </Modal>
//   );
// }
