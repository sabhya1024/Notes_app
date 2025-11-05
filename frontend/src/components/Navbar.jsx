import React from 'react'
import { Link } from 'react-router'
import { FaPlus } from "react-icons/fa";

const Navbar = () => {
  return (
      <header className='bg-base-300 border-b border-base-content/10'>
          <div className='mx-auto max-w-6xl px-4 py-4'>
              <div className='flex items-center justify-between'>
                  <h1 className='text-3xl font-bold text-primary font-mono -tracking-tight'> NOTES APP</h1>
                  <div className='flex items-center gap-4 pr-16 '>
                      <Link to={"/create"} className='btn btn-primary rounded-full'> <FaPlus className='h-5 w-5' />
                      <span className='text-[20px] p-1'>New Note</span></Link>
                    </div>
                  
                  


              </div>
          </div>



    </header>
  )
}

export default Navbar