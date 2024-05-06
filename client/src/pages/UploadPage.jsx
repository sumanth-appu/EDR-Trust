import { useEffect, useState } from "react"
import { ListComponent, LoadingWrapper, SearchFilter } from "../components"
import { useAppContext } from "../context/Context"
import { Link } from "react-router-dom";
import { ReactTyped } from "react-typed";

export default function UploadPage() {
  let { records, admin } = useAppContext();
  const [localRecords, setLocalRecords] = useState(records)
  
  useEffect(()=>{
    setLocalRecords(records);
  },[records]);

  const search = (value)=>{
    const reName = new RegExp(value.studentName, 'i')
    const reId = new RegExp(value.studentId, 'i')
    const temp = records?.filter(el=>( reName.test(el.studentName) && reId.test(el.studentId.toString()) ))
    setLocalRecords(temp)
  }
  
  return (
    <LoadingWrapper condition={records===undefined}>
      <div className="w-full flex flex-col justify-between px-[2rem] relative">    
          <div className="flex justify-between items-stretch">
            <div className="hidden lg:block">
              <div className="sticky left-0 top-[28vh] border rounded-3xl border-black p-10">
                <img className="md:w-[20vw] lg:w-[25vw] mb-16" src="/Add record.svg" alt="Add Student" />
                {
                  admin ? 
                  <Link to="/records/add" className="w-full btn p-2 px-2.5 rounded-lg text-white text-center hover:scale-[1.04]">
                    Add student +
                  </Link>
                  :
                  <ReactTyped 
                    className="w-full flex justify-center text-xl text-primary" 
                    strings={["Login to add student"]} 
                    showCursor={true}
                    typeSpeed={70}
                  />
                }
              </div>
            </div>
    
            <div className="flex flex-col gap-2 w-full lg:basis-[60%]">
              <div className="w-full p-2 flex justify-between items-center gap-2 btn border-primary rounded-xl text-white ">
                <img src="/search.svg" className="w-6 sm:w-8 h-6 sm:h-8 mr-2  rounded-l-xl" alt="search" />
                <form className="w-full p-1 flex flex-wrap">
                  <SearchFilter 
                    classNames="w-full flex-wrap md:flex-nowrap"
                    searchFunc={search} 
                    labels={["Student Name", "Student ID"]}
                    names={["studentName", "studentId"]}
                  />
                </form>
              </div>
    
              <ul className="mt-4">
                {
                  admin && 
                  <Link to="/records/add" className="block lg:hidden w-full  p-2 mb-4 rounded-lg text-base sm:text-xl md:text-2xl text-white text-center hover:scale-[1.04]">
                    Add a new student +
                  </Link>
                }
                {
                  localRecords?.map((student, indx)=>
                    <ListComponent 
                      heading={student.studentName}
                      id={student.studentId}
                      key={indx} 
                      to={`/records/${student.studentId}`}
                    />
                  )
                }
              </ul>
            </div>
              
          </div>
      </div>
    </LoadingWrapper>
  );
}