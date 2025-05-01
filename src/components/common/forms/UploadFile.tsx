// import { InputFileTypeEnum } from '@/enum/InputFileType';
// import useFileUpload from '@/hooks/useFileUpload';
// import { Loader2, ShieldCloseIcon } from 'lucide-react';
// import { Image } from '../Image';
// import Icon from '../Icon';
// import { Button } from '@/components/ui/button';

// export const imageFileRegex = /\.(jpe?g|png|svg|gif|bmp|webp|tiff?)$/i;

// type UploadFileProps = {
//   id?: string;
//   maxFiles?: number;
//   className?: string;
//   imageFiles: string[];
//   accept?: InputFileTypeEnum;
//   setImageFiles: (value: string[]) => void;
// };

// const UploadFile = ({
//   id = 'IMAGE',
//   className = '',
//   maxFiles = 1,
//   imageFiles,
//   setImageFiles,
//   accept = InputFileTypeEnum.IMAGE,
// }: UploadFileProps) => {
//   let disabledVal: boolean = imageFiles.length === maxFiles;

//   const { isLoading, onChange, removeIndex } = useFileUpload({
//     files: imageFiles,
//     setFiles: setImageFiles,
//   });

//   return (
//     <div className="space-y-space8">
//       <label
//         htmlFor={id}
//         className={`border_primary bg_white flex h-[4.4rem] items-center justify-between rounded-md border px-space16 text-brown-light ${className} ${disabledVal ? 'cursor-not-allowed' : 'cursor-pointer'}`}
//       >
//         <input
//           id={id}
//           type="file"
//           accept={accept}
//           className="hidden"
//           onChange={onChange}
//           disabled={disabledVal || isLoading}
//         />
//         {/* <Text
//                     title={isLoading ? 'Uploading...' : 'Choose File'}
//                     variant="brown"
//                 /> */}
//         <Icon icon="hugeicons:image-01" />
//       </label>

//       <div className="flex justify-center">
//         {isLoading && <Loader2 className="h-space16 w-space16 animate-spin" />}
//       </div>

//       {imageFiles.map((img, idx) => (
//         <div
//           key={idx}
//           className="bg_white flex items-center justify-between gap-space12 rounded-md p-space6"
//         >
//           <div className="line-clamp-1 flex items-center gap-space8">
//             <Image
//               alt="img"
//               width={24}
//               height={24}
//               className="max-h-space24 max-w-space24 overflow-hidden rounded"
//               src={
//                 imageFileRegex.test(img) ? img : '/images/placeholder/file.png'
//               }
//             />
//             {/* <Text
//                                 title={img.slice(-10)}
//                                 className="line-clamp-1 text-xs"
//                             /> */}
//           </div>

//           <Button
//             type="button"
//             size={'icon'}
//             variant={'transparent'}
//             onClick={() => removeIndex(idx)}
//           >
//             <ShieldCloseIcon color="red" />
//           </Button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default UploadFile;

export const UploadFile = () => {
  return <div>Upload File</div>;
};
