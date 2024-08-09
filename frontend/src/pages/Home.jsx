import {useNavigate} from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate();

    const bookNowHandler = () => {
        navigate('/turfs');
    }

    return (<>
        <div className="relative h-screen w-screen">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("soccer-background-vector-2159631.jpg")' }}>
                <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm">
                    <div className="relative z-10 flex flex-col items-center justify-center h-3/5 w-1/3 mx-auto my-48 border overflow-y-auto border-gray-500">
                        <div className="relative items-center">
                            <h1 className="text-white text-5xl sm:text-wrap text-center pt-8">KickStart</h1>
                            <hr />
                            <h2 className="text-white text-2xl sm:text-wrap text-center">A Futsal Booking System</h2>
                        </div>
                        <div className="my-auto items-center">
                            <p className="text-center text-wrap px-10 text-white text-xl">Welcome to KickStart—your go-to platform for easy and quick futsal court bookings. Find nearby courts, check availability in real-time, and manage your reservations effortlessly. Whether for a friendly game or a competitive match, KickStart makes booking a breeze. Get started and elevate your futsal experience today!</p>
                        </div>
                        <div className="my-auto flex gap-20 md-shrink-1 md-gap-4">
                            <button className="border-black bg-white h-14 rounded-md px-5 py-2 text-xl flex-shrink-1 hover:bg-blue-500 ">Register Turf</button>
                            <button onClick = {bookNowHandler} className="border-black bg-white h-14 rounded-md px-5 py-2 text-xl flex-shrink-1 hover:bg-blue-500">Book Now</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>)
}