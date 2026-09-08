export default function StatusBadge({ status }) {
    const statusConfig = {
  pending: {
      label: 'Pendente',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800',
      icon: '⏳'
    },
    processing: {
      label: 'Processando',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      icon: '⚙️'
    },
    completed: {
      label: 'Concluído',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      icon: '✅'
    },
    failed: {
      label: 'Falhou',
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      icon: ''
    }
  }

  const config = statusConfig[status] || statusConfig.pending

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bgColor} ${config.textColor}`}>
        <span className="mr-2">{config.icon}</span>
        {config.label}
    </span>
  )
}