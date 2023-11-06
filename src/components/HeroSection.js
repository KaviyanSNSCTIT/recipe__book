import CustomImage from "./CustomImage"

export default function HeroSection(){
    const images = [
        "/img/gallery/img_1.png",
        
    ]
    return (
        <div className="section hero">
            <div className="col typography">
                <h1 className="title">About Us</h1>
                <p className="info">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed ultricies facilisis massa, in fringilla ipsum rhoncus a. Vivamus in libero nec neque finibus laoreet.
            Integer in ligula vel magna hendrerit bibendum eu a massa. Suspendisse potenti. Aliquam erat volutpat. Sed et leo eu nulla hendrerit accumsan.</p>
                {/* <button className="btn">explore now</button> */}
            </div>
            <div className="col gallery">
                { images.map((src, index) => (
                    <CustomImage key={index} imgSrc={src} pt={"90%"} />
                )) }
            </div>
        </div>
    )
}