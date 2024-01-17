import {React, useState} from 'react'
import { Card } from 'antd';
import axios from 'axios';

import './popup.css'

const { Meta } = Card;

const Popup = ({data, handlePopup}) => {
    const [status, setStatus] = useState(null);

    const btnExitClick = () => {
        handlePopup(false);
    }

    const btnUpdateClick = () => {

    }

    const handleStatus = () => {
        const update = {
            PROCESSING: !status.PROCESSING,
            SUCCESS: !status.SUCCESS
        };
        console.log("status: ", update)
        setStatus(update);
    }
    return (
    <div className='popup'>
        <div className="card-popup">
            <Card hoverable >
                <div className="card-info">
                    <Meta title="Người gửi" description={data?.fullname}/>
                    <div className="info">
                        <Meta title="Ngày gửi" description={data?.created} />
                        <Meta title="Loại hình" description={data?.reporttype_name} />
                    </div>
                    <div className="status-info">
                        <Meta title="Tình trạng" 
                            description={
                                <button onClick={handleStatus} className={`btnStatus ${status.PROCESSING ? 'PROCESSING' : 'SUCCESS'}`}>
                                    {status.PROCESSING ? 'PROCESSING' : 'SUCCESS'}
                                </button>
                            }
                        />
                    </div>
                    <button onClick={btnUpdateClick} className='btnExit'>Update</button>
                    <button onClick={btnExitClick} className='btnExit'>Thoát</button>
                </div>
            </Card>
        </div>
    </div>
    )
}

export default Popup