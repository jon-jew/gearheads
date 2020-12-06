import React from "react";

import CarCardGrad from "./CarCard/CarCard.js";
import pic from "../mr2.jpg";

class CarCardContainer extends React.Component {
  render() {
    return (
      <div class="card-container">
        <CarCardGrad
          year={"1988"}
          car={"MITSUBISHI STARION"}
          pic="http://speedhunters-wp-production.s3.amazonaws.com/wp-content/uploads/2017/01/23203248/DSC09946NN-1200x800.jpg"
        />
        <CarCardGrad
          year={"2017"}
          car={"MERCEDES AMG GT"}
          pic="https://gtspirit.com/wp-content/uploads/2020/07/20C0392_005.jpg"
        />
        <CarCardGrad year={"1991"} car={"TOYOTA MR2"} pic={pic} />
        <CarCardGrad year={"2019"} car={"BMW M2"} pic="https://mediapool.bmwgroup.com/cache/P9/201807/P90316092/P90316092-the-new-bmw-m2-competition-in-ascari-07-2018-2250px.jpg" />
        <CarCardGrad
          year={"1994"}
          car={"MITSUBISHI FTO"}
          pic="https://www.jdmbuysell.com/wp-content/uploads/2020/08/j37a9823-705x470.jpg"
        />
        <CarCardGrad
          year={"2003"}
          car={"HONDA INTEGRA TYPE R"}
          pic="https://images.squarespace-cdn.com/content/v1/52d46dd9e4b0f63bcb07fa01/1463443586970-L33PR7Y7HBK976FITWM3/ke17ZwdGBToddI8pDm48kJNtMxC3rDmQuOI55F2ErCx7gQa3H78H3Y0txjaiv_0fLkOtoHUu4B9R8Nt6NbetHSV9WTgWwfk9yasjiNkB2fTCymRobbOSc4QzIFcHiIlrOqpeNLcJ80NK65_fV7S1UbG40Do1_0TucbEFNxg42hd4eb73n72px0CKWDW9DnoxfwcHgyDlTH9Ywc0XQb4vJw/Header+%281+of+1%29.jpg?format=2500w"
        />
        <CarCardGrad
          year={"1993"}
          car={"HONDA NSX"}
          pic="https://www.motorious.com/content/images/2020/07/1991-honda-nsx.jpg"
        />
        <CarCardGrad
          year={"1991"}
          car={"SUZUKI CAPPUCCINO"}
          pic="https://bringatrailer.com/wp-content/uploads/2018/04/15241452442a67856724221e1523929549495d565ef66eIMG_9682-1.jpg?fit=940%2C627"
        />
        <CarCardGrad
          year={"1999"}
          car={"MAZDA RX7"}
          pic="https://upload.wikimedia.org/wikipedia/commons/1/10/Tuned_Mazda_RX-7_Type_RB_%28GF-FD3S%29_front.jpg"
        />
        <CarCardGrad
          year={"2018"}
          car={"FERRARI 488"}
          pic="https://cdn.motor1.com/images/mgl/vyjQb/s1/ferrari-488-pista-prova-sul-circuito-di-fiorano.jpg"
        />
        <CarCardGrad
          year={"2017"}
          car={"PORSCHE 911 GT2 RS"}
          pic="https://www.classicdriver.com/sites/default/files/cars_images/feed_737498/2e45dab15a3b6b1af9a4aa89f93810be54451f3d.jpg"
        />
      </div>
    );
  }
}

export default CarCardContainer;
