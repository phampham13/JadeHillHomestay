const generalList = [
  {name: "Bể bơi", checked: false},
  {name: "Phòng karaoke", checked: false},
  {name: "Suối nước nóng", checked: false},
  {name: "Coffee bên hồ", checked: false},
  {name: "Dọn phòng", checked: false},
  {name: "Cho thuê xe tự lái", checked: false},
  {name: "Dịch vụ giặt ủi", checked: false},
  {name: "Massage trị liệu", checked: false},
  {name: "Xông hơi", checked: false},
  {name: "Thuê hướng dẫn viên du lịch", checked: false}
]

const GeneralServiceForm = (props) => {
  const [general, setGeneral] = props.generalProps;
  generalList.map(item => item.checked=false)
  general?.map(item1 => (
      generalList.map(item2 =>
        {
          if (item1.name===item2.name) item2.checked=true
        })
  ))  
  return (
    <div className="p-2 border-t ">
      <h1 className="font-bold h-6 mb-4 text-gray-600 text-sm leading-8 uppercase"> Dịch vụ chung </h1>
      <div className="grid grid-cols-2 gap-2 px-4">
      {generalList.map((item, index) => (
          <label class="text-gray-700">
            {!item.checked ?
            (<input 
                type="checkbox"
                value=""
                defaultChecked={false}
                onClick={(e) => {
                  generalList[index].checked=true
                  const temp=generalList.filter(i => i.checked===true)
                  setGeneral(temp)
                  console.log("checked",index, item.name)
                  console.log("list", generalList)
                  console.log("general", general);
                }}

            />) : (
              <input 
                  type="checkbox"
                  value=""
                  defaultChecked
                  onClick={() => {
                    generalList[index].checked=false;
                    const temp=generalList.filter(i => i.checked===true)
                    setGeneral(temp)
                    console.log("unchecked", index, item.name)
                    console.log("list", generalList)
                    console.log("general", temp);
                  }}
              />
            )
            }
            <span class="ml-2">{item.name}</span>
            
          </label>
        ))}
      </div>
    </div>
  );
};

export default GeneralServiceForm;