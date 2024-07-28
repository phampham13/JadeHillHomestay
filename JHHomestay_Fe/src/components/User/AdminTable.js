import React, { useState, useEffect } from 'react';

import AdminCard from "./AdminCard"

function AdminTable(props){
    const [admin, setAdmin] = props.adminProps;
    const [reload,setReload] = props.reload;
    return (
        <div class="container mt-8 mb-5 mx-auto w-full px-4">
          <div className="mx-auto shadow overflow-hidden border-b border-gray-200 rounded-lg">
            <table className="w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gray-50">
                <tr>
                    <th
                      scope="col"
                      className="w-1/4 sticky px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Id
                    </th>
                    <th
                      scope="col"
                      className="w-1/6 sticky px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tên
                    </th>
                    <th
                      scope="col"
                      className="w-1/6 sticky px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="w-1/6 sticky px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Homestay Của Admin
                    </th>
                    <th 
                      scope="col" 
                      className="w-1/6 sticky px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <span className=""> Thông tin admin </span>
                    </th>
                    <th 
                      scope="col" 
                      className="w-1/12 relative px-6 py-3"
                    >
                      <span className="sr-only"> xóa </span>
                    </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {admin && admin.length ?
                admin.map(admin => (
                    <AdminCard detail = {admin} reload ={[reload,setReload]}/>
                )): null}
              </tbody>
            </table>
          </div>
        </div>
    )
}
export default AdminTable;