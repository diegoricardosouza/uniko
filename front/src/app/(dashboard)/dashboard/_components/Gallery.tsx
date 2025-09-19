/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client"

import React from "react"

import {
  AlertCircleIcon,
  ImageIcon,
  Trash2Icon,
  UploadIcon,
  XIcon
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { formatBytes, useFileUpload, type FileWithPreview } from "@/hooks/useFileUpload"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

export type ImageGallery = {
  name: string
  size: number
  type: string
  url: string
  id: string
}

interface GalleryProps {
  value?: FileWithPreview[]
  onChange?: (files: FileWithPreview[]) => void
  onRemoveFile?: (id: string) => void
  maxFiles?: number
  maxSize?: number
  accept?: string
  className?: string
  disabled?: boolean
  initialFiles?: ImageGallery[]
}

// Componente otimizado para preview de imagem
const FilePreview = React.memo(({ file, className }: {
  file: { file: File | { type: string; name: string; url?: string } }
  className?: string
}) => {
  const fileName = file.file instanceof File ? file.file.name : file.file.name
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (file.file instanceof File) {
      const url = URL.createObjectURL(file.file)
      setImageUrl(url)
      setImageError(false)

      return () => {
        URL.revokeObjectURL(url)
      }
    } else if (file.file.url) {
      setImageUrl(file.file.url)
      setImageError(false)
    }
  }, [file.file])

  const handleImageError = useCallback(() => {
    setImageError(true)
  }, [])

  const handleImageLoad = useCallback(() => {
    setImageError(false)
  }, [])

  return (
    <div className={`bg-accent flex aspect-square items-center justify-center overflow-hidden rounded-t-[inherit] ${className || ''}`}>
      {imageUrl && !imageError ? (
        <img
          src={imageUrl}
          alt={fileName}
          className="size-full rounded-t-[inherit] object-cover"
          loading="lazy"
          draggable={false}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      ) : (
        <ImageIcon className="size-5 opacity-60" />
      )}
    </div>
  )
})

FilePreview.displayName = 'FilePreview'

// Componente otimizado para o ghost durante drag
const DragGhost = React.memo(({
  position,
  file,
  isVisible
}: {
  position: { x: number; y: number } | null
  file: any
  isVisible: boolean
}) => {
  const [ghostImageUrl, setGhostImageUrl] = useState<string | null>(null)

  useEffect(() => {
    if (isVisible && file?.file instanceof File) {
      const url = URL.createObjectURL(file.file)
      setGhostImageUrl(url)

      return () => {
        URL.revokeObjectURL(url)
      }
    } else if (isVisible && file?.file?.url) {
      setGhostImageUrl(file.file.url)
    } else {
      setGhostImageUrl(null)
    }
  }, [isVisible, file])

  if (!isVisible || !position || !file) return null

  return (
    <div
      className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%) rotate(6deg) scale(1.1)',
      }}
    >
      <div className="bg-background border shadow-2xl rounded-md w-24 h-24 flex flex-col overflow-hidden opacity-90">
        <div className="bg-accent flex aspect-square items-center justify-center overflow-hidden rounded-t-[inherit] flex-1">
          {ghostImageUrl && file.file.type?.startsWith("image/") ? (
            <img
              src={ghostImageUrl}
              alt={file.file.name}
              className="size-full object-cover"
              draggable={false}
            />
          ) : (
            <ImageIcon className="size-5 opacity-60" />
          )}
        </div>
        <div className="p-1 border-t">
          <p className="text-[8px] font-medium truncate">{file.file.name}</p>
        </div>
      </div>
    </div>
  )
})

DragGhost.displayName = 'DragGhost'

export default function Gallery({
  value = [],
  onChange,
  maxFiles = 50,
  maxSize = 5 * 1024 * 1024, // 5MB default
  accept = "image/*",
  className = "",
  disabled = false,
  initialFiles,
  onRemoveFile
}: GalleryProps) {
  const maxSizeMB = Math.round(maxSize / (1024 * 1024))
  const [isInitialized, setIsInitialized] = useState(false);

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile: originalRemoveFile,
      clearFiles: originalClearFiles,
      getInputProps,
      reorderFiles: originalReorderFiles,
    },
  ] = useFileUpload({
    multiple: true,
    maxFiles,
    maxSize,
    accept,
    initialFiles: (initialFiles && initialFiles.length > 0) ? initialFiles : []
  })

  useEffect(() => {
    if (initialFiles && initialFiles.length > 0 && !isInitialized) {
      setIsInitialized(true);
    }
  }, [initialFiles, isInitialized]);

  const [dragState, setDragState] = useState({
    draggedIndex: null as number | null,
    dragOverIndex: null as number | null,
    insertPosition: null as { index: number; position: "before" | "after" } | null,
    ghostPosition: null as { x: number; y: number } | null,
    draggedFile: null as any
  })

  // Refs para otimização
  const dragStartTimeRef = useRef<number>(0)
  const lastUpdateTimeRef = useRef<number>(0)

  // Sincroniza mudanças apenas quando files mudar
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange?.(files)
    }, 0)
    return () => clearTimeout(timeoutId)
  }, [files, onChange])

  // Callback otimizado para drag start
  const handleItemDragStart = useCallback((e: React.DragEvent, index: number) => {
    if (disabled) return

    dragStartTimeRef.current = performance.now()

    setDragState(prev => ({
      ...prev,
      draggedIndex: index,
      draggedFile: files[index]
    }))

    e.dataTransfer.effectAllowed = "move"

    // Usar uma imagem transparente para esconder o drag image padrão
    const dragImage = new Image()
    dragImage.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="
    e.dataTransfer.setDragImage(dragImage, 0, 0)
  }, [disabled, files])

  // Callback otimizado para drag over com throttling
  const handleItemDragOver = useCallback((e: React.DragEvent, index: number) => {
    if (disabled || dragState.draggedIndex === null) return

    e.preventDefault()
    e.dataTransfer.dropEffect = "move"

    const now = performance.now()
    // Throttle updates para 60fps
    if (now - lastUpdateTimeRef.current < 16) return
    lastUpdateTimeRef.current = now

    const newGhostPosition = { x: e.clientX, y: e.clientY }

    if (dragState.draggedIndex === index) {
      setDragState(prev => ({ ...prev, ghostPosition: newGhostPosition }))
      return
    }

    const rect = e.currentTarget.getBoundingClientRect()
    const midY = rect.top + rect.height / 2
    const midX = rect.left + rect.width / 2
    const isVerticalLayout = window.innerWidth < 768

    const position = isVerticalLayout
      ? (e.clientY < midY ? "before" : "after")
      : (e.clientX < midX ? "before" : "after")

    setDragState(prev => ({
      ...prev,
      ghostPosition: newGhostPosition,
      dragOverIndex: index,
      insertPosition: { index, position }
    }))
  }, [disabled, dragState.draggedIndex])

  // Callback otimizado para global drag over
  const handleGlobalDragOver = useCallback((e: React.DragEvent) => {
    if (dragState.draggedIndex !== null && !disabled) {
      const now = performance.now()
      if (now - lastUpdateTimeRef.current < 16) return
      lastUpdateTimeRef.current = now

      setDragState(prev => ({
        ...prev,
        ghostPosition: { x: e.clientX, y: e.clientY }
      }))
    }
  }, [dragState.draggedIndex, disabled])

  const handleItemDragLeave = useCallback((e: React.DragEvent) => {
    if (disabled) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX
    const y = e.clientY

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragState(prev => ({
        ...prev,
        dragOverIndex: null,
        insertPosition: null
      }))
    }
  }, [disabled])

  const handleItemDrop = useCallback((e: React.DragEvent, dropIndex: number) => {
    if (disabled) return
    e.preventDefault()

    if (dragState.draggedIndex !== null && dragState.insertPosition) {
      let finalIndex = dragState.insertPosition.index
      if (dragState.insertPosition.position === "after") {
        finalIndex = dragState.insertPosition.index + 1
      }

      if (dragState.draggedIndex < finalIndex) {
        finalIndex -= 1
      }

      originalReorderFiles(dragState.draggedIndex, finalIndex)

      // 🔥 Atualiza o form também
      onChange?.([...files])
    }

    setDragState({
      draggedIndex: null,
      dragOverIndex: null,
      insertPosition: null,
      ghostPosition: null,
      draggedFile: null
    })
  }, [disabled, dragState.draggedIndex, dragState.insertPosition, originalReorderFiles, onChange, files])

  // const handleItemDrop = useCallback((e: React.DragEvent, dropIndex: number) => {
  //   if (disabled) return
  //   e.preventDefault()

  //   if (dragState.draggedIndex !== null && dragState.insertPosition) {
  //     let finalIndex = dragState.insertPosition.index
  //     if (dragState.insertPosition.position === "after") {
  //       finalIndex = dragState.insertPosition.index + 1
  //     }

  //     if (dragState.draggedIndex < finalIndex) {
  //       finalIndex -= 1
  //     }

  //     originalReorderFiles(dragState.draggedIndex, finalIndex)
  //   }

  //   setDragState({
  //     draggedIndex: null,
  //     dragOverIndex: null,
  //     insertPosition: null,
  //     ghostPosition: null,
  //     draggedFile: null
  //   })
  // }, [disabled, dragState.draggedIndex, dragState.insertPosition, originalReorderFiles])

  const handleItemDragEnd = useCallback(() => {
    setDragState({
      draggedIndex: null,
      dragOverIndex: null,
      insertPosition: null,
      ghostPosition: null,
      draggedFile: null
    })
  }, [])

  // Outros handlers otimizados
  const handleRemoveFile = useCallback((id: string) => {
    if (disabled) return
    originalRemoveFile(id)
    onRemoveFile?.(id)
  }, [disabled, originalRemoveFile, onRemoveFile])

  const handleClearFiles = useCallback(() => {
    if (disabled) return
    originalClearFiles()
  }, [disabled, originalClearFiles])

  const handleOpenFileDialog = useCallback(() => {
    if (disabled) return
    openFileDialog()
  }, [disabled, openFileDialog])

  // Memoizar a renderização dos arquivos
  const fileItems = useMemo(() => {
    return files.map((file, index) => (
      <div key={file.id} className="relative">
        {dragState.insertPosition &&
          dragState.insertPosition.index === index &&
          dragState.insertPosition.position === "before" &&
          !disabled && (
            <div className="absolute -top-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full z-10 shadow-lg animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-sm opacity-50" />
            </div>
          )}

        <div
          draggable={!disabled}
          onDragStart={!disabled ? (e) => handleItemDragStart(e, index) : undefined}
          onDragOver={!disabled ? (e) => handleItemDragOver(e, index) : undefined}
          onDragLeave={!disabled ? handleItemDragLeave : undefined}
          onDrop={!disabled ? (e) => handleItemDrop(e, index) : undefined}
          onDragEnd={!disabled ? handleItemDragEnd : undefined}
          className={`bg-background relative flex flex-col rounded-md border transition-all duration-200 ease-out will-change-transform ${!disabled ? 'cursor-move' : 'cursor-default'
            } ${dragState.draggedIndex === index && !disabled
              ? "opacity-20 scale-90 rotate-3 blur-[1px]"
              : ""
            } ${dragState.dragOverIndex === index &&
              dragState.draggedIndex !== index &&
              !disabled
              ? "scale-105 shadow-xl ring-2 ring-blue-400/50 bg-blue-50/50 dark:bg-blue-950/20"
              : ""
            } ${!disabled ? 'hover:shadow-md hover:scale-[1.02] active:scale-95' : ''}`}
        >
          <FilePreview file={file} />
          {!disabled && (
            <div className="absolute top-0 left-0 p-1.5 w-full h-full rounded-md transition-all duration-200 hover:bg-black/20" />
          )}
          <Button
            onClick={() => handleRemoveFile(file.id)}
            size="icon"
            className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
            aria-label="Remove image"
            disabled={disabled}
          >
            <XIcon className="size-3.5" />
          </Button>
          <div className="flex min-w-0 flex-col gap-0.5 border-t p-3">
            <p className="truncate text-[13px] font-medium">{file.file.name}</p>
            <p className="text-muted-foreground truncate text-xs">{formatBytes(file.file.size)}</p>
          </div>
        </div>

        {dragState.insertPosition &&
          dragState.insertPosition.index === index &&
          dragState.insertPosition.position === "after" &&
          !disabled && (
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full z-10 shadow-lg animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-sm opacity-50" />
            </div>
          )}
      </div>
    ))
  }, [
    files,
    dragState.insertPosition,
    dragState.draggedIndex,
    dragState.dragOverIndex,
    disabled,
    handleItemDragStart,
    handleItemDragOver,
    handleItemDragLeave,
    handleItemDrop,
    handleItemDragEnd,
    handleRemoveFile
  ])

  return (
    <div
      className={`flex flex-col gap-2 ${className} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
      onDragOver={handleGlobalDragOver}
    >
      <DragGhost
        position={dragState.ghostPosition}
        file={dragState.draggedFile}
        isVisible={dragState.draggedIndex !== null && !disabled}
      />

      <div
        onDragEnter={!disabled ? handleDragEnter : undefined}
        onDragLeave={!disabled ? handleDragLeave : undefined}
        onDragOver={!disabled ? handleDragOver : undefined}
        onDrop={!disabled ? handleDrop : undefined}
        data-dragging={isDragging && !disabled || undefined}
        data-files={files.length > 0 || undefined}
        data-disabled={disabled || undefined}
        className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px] data-[disabled=true]:cursor-not-allowed data-[disabled=true]:bg-gray-50"
      >
        <input {...getInputProps()} className="sr-only" aria-label="Upload image file" disabled={disabled} />
        {files.length > 0 ? (
          <div className="flex w-full flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="truncate text-sm font-medium">Arquivos ({files.length})</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleOpenFileDialog}
                  disabled={disabled}
                  type="button"
                >
                  <UploadIcon className="-ms-0.5 size-3.5 opacity-60" aria-hidden="true" />
                  Adicionar arquivos
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearFiles}
                  disabled={disabled}
                  type="button"
                >
                  <Trash2Icon className="-ms-0.5 size-3.5 opacity-60" aria-hidden="true" />
                  Remover todos
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-6 relative">
              {fileItems}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
            <div
              className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
              aria-hidden="true"
            >
              <ImageIcon className="size-4 opacity-60" />
            </div>
            <p className="mb-1.5 text-sm font-medium">
              {disabled ? 'Upload desabilitado' : 'Solte seus arquivos aqui.'}
            </p>
            <p className="text-muted-foreground text-xs">
              Max {maxFiles} arquivos ∙ Até {maxSizeMB}MB
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={handleOpenFileDialog}
              disabled={disabled}
            >
              <UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
              Selecionar imagens
            </Button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div className="text-destructive flex items-center gap-1 text-xs" role="alert">
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  )
}