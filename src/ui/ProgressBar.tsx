interface ProgressBarProps {
  totalTasks: number;
  completedTasks: number;
  height: string;
  className?: string;
  progressPercentagePosition?: string;
}

function ProgressBar({
  totalTasks,
  completedTasks,
  height,
  className,
  progressPercentagePosition,
}: ProgressBarProps) {
  const progressPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div
      className={`${height} ${className ? className : ""} relative w-full rounded-full bg-gray-300`}
    >
      <div
        className="h-full rounded-full bg-green-600"
        style={{ width: `${progressPercentage}%` }}
      />
      <span
        className={`${progressPercentagePosition ? progressPercentagePosition : ""} font-roboto text-sm text-gray-700`}
      >
        {Math.round(progressPercentage)}%
      </span>
    </div>
  );
}

export default ProgressBar;
