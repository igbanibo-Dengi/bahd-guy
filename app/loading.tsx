export default function Loading() {
    return (
        <div className="text-center flex flex-col h-screen w-full items-center justify-center bg-black">
            <div className="pyramid-loader">
                <div className="wrapper">
                    <span className="side side1"></span>
                    <span className="side side2"></span>
                    <span className="side side3"></span>
                    <span className="side side4"></span>
                    <span className="shadow"></span>
                </div>

            </div>
            {/* <p className="capitalize text-white font-semibold text-2xl text-nowrap text-center absolute top-[70%] w-full">Partake in the majestic grandeur that follows</p> */}

        </div>


    )
}


