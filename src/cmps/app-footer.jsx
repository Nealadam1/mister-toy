import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from "@fortawesome/free-brands-svg-icons"
export function AppFooter() {
   return <section className="app-footer">
      <div className="social-links">
         <ul>
            <li ><FontAwesomeIcon icon={faFacebook} /></li>
            <li > <i className="fa-brands fa-linkedin-in"> </i></li>
         </ul>
      </div>
      <div className="credits">Neal Adam <span>2023</span></div>

   </section>
}