import { Back } from "iconsax-react";
import { Link } from "react-router-dom";

type PageNotFoundProps = {
  message?: string;
};

function PageNotFound({ message }: PageNotFoundProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <img src="/public/favicon.svg" alt="Hollow" className="h-auto w-24" />
      <span className="max-w-4xl text-center font-roboto text-xl font-semibold tracking-0.1 text-gray-800">
        {message || (
          <span className="flex flex-col gap-2">
            <span className="text-2xl">Oops! Page not found.</span>
            <span>
              The page you're looking for doesn't exist. You might want to go
              back to the dashboard.
            </span>
          </span>
        )}
      </span>
      <Link
        to="/dashboard"
        className="flex items-center gap-2 font-roboto text-lg font-semibold tracking-0.1 text-primary-800 hover:text-primary-900 hover:underline"
      >
        <Back size="26" />
        Return to Dashboard
      </Link>
    </div>
  );
}

export default PageNotFound;
