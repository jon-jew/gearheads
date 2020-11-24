import React from "react";

import CarCardGrad from "./CarCard/CarCard.js";
import pic from "../mr2.jpg";
import pic2 from "../download.jpg";

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
          pic="https://cdn.motor1.com/images/mgl/y8Krb/s1/honda-integra-type-r-dc5.jpg"
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
