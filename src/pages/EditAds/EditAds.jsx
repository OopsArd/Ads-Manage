import {React, useState, useEffect} from 'react'
import FloatInput from '../../components/FloatInput/FloatInput'
import { Card } from 'antd';

import './edit.css'

const { Meta } = Card;

const EditAds = () => {
    const [ads, setAds] = useState();
    const [address, setAddress] = useState();
    const [area, setArea] = useState();
    const [type, setType] = useState();
    const [adsvertising, setAdsvertising] = useState();
    const [reason, setReason] = useState();
    const [date, setDate] = useState();

    const handleInputAddress = (value) => {
        setAddress(value);
    }

    const handleInputArea = (value) => {
        setArea(value);
    }

    const handleInputType = (value) => {
        setType(value);
    }

    const handleInputAdsvertising = (value) => {
        setAdsvertising(value);
    }

    const handleInputW = (value) => {
        setReason(value);
    }

    const handleCheck = () => {
        // GET info ads by address
        // update ads to show in UI

    }

    const handleUpdate = () => {
        const newInfo = {
            address: address,
            type: type,
            area: area,
            adsvertising_type: adsvertising
        }
        console.log("new info: ", newInfo);
        // POST to API update

    }

    useEffect(() => {
        const currentDate = new Date();
  
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Note: Months are zero-indexed
        const year = currentDate.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;
        setDate(formattedDate);
    }, [])

    return (
    <div className='edit-ads'>
        <h1>Cập nhật thông tin quảng cáo</h1>
        <FloatInput className="input_address" handleInput={handleInputAddress} label="Địa chỉ quảng cáo" placeholder="Địa chỉ quảng cáo" name="address" />
        <button onClick={handleCheck} className='btnCheck'>Kiểm tra</button>
        {
            ads && 
            <Card hoverable title="Thông tin quảng cáo" cover={<img alt="hình ảnh minh họa ads.image" src="" />}>
                <div className="card-info">
                    <Meta title="Địa chỉ" description="Lorem ipsum..."/>
                    <Meta title="Khu vực" description="Lorem ipsum..." />
                    <Meta title="Loại vị trí" description="Lorem ipsum..." />
                    <Meta title="Hình thức quảng cáo" description="Lorem ipsum..." />
                </div>
            </Card>
        }
        <div className="edit-form">
            <h3>Thông tin sửa chữa</h3>
            <div className="date">
                <span>Ngày thực hiện: </span><span>{date}</span>
            </div>
            <FloatInput className="input_area" handleInput={handleInputArea} label="Thông tin khu vực" placeholder="Thông tin khu vực" name="area" />
            <FloatInput className="input_type" handleInput={handleInputType} label="Loại vị trí" placeholder="Loại vị trí" name="type" />
            <FloatInput className="input_adsvertising" handleInput={handleInputAdsvertising} label="Hình thức" placeholder="Hình thức" name="adsvertising" />
            <FloatInput className="input_w" handleInput={handleInputW} label="Lý do xin xin sữa chữa" placeholder="Lý do xin xin sữa chữa" name="w" />
            <button onClick={handleUpdate} className='btnUpdate'>Cập nhật thông tin</button>
        </div>

        
    </div>
    )
}

export default EditAds