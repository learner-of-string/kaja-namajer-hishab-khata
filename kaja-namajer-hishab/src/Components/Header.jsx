const Header = () => {
    return (
        <div className="flex flex-col gap-2 justify-center items-center">
            <img
                src="/favicon.png"
                alt="kaja namaj volume"
                className="size-20"
            />
            <h1 className="md:text-5xl text-4xl text-center font-bold font-nunito">
                Kaja Namaz Volume
            </h1>
        </div>
    );
};

export default Header;
