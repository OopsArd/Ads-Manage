import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'antd';

import { CloseOutlined } from '@ant-design/icons'
import { fetchAds } from '../../redux/Slice/adsSlice';

import ReportLayout from '../Layout/ReportLayout/ReportLayout';

import './show.css'

const { Meta } = Card;

const ShowAds = ({ads, data, handleOpen, handleData}) => {

    const [isPopup, setPopup] = useState(false)
    const [dataOfAds, setDataOfAds] = useState(data.ads);
    const [dataSend, setDataSend] = useState(null);

    const btnExitClick = () => {
        handleData();
        handleOpen(false)
    }

    const btnReportClick = () => {
        if(data.ads){
            setDataSend(dataOfAds);
            setPopup(true);
            return
        }
        setDataSend(data);
        setPopup(true);
    }

    const handlePopup = (value) => {
        setPopup(value)
    }

  return (
    <>
        {isPopup && <ReportLayout data={dataSend} handlePopup={handlePopup}/>}
        <div className={`show-ads  ${isPopup ? 'overlay' : ''}`}>
            <div className="ads-form">
                <button className='btnExitDetail' onClick={btnExitClick}><CloseOutlined /></button>
                <Card className='info-location' title="Thông tin địa điểm ">
                    <Meta title="Tên:" description={data.name} />
                    <br/>
                    <Meta title="Địa chỉ:" description={data.address} />
                    <button className='btnReport' onClick={btnReportClick}>BÁO CÁO VI PHẠM</button>
                </Card>
                {ads ?
                    <div className="info-ads">
                         <Card className='info-location' title="Thông tin quảng cáo ">
                            <Meta title="Loại" description={ads.adstabletype_name} />
                            <br/>
                            <Meta title="Cao:" description={ads.height} />
                            <Meta title="Rộng:" description={ads.width} />
                            <Meta title="Ảnh:" description={ads.url} />
                            <button className='btnReport' onClick={btnReportClick}>BÁO CÁO VI PHẠM</button>
                        </Card>
                    </div>
                    :
                    <div>Không có thông tin quảng cáo</div>
                }
            </div>
        </div>
    </>
  )
}

export default ShowAds