"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import patternDivider from "../../public/images/pattern-divider-desktop.svg"
import diceIcon from "../../public/images/icon-dice.svg"


export default function Home() {
 const [advicePack, setAdvicePack] = useState([]);
 const [isLoading, setIsLoading] = useState(false);

 const getAdvice = async () => {
  try {
    setIsLoading(true)
    const response = await axios.get("https://api.adviceslip.com/advice");
    setAdvicePack(response.data.slip);
  } catch(err){
    console.log(err.response.data.message)
  } finally{
    setIsLoading(false)
  }

}

console.log("I am Advice Pack", advicePack)

useEffect( () => {
  getAdvice()
}, [] )


  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="rounded-2xl relative  w-[40%] bg-darkGrayishBlue flex flex-col justify-center items-center p-10">
        <div className="flex flex-col justify-center items-center gap-5 mb-12">
          {
            !isLoading ? (
              <>
               <span className="uppercase font-bold text-neonGreen ">{`ADVICE # ${advicePack.id}`}</span>
                <div>
                  <p className="text-center text-lightCyan font-bold text-2xl">
                    &quot;{advicePack.advice}&quot; 
                  </p>  
                </div>
                <span>
                 <Image src={patternDivider} alt="" />
                </span>
              </> 
            ): 
              <p className="text-white font-bold">We are fetching your advice</p> 

          }
         
        </div>
        

        <div className="rounded-full  flex justify-center items-center absolute top-[90%] bg-neonGreen w-14 h-14">
          <span className="cursor-pointer">
            <Image src={diceIcon} onClick={() => getAdvice()} alt="dice icon" />
          </span>
        </div>
      </div>
    </div>
  );
}
