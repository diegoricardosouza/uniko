/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { createMediaTinyAction } from '@/app/actions/medias/create-media-tiny';
import { Button } from '@/components/ui/button';
import { Editor, } from '@tinymce/tinymce-react';
import { ImagePlus } from 'lucide-react';
import { useRef, useState } from 'react';
import { ImageUploadModal } from './ImageUploadModal';

interface TinyMCEEditorProps {
  initialValue?: string
  onEditorChange?: (content: string) => void
  height?: number
}

export default function TinyEditor(props: TinyMCEEditorProps) {
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const apiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY;
  const { initialValue, onEditorChange, height = 500 } = props;
  const editorRef = useRef<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleInsertImage = (imageUrl: string) => {
    if (editorRef.current) {
      const editor = editorRef.current;

      // Inserir a imagem na posição atual do cursor
      const imgTag = `<img src="${imageUrl}" alt="Imagem inserida" />`;
      editor.insertContent(imgTag);

      // Focar no editor após inserir a imagem
      editor.focus();
    }
  };

  const imageUploadHandler = (blobInfo: any, progress: (percent: number) => void) => {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const uploadId = `upload-${Date.now()}`

        // Validações
        const maxSize = 5 * 1024 * 1024 // 5MB
        if (blobInfo.blob().size > maxSize) {
          reject('Imagem muito grande. Máximo 5MB permitido.')
          return
        }

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
        if (!allowedTypes.includes(blobInfo.blob().type)) {
          reject('Tipo de arquivo não permitido. Use JPG, PNG, GIF ou WebP.')
          return
        }

        const formData = new FormData()
        formData.append('file', blobInfo.blob(), blobInfo.filename())

        // Simular progresso de upload
        let progressValue = 0
        const progressInterval = setInterval(() => {
          progressValue += 10
          if (progressValue <= 90) {
            progress(progressValue)
            setUploadProgress(prev => ({ ...prev, [uploadId]: progressValue }))
          }
        }, 100)

        const response = await createMediaTinyAction(formData);
        
        clearInterval(progressInterval)
        progress(100)

        if (!response) {
          throw new Error('Upload failed')
        }

        // Remove progress tracking
        setUploadProgress(prev => {
          const newProgress = { ...prev }
          delete newProgress[uploadId]
          return newProgress
        })
        
        resolve(`${process.env.NEXT_PUBLIC_API_URL}${response.url}`)
      } catch (error) {
        reject(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    })
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2"
        >
          <ImagePlus className="w-4 h-4" />
          Adicionar Mídia
        </Button>
      </div>

      <Editor
        apiKey={apiKey}
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={initialValue}
        onEditorChange={onEditorChange}
        init={{
          height: height,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'preview',
            'help',
            'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify link | bullist numlist outdent indent | code table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol visualblocks | ' +
            'removeformat | help',
          content_style: `
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                font-size: 14px;
                line-height: 1.6;
                color: hsl(222.2 84% 4.9%);
              }
              img {
                max-width: 100%;
                height: auto;
                border-radius: 4px;
              }
            `,
          images_upload_handler: imageUploadHandler,
          automatic_uploads: true,
          // Configurações avançadas de imagem
          image_advtab: true,
          image_caption: true,
          image_description: false,
          image_dimensions: true,
          image_title: true,
          image_class_list: [
            { title: 'Responsiva', value: 'img-responsive' },
            { title: 'Redonda', value: 'img-rounded' },
            { title: 'Thumbnail', value: 'img-thumbnail' }
          ],
          skin: 'oxide',
          content_css: 'default',
          branding: false,
          promotion: false,
          resize: false,
          statusbar: false,
          setup: (editor: any) => {
            // Configurações adicionais do editor podem ser adicionadas aqui
            editor.on('init', () => {
              console.log('TinyMCE Editor initialized');
            });
          }
        }}
      />

      <ImageUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onInsertImage={handleInsertImage}
      />
    </div>
  );
}