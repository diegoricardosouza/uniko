/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Editor, } from '@tinymce/tinymce-react';
import { useState } from 'react';

interface TinyMCEEditorProps {
  initialValue?: string
  onEditorChange?: (content: string) => void
  height?: number
}

export default function TinyEditor(props: TinyMCEEditorProps) {
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const apiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY;
  
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

        // const response = await fetch('/api/upload-image', {
        //   method: 'POST',
        //   body: formData,
        // })

        console.log('Uploading image:', blobInfo.filename(), 'Size:', blobInfo.blob().size, 'Type:', blobInfo.blob().type);
        

        clearInterval(progressInterval)
        progress(100)

        // if (!response.ok) {
        //   const error = await response.json()
        //   throw new Error(error.error || 'Upload failed')
        // }

        // const result = await response.json()

        // Remove progress tracking
        setUploadProgress(prev => {
          const newProgress = { ...prev }
          delete newProgress[uploadId]
          return newProgress
        })

        // resolve(result.url)
        resolve(`https://example.com/uploads/${blobInfo.filename()}`) // Mock URL for demo
      } catch (error) {
        reject(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    })
  }
  
  return (
    <Editor
      apiKey={apiKey}
      initialValue=""
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify link | bullist numlist outdent indent | image code table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol visualblocks | ' +
          'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        // Configuração de upload de imagens
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

        // Permitir drag & drop de imagens
        paste_data_images: true,
        setup: (editor: any) => {
          editor.on('init', () => {
            console.log('TinyMCE inicializado com upload de imagens')
          })

          // Evento personalizado quando uma imagem é inserida
          editor.on('NodeChange', (e: any) => {
            if (e.element.tagName === 'IMG') {
              console.log('Imagem selecionada:', e.element.src)
            }
          })
        }
      }}
      {...props}
    />
  );
}