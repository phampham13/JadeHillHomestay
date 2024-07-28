import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../Homestay/CreateHomestay/Modal';
import axios from 'axios';
import Pagination from '../Homestay/Pagination';

import HomestayTable from "../Homestay/HomestayTable"
function Homestay() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null)
  const perPage = 15
  const [reload, setReload] = useState()
  const [homestays, setHomestays] = useState([])
  const { token } = useSelector((state) => state.authReducer);
  const role = useSelector((state) => state.authReducer.role);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if (homestays === undefined) return;
      setIsLoading(true);
      try {
        const { data: response } = await axios.get('http://localhost:8000/super-admins/homestays', {
          headers: {
            Authorization: "Bearer " + token
          }
        });
        setTotalPage(Math.ceil(response.content.length / perPage))
      }

      catch (error) {
        console.error(error.message);
      };

      try {
        const { data: response } = await axios.get('http://localhost:8000/super-admins/homestays', {
          params: { page: currentPage, perPage: perPage },
          headers: {
            Authorization: "Bearer " + token,
          }
        });
        setHomestays(response.content)
        setIsLoading(false);
        setReload(false)
        //console.log(response.content)
      }
      catch (error) {
        setIsLoading(false);
        console.error(error.message);
      }
    }
    fetchData()
  }, [currentPage, perPage, reload])

  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <div>
      {role === "super_admin" ? (<div>
        <button
          className="
                mx-2 my-2 px-3 py-2
                border-2 border-gray-200 
                rounded-lg
                text-sm
                transition duration-150 ease-in-out 
                hover:border-gray-300"
          onClick={() => setIsOpen(true)}
        >
          + Thêm Homestay
        </button>
        <Modal openProps={[isOpen, setIsOpen]} reload={[reload, setReload]} />
      </div>) : null}

      {isLoading ? (
        <div className="flex justify-center mt-6">
          <div
            className="w-16 h-16 border-8 border-green-400 rounded-full border-solid animate-spin"
            style={{ borderTop: "8px solid transparent" }}
          />
        </div>
      ) : (
        <div className='pb-10'>
          <HomestayTable
            homestaysProps={[homestays, setHomestays]}
            reload={[reload, setReload]}
          />
          <Pagination
            totalPage={totalPage}
            paginate={paginate}
          />
          <p className="text-center text-green-800"> Page {currentPage} of {totalPage} </p>
        </div>
      )}
    </div>
  )

}

export default Homestay