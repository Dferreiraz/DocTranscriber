import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header'
import UploadArea from './components/UploadArea'
import DocumentList from './components/DocumentList'

function App() {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

    const fetchDocuments = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/documents')
      
      setDocuments(response.data.documents) 
      
      setError(null)
    } catch (err) {
      setError('Erro ao carregar documentos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDocuments()
  }, [])

  const handleUploadSuccess = () => {
    fetchDocuments()
  }

  const handleDelete = (deletedId) => {
    setDocuments(documents.filter(doc => doc.id !== deletedId))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <UploadArea onUploadSuccess={handleUploadSuccess} />

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Carregando documentos...</p>
          </div>
        ) : (
          <DocumentList documents={documents} onDelete={handleDelete} />
        )}
      </main>
    </div>
  )
}

export default App