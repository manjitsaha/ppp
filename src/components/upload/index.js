// import React from 'react';
// import ImagePreview from 'assets/images/upload.jpg';

// import { CancelOutlined, AddCircleOutlined } from '@mui/icons-material';

// const ImageUpload = (props) => {
//     const hiddenFileInput = React.useRef();
//     const [files, setFiles] = React.useState(null);
//     const [imagePreviewUrls, setImagePreviewUrls] = React.useState([ImagePreview]);

//     const onFileChange = (e) => {
//         e.preventDefault();
//         const files = e.target.files;
//         for (const file in Object.values(files)) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 console.log(reader.result);
//                 const fileArr = imagePreviewUrls.push(reader.result);
//                 setImagePreviewUrls(fileArr);
//             };
//             reader.readAsDataURL(file);
//         }
//         setFiles(files);
//     };

//     const handleClick = () => {
//         hiddenFileInput.current.click();
//     };

//     const setImage = (file) => {
//         reader.onloadend = () => reader.result;
//         return reader.readAsDataURL(file);
//     };

//     return (
//         <>
//             <input
//                 multiple
//                 type="file"
//                 ref={hiddenFileInput}
//                 onChange={onFileChange}
//                 style={{
//                     display: 'none'
//                 }}
//             />
//             {imagePreviewUrls &&
//                 imagePreviewUrls.map((file) => (
//                     <div
//                         style={{
//                             margin: '10px',
//                             display: 'inline'
//                         }}
//                     >
//                         <div
//                             style={{
//                                 height: '150px',
//                                 width: '150px',
//                                 backgroundImage: `url(${file})`,
//                                 backgroundSize: 'contain',
//                                 borderRadius: '5px'
//                             }}
//                         >
//                             <CancelOutlined />
//                         </div>
//                     </div>
//                 ))}
//             <div
//                 style={{
//                     height: '150px',
//                     width: '150px',
//                     backgroundImage: `url(${ImagePreview})`,
//                     backgroundSize: 'contain',
//                     borderRadius: '5px',
//                     margin: '10px',
//                     display: 'inline'
//                 }}
//             >
//                 <AddCircleOutlined onClick={() => handleClick()} />
//             </div>
//         </>
//     );
// };

// export default ImageUpload;
