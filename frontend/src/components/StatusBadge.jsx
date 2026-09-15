export default function StatusBadge({ status }) {
  const statusConfig = {
    pending: {
      label: 'Pendente',
      bgColor: 'bg-gray-100 dark:bg-gray-700',
      textColor: 'text-gray-800 dark:text-gray-300',
      icon: ''
    },
    processing: {
      label: 'Processando',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
      textColor: 'text-yellow-800 dark:text-yellow-300',
      icon: '⚙️'
    },
    completed: {
      label: 'Concluído',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      textColor: 'text-green-800 dark:text-green-300',
      icon: '✅'
    },
    failed: {
      label: 'Falhou',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      textColor: 'text-red-800 dark:text-red-300',
      icon: '❌'
    }
  }

  const config = statusConfig[status] || statusConfig.pending

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bgColor} ${config.textColor} transition-colors duration-300`}>
      <span className="mr-2">{config.icon}</span>
      {config.label}
    </span>
  )
}