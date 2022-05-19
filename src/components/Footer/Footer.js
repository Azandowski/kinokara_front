import React from 'react'
import './Footer.css'


const azaUrl = "https://sun9-17.userapi.com/c851036/v851036372/1c5b99/L164-8aoK_k.jpg"
const bogdanUrl = "https://media-exp1.licdn.com/dms/image/C4E03AQFeU4paNdxg6w/profile-displayphoto-shrink_200_200/0/1644590355868?e=1655337600&v=beta&t=PTnRguItxmtwp3fyk8hPVMfItbKy-Vy-yEA1P7NkVdE"


const Person = (props) => (
    <div className="person">
        <img 
            className="person__photo"
            src={props.img}/>
        <div className="info">
            <label className="person__name">
                {props.name}
            </label>
            <a 
                target="_blank"
                className="person__link"
                href={props.insta}>
                Instagram
            </a>
        </div>
    </div>
)

const Footer = (props) => (
    <div className="Footer">
        <label className="footer__name">
            KinoKara
        </label>
        <div className="authors">
            <label className="authors__name">Авторы проекта</label>
            <div className="content">
                <Person
                    img={azaUrl}
                    name="Bekbolat Azamat"
                    insta={"https://instagram.com/drop_west"}
                />
                <Person
                    img={bogdanUrl}
                    name="Bogdan Marzoev"
                    insta={"https://instagram.com/cdxray_"}
                />
            </div>  
        </div>
        <div className='lastVisited'>
            {props.lastVisited ? getDateFormatted(props.lastVisited) : ''}
        </div>
    </div>
)

function getDateFormatted (date) {
    return ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
        ("00" + date.getDate()).slice(-2) + "/" +
        date.getFullYear() + " " +
        ("00" + date.getHours()).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2);
}

export default Footer;