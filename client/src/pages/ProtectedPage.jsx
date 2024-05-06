import { useAppContext } from "../context/Context";
import { ReactTyped } from "react-typed";
import { NotAnAdminPage } from "./";

export default function ProtectedPage({children, condition=undefined, adminCondition=undefined}) {
  const { wallet, admin } = useAppContext();

  
  if(condition === undefined ? wallet : condition) {
    if(adminCondition === undefined ? admin : adminCondition) 
      return children;
    else 
      return <NotAnAdminPage />
  }
  return (
    <section className="w-full h-full flex flex-col gap-12 justify-around items-center">
      <div className="w-fit min-w-[30vw]">
        <ReactTyped 
          className="pl-8 text-4xl font-bold text-center w-full flex items-end" 
          strings={["Please <span class='text-color-1'>Login</span> to Proceed."]}
          typeSpeed={35}
          showCursor={false}
        />
      </div>
      <img src="/login.svg" alt="Please Login" className="w-[75vw] sm:w-[45vw] md:w-[35vw]"/>
    </section>
  );    
}

