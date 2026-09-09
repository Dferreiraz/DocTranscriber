import { useState } from 'react'
import axios from 'axios'

export default function UploadArea({ onUploadSuccess }) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type === 'application/pdf') {
      uploadFile(file)
    } else {
      setError('Por favor, envie apenas arquivos PDF')
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      uploadFile(file)
    }
  }

  const uploadFile = async (file) => {
    setUploading(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      await axios.post('/api/documents', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      onUploadSuccess()
    } catch (err) {
      setError('Erro ao enviar arquivo. Tente novamente.')
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 transition-colors duration-300">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'
        }`}
      >
        <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48">
          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        
        <div className="mt-4">
          <label className="cursor-pointer">
            <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors duration-300">
              {uploading ? 'Enviando...' : 'Clique para selecionar um PDF'}
            </span>
            <input
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={handleFileSelect}
              disabled={uploading}
            />
          </label>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
            ou arraste e solte aqui
          </p>
        </div>

        {error && (
          <div className="mt-4 text-red-600 dark:text-red-400 text-sm transition-colors duration-300">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}