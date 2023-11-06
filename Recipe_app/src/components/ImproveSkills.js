export default function ImproveSkills(){
    const list = [
        "Explore international cuisines",
"Master cooking techniques",
"Improvise with ingredients",
"Create visually appealing dishes",
"Understand flavor combinations"
    ]

    return (
        <div className="improve-skills">
            <div className="col img">
                <img src="/img/gallery/img_112.jpeg" alt="" />
            </div>
            <div className="col typography">
                <h1 className="title">Practice diverse recipes regularly.</h1>
                { list.map((item, index) => (
                    <p className="skill-item" key={index}>{item}</p>
                )) }
                {/* <button className="btn">singup now</button> */}
            </div>
        </div>
    )
}