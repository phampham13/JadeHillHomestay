const UserData = ({ userData, accompanyData }) => {
  return (
    <div className="border-b">
      <h1 className="text-xl font-medium">Thông tin khách hàng</h1>
      <div className="px-16 py-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="">Họ và tên:</h3>
          <p>{userData.name}</p>
        </div>
        <div className="flex items-center justify-between mb-1">
          <h3 className="">Email:</h3>
          <p>{userData.email}</p>
        </div>
        <div className="flex items-center justify-between mb-1">
          <h3 className="">Số chứng minh nhân dân:</h3>
          <p>{userData.identification}</p>
        </div>
        <div className="flex items-center justify-between mb-1">
          <h3 className="">Số điện thoại:</h3>
          <p>{userData.phoneNumber}</p>
        </div>
        <div className="flex justify-between mb-1">
          <h3 className="">Danh sách khách hàng đi cùng:</h3>
          <ul className="text-right">
            {accompanyData.map((user) => (
              <li>
                {user.name}, {user.age}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserData;
