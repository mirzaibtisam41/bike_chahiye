import React from "react";
import honda from "../../images/honda.png";
import bmw from "../../images/bmw.png";
import yamaha from "../../images/yamaha.png";
import suzuki from "../../images/suzuki.png";
import qingqi from "../../images/qingqi.png";
import "../../css/component.css";

const BrandPoster = () => {
  return (
    <div>
      <div className="section-6">
        <div className="row p-3 d-flex align-items-center">
          <div className="col">
            <img className="img-fluid" width={100} src={honda} alt="" />
          </div>
          <div className="col">
            <img className="img-fluid" width={100} src={suzuki} alt="" />
          </div>

          <div className="col">
            <img className="img-fluid" width={100} src={qingqi} alt="" />
          </div>
          <div className="col">
            <img className="img-fluid" width={100} src={bmw} alt="" />
          </div>
        </div>
        <div className="row p-3 d-flex align-items-center">
          <div className="col">
            <img className="img-fluid" width={100} src={suzuki} alt="" />
          </div>
          <div className="col">
            <img className="img-fluid" width={100} src={yamaha} alt="" />
          </div>
          <div className="col">
            <img className="img-fluid" width={100} src={qingqi} alt="" />
          </div>
          <div className="col">
            <img className="img-fluid" width={100} src={bmw} alt="" />
          </div>
        </div>
        <div className="row p-3 d-flex align-items-center">
          <div className="col">
            <img className="img-fluid" width={100} src={honda} alt="" />
          </div>
          <div className="col">
            <img className="img-fluid" width={100} src={suzuki} alt="" />
          </div>
          <div className="col">
            <img className="img-fluid" width={100} src={yamaha} alt="" />
          </div>
          <div className="col">
            <img className="img-fluid" width={100} src={qingqi} alt="" />
          </div>
        </div>
        <div className="row p-3 d-flex align-items-center">
          <div className="col">
            <img className="img-fluid" width={100} src={suzuki} alt="" />
          </div>
          <div className="col">
            <img className="img-fluid" width={100} src={yamaha} alt="" />
          </div>
          <div className="col">
            <img className="img-fluid" width={100} src={qingqi} alt="" />
          </div>
          <div className="col">
            <img className="img-fluid" width={100} src={bmw} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandPoster;
