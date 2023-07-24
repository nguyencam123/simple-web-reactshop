import "./footer.css";
import "bootstrap/dist/css/bootstrap.css";
import myimgloaction from "../assets/location_on_FILL0_wght400_GRAD0_opsz48.png";
import myimgmail from "../assets/mail_FILL0_wght400_GRAD0_opsz48.png";
import myimgcall from "../assets/call_FILL0_wght400_GRAD0_opsz48.png";
import myiconfb from "../assets/facebook.png";
import myiconins from "../assets/instagram.png";
import myiconyoutobe from "../assets/youtube.png";

function Footer() {
  return (
    <div className="body">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="textfooter">About</div>
            <br></br>
            <div className="textfootern">
              Necessary, making this the first true generator on the Internet.
              It uses a dictionary of over 200 Latin words, combined with
              <br></br>
              <img src={myiconfb} alt="" className="iconsize1" /> &emsp;
              <img src={myiconins} alt="" className="iconsize1" /> &emsp;
              <img src={myiconyoutobe} alt="" className="iconsize1" /> &emsp;
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="textfooter">Reach at..</div>
            <br></br>
            <div className="textfootern">
              <img src={myimgloaction} alt="" className="iconsize" /> &emsp;
              Location<br></br>
              <img src={myimgmail} alt="" className="iconsize" /> &emsp; Call
              +84 0973822043<br></br>
              <img src={myimgcall} alt="" className="iconsize" /> &emsp;
              nguyencamls03@gmail.com
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="textfooter">Subscribe</div>
            <br></br>
            <div className="textfootern">
              <div className="buttonfooter">
                <div class="col-auto">
                  <label for="inputPassword2" class="visually-hidden">
                    Password
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="inputPassword2"
                    placeholder="enter email"
                  />
                </div>
                <br></br>
                <div class="col-auto">
                  <button type="button" class="btn btn-warning">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7449.563001227257!2d105.73879539999997!3d21.00139400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1678095664260!5m2!1svi!2s"></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
