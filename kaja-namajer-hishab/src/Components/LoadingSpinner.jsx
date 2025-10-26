const LoadingSpinner = () => (
    <div className="flex flex-col gap-5 justify-center items-center flex-1 px-4 text-center mt-24">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-900"></div>
        <p className="md:text-2xl text-lg font-semibold text-gray-600">
            Loading...
        </p>
    </div>
);

export default LoadingSpinner;
