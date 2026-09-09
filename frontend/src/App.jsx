import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header'
import UploadArea from './components/UploadArea'
import DocumentList from './components/DocumentList'

function App() {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains('dark')
  })

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    if (newTheme) {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    }
  }

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header toggleTheme={toggleTheme} isDark={isDark} />
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded transition-colors duration-300">
            {error}
          </div>
        )}

        <UploadArea onUploadSuccess={handleUploadSuccess} />

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400 transition-colors duration-300">Carregando documentos...</p>
          </div>
        ) : (
          <>
            {documents.length > 0 && (
              <div className="mb-4 flex justify-end">
                <a 
                  href="/api/documents/export"
                  className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Exportar para Excel
                </a>
              </div>
            )}

            <DocumentList documents={documents} onDelete={handleDelete} />
          </>
        )}
      </main>
    </div>
  )
}

export default App