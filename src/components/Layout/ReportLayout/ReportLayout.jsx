import React,{useState, useEffect} from 'react'
import FloatInput from '../../FloatInput/FloatInput'
import { useSelector, useDispatch } from 'react-redux';
import { addReport } from '../../../redux/Slice/reportSlice';

import './report.css'

const ReportLayout = ({data, handlePopup}) => {
    const dispatch = useDispatch();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [content, setContent] = useState();


    const [dataReport, setDataReport] = useState(null);

    const handleInputName = (value) => {
        setName(value);
    }
    const handleInputEmail = (value ) => {
        setEmail(value)
    }
    const handleInputPhone = (value ) => {
        setPhone(value)
    }
    const handleInputContent = (value ) => {
        setContent(value)
    }

    const btnExitClick = () => {
        handlePopup(false)
    }

    const btnAcceptClick = () => {
        const dataReport = {
            full_name: name,
            email: email,
            phone_number: phone,
            report_content: content,
            lat: data.lat,
            lng: data.lng,
            districts_fullname: data.districts_fullname,
            wards_fullname: data.wards_fullname,
        }
        console.log("data send to sv: ", data)
        dispatch(addReport(dataReport));
    }


  return (
    <div className='popup'>
        <div className="card-popup">
            <h1>Gửi Báo Cáo Vi Phạm</h1>
            <FloatInput handleInput={handleInputName} label="Tên người thực hiện" placeholder="Tên người thực hiện" name="name"/>
            <FloatInput handleInput={handleInputEmail} label="Email" placeholder="Email" name="email" type='email'/>
            <FloatInput handleInput={handleInputPhone} label="Số điện thoại" placeholder="Số điện thoại" name="Số điện thoại" type='tel'/>
            <FloatInput handleInput={handleInputContent} label="Nội dung báo cáo" placeholder="Nội dung báo cáo" name="content"/>
            <button onClick={btnAcceptClick} className='btnAccept'>Xác nhận</button>
            <button onClick={btnExitClick} className='btnExit'>Thoát</button>
        </div>
    </div>
  )
}

export default ReportLayout