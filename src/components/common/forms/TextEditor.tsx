'use client';
import katex from 'katex';
import { api } from '@/server/api';
import React, { useEffect, useRef } from 'react';
import SunEditor from 'suneditor-react';
import SunEditorCore from 'suneditor/src/lib/core';
import { convertImageToWebP } from '@/utils/image-utils';
import { buttonListAll } from '@/config/text-editor-options';
import { SunEditorReactProps } from 'suneditor-react/dist/types/SunEditorReactProps';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

type TextEditorProps = Pick<
  SunEditorReactProps,
  | 'placeholder'
  | 'height'
  | 'width'
  | 'onChange'
  | 'autoFocus'
  | 'disable'
  | 'defaultValue'
  | 'name'
>;

const TextEditor: React.FC<TextEditorProps> = ({
  disable,
  onChange,
  defaultValue,
  width = '100%',
  height = '300px',
  autoFocus = false,
  name = 'my-editor',
  placeholder = 'Please type here...',
}) => {
  const editor = useRef<SunEditorCore | null>(null);

  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };

  const handleImageUploadBefore = (
    files: File[],
    info: object,
    uploadHandler: (response: {
      result: { url: any; name: string }[];
      errorMessage?: string;
    }) => void,
  ): boolean => {
    (async () => {
      const file = files[0];

      // Convert to WebP before uploading
      const webpFile = await convertImageToWebP(file);

      const formData = new FormData();
      formData.append('file', webpFile, 'image.webp');

      try {
        const response = await api.post('/admin-file/upload', formData);

        const res = {
          result: [
            {
              url: response?.data,
              name: 'thumbnail',
            },
          ],
        };

        uploadHandler(res);
      } catch (error) {
        return error;
      }
    })();
    return true; // or return false based on your logic
  };

  return (
    <SunEditor
      name={name}
      width={width}
      setAllPlugins
      height={height}
      disable={disable}
      autoFocus={autoFocus}
      placeholder={placeholder}
      defaultValue={defaultValue}
      getSunEditorInstance={getSunEditorInstance}
      onImageUploadBefore={handleImageUploadBefore}
      setOptions={{
        templates: [
          { name: 'Template-1', html: '<p>HTML source1</p>' },
          { name: 'Template-2', html: '<p>HTML source2</p>' },
        ],
        katex: katex,
        buttonList: buttonListAll,
      }}
      onChange={onChange}
    />
  );
};

export default TextEditor;

export const PreviewEditor = ({ children }: { children: string }) => {
  return (
    <div className="sun-editor-preview sun-editor-editable">
      <div dangerouslySetInnerHTML={{ __html: children }} />
    </div>
  );
};
