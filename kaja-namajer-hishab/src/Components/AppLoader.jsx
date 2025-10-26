const AppLoader = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col items-center justify-center">
            <div className="text-center space-y-6">
                <img
                    src="/favicon.png"
                    alt="Kaja Namaz Volume"
                    className="size-24 mx-auto animate-pulse"
                />
                <h1 className="text-4xl font-bold text-pink-900">
                    Kaja Namaz Volume
                </h1>
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-900"></div>
                </div>
                <p className="text-gray-600 text-lg">
                    Loading your spiritual journey...
                </p>
            </div>
        </div>
    );
};

export default AppLoader;
