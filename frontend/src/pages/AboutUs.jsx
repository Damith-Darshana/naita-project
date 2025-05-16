import TopBar from "../components/TopBar/TopBar";
import Navbar from "../components/Navbar/Navbar";



export default function AboutUs(){
    return(
      <div>
        <TopBar/>
        <Navbar/>
        <div className="rectangle-bg bg-red-600 w-[1920] h-[724] ">
          <div className="">
            <h1> about us</h1>
            <p>"NAITA is dedicated to shaping the future of Sri Lanka by fostering innovation and skill development. Our mission is to create opportunities for growth, collaboration, and excellence in every field."
            Let me know if you’d like further refinements</p>

        

          </div>
        </div>
      </div>

    )
}