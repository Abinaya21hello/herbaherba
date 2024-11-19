import React from "react";
import Doctor from "../../assets/images/footer/bgbanner.png";
import SolutionStep from "./SolutionStep";
import "./style.css";

function About() {
  return (
    <> 
           <div className="bg-breadcrumbabout">
        <div className="container text-center py-5" style={{ maxWidth: 900 }}>
           <h3
            className="text display-3 mb-4 wow fadeInDown"
            style={{
              fontWeight: "600",
              fontSize: "clamp(2rem, 5vw, 7vw)", // Use clamp for responsive font size
              color: "black",
            }}
            data-wow-delay="0.1s"
          >
            About Us
          </h3>
        </div>
      </div>
    
    
    <div className="about-section" id="about">
    <div className="about-image-content">
      <img src={Doctor} alt="Doctor Group" className="about-image1" />
    </div>

    <div className="about-text-content">
      <h3 className="about-title">
        <span style={{ fontFamily: "Arial" }}>Our Vision</span>

      </h3>
      <p className="about-description" style={{fontSize:"26px"}}>
        Welcome to Health Plus, your trusted partner for accessible and
        personalized healthcare. Our expert doctors offer online consultations
        and specialized services, prioritizing your well-being. Join us on
        this journey towards a healthier you.
      </p>

      {/* <h4 className="about-text-title">Your Solutions</h4> */}

      <SolutionStep
        title="Center of Excellence for Herbs"
        description=" To be the Center of Excellence for herbs." 

      />

      <SolutionStep
        title="Innovation & Sustainability"
        description=" To lead the Industry in Technological Innovations,developing Production techniques to achieve sustainable efficiency."
      />

      <SolutionStep
        title="Optimized Supply Chain"
        description="To continually develop and optimise the groups vertically integrated supply chain.
"
      />
    </div>
  </div>
    <div className="about-section" id="about">
  

    <div className="about-text-content">
      <h3 className="about-title">
        <span>Our Mission</span>
      </h3>
      <p className="about-description" style={{fontFamily:"Gill Sans MT", color:"black", fontSize:"26px"}}>
        Welcome to Health Plus, your trusted partner for accessible and
        personalized healthcare. Our expert doctors offer online consultations
        and specialized services, prioritizing your well-being. Join us on
        this journey towards a healthier you.
      </p>

      {/* <h4 className="about-text-title">Your Solutions</h4> */}

      <SolutionStep
        title="Quality Seasonings for Health"
        description="We grow and sell quality, fresh seasoning products and improve the consumer's healthy lifestyle."
      />

      <SolutionStep
        title="Highest Quality Products"
        description="We grow the highest quality herbs and increase market value across India. 
"
      />

      <SolutionStep
        title="Innovative Products and Packaging"
        
        description="We aim to introduce innovative new products and packaging."
      />
    </div>
    <div className="about-image-content">
      <img src={Doctor} alt="Doctor Group" className="about-image1" />
    </div>
  </div></>
   
  );
}

export default About;
