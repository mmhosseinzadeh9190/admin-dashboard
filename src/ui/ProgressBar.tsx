interface ProgressBarProps {
  totalTasks: number;
  completedTasks: number;
}

function ProgressBar({ totalTasks, completedTasks }: ProgressBarProps) {
  const progressPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="relative h-1 w-full rounded-full bg-gray-300">
      <div
        className="h-full rounded-full bg-green-600"
        style={{ width: `${progressPercentage}%` }}
      />
      <span className="absolute bottom-1.5 right-0 font-roboto text-sm text-gray-700">
        {Math.round(progressPercentage)}%
      </span>
    </div>
  );
}

export default ProgressBar;
