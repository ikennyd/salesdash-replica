export interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: string;
  description?: string;
}

export default function DashboardCard({ title, value, icon, description }: DashboardCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
          {description && <p className="text-gray-400 text-sm mt-1">{description}</p>}
        </div>
        {icon && <span className="text-4xl">{icon}</span>}
      </div>
    </div>
  );
}
