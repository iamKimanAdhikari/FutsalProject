import Turfs from "./Turfs.jsx";

export default function BookingLayout() {
    return (
        <div className="flex h-screen">
            <div className="w-1/4 border-r-2 overflow-y-auto">
                <Turfs className="w-full h-full"/>
            </div>
            <div className="w-3/4 p-4">
                {/* Other content goes here */}
                <h1 className='py-5 top-5 text-5xl text-white'>Booking Page</h1>
            </div>
        </div>
    );
}
