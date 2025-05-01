import { api } from '@/server/api';
import { convertImageToWebP, isValidImage } from '@/utils/image-utils';
import { useState } from 'react';
import { toast } from 'sonner';

export default function useFileUpload({
  setImage,
}: {
  setImage: (file: string) => void;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = (event.target as HTMLInputElement).files?.[0] || null;
    if (!file) return;

    if (!isValidImage(file)) {
      toast.error('Invalid image type. Please upload a valid image.');
      return;
    }

    const maxSizeInMB = 32; // Limit size in MB
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    if (file.size > maxSizeInBytes) {
      toast.error('Maximum file size is 32MB');
      return;
    }

    const webpFile = await convertImageToWebP(file);

    // Initialize FormData
    const formData = new FormData();
    formData.append('file', webpFile, 'image.webp');
    // const formData = new FormData();
    // formData.append('file', file);
    setIsLoading(true);

    try {
      // Upload file
      const res = await api.post('/admin-file/upload', formData);
      // console.log(res);

      if (res.success) {
        setImage(res.data);
        toast.success('File uploaded successfully!');
      } else {
        toast.error('File upload failed');
      }
    } catch (error) {
      // Improved error handling
      console.error('File upload error:', error);
      toast.error('An error occurred during file upload. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return { onChange, isLoading };
}
