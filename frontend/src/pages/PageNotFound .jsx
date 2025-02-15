import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
            <p className="text-gray-600 mb-4">
                The page you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
                to="/home"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                Return to Home
            </Link>
        </div>
    );
};

export default PageNotFound;