import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Community.css";

import firebase from "../../services/firebase";
import compic from "../../honda_beat_community.png";
import miatapic from "../../mazda_miata_community.png";
const storage = firebase.storage();

function CommunityCard({ pic, make, model, years, chassis }) {
  const [isHover, setHover] = useState(false);
  const cardEnter = () => {
    setHover(true);
  };
  const cardExit = () => {
    setHover(false);
  };

  return (
    <div className="cc-page-header">

        <img className="cc-page-pic" src={pic} />

      <div className="cc-page-right">
        <div className="cc-page-title">
          <div className="cc-page-detail cc-year">1991-1996</div>
          <div className="cc-page-detail cc-type">
            {make} {model}
          </div>
          <div className="cc-page-detail cc-chassis">{chassis}</div>
        </div>
        <div className="cc-page-title">
          <div className="cc-page-detail cc-year">1991-1996</div>
          <div className="cc-page-detail cc-type">
            {make} {model}
          </div>
          <div className="cc-page-detail cc-chassis">{chassis}</div>
        </div>
        <div className="cc-page-description">
          <p>
            The vehicle was designed to meet Kei car specifications for lower
            tax and insurance in Japan. Weighing 725 kg (1,598 lb), the
            Cappuccino is powered by a turbocharged, three-cylinder, 657 cc DOHC
            engine (just under the 660 cc maximum displacement allowed for a Kei
            car). Its dimensions also conformed to Kei car regulations on length
            and width, being 3,295 mm (129.7 in) long and 1,395 mm (54.92 in)
            wide. Front-rear weight distribution is claimed to be 50/50% when
            both seats are occupied. Layout is front mid-engined and rear-wheel
            drive. The hood, roof, roll bar and lower front guard panels are
            aluminium. Three removable roof panels mean that the car can be used
            as a closed coupé; T-top; targa; or, on retraction of the rear
            window and roll bar, a full convertible. Roof panels stow in the
            trunk (taking almost all the luggage space), and the rear
            window/rollcage assembly retracts into the body behind the seats.
            Unlike many convertibles of the time, the rear window is glass and
            wraparound, with demisting elements. It was originally equipped with
            the F6A engine: later models were fitted with a K6A engine which was
            lighter and had chain-driven, rather than belt-driven camshafts and
            more torque. Both are DOHC 12-valve, inline three-cylinder engines
            that were turbocharged and intercooled. Power output was a claimed
            64 PS (47 kW; 63 hp) at 6500 rpm so as to not exceed the maximum
            power allowed for Kei cars. The initial Cappuccino featured
            all-wheel disc brakes and rear-wheel drive. Later versions in Japan
            had an early production iteration of speed-sensing electric
            power-assisted steering and aluminium double wishbone suspension.
            Production began in 1991 and ceased in 1998. The Cappuccino's
            closest competitor of the time were the Autozam AZ-1, Honda Beat and
            the Daihatsu Leeza Spyder. (The Autozam AZ-1, Honda Beat and Suzuki
            Cappuccino were together called the Sporty Kei-Car's ABC.)
          </p>
        </div>
      </div>
    </div>
  );
}

export default CommunityCard;
