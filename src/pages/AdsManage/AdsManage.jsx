import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAds } from '../../redux/Slice/adsSlice'

import './adsmanage.css'

const AdsManages = () => {
    const dispatch = useDispatch();
    const ads = useSelector(state => state.ads.ads)

    const [listAds, setList] = useState(ads)

    useEffect(() => {
        dispatch(fetchAds(21));
    },[dispatch])

    useEffect(() => {
        if(ads){
            const data = {
                key: ads.id,
                adstabletype_name: ads.adstabletype_name,
                height: ads.height,
                width: ads.width,
                url: ads.url,
                ads_company_id: ads.ads_company_id,
                start_date: ads.start_date,
                end_date: ads.end_date
            }
            setList(data)
        }
    },[ads])

    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'stt',
        },
        {
            title: 'Loại',
            dataIndex: 'adstabletype_name',
            key: 'adstabletype_name',
        },
        {
            title: 'Cao',
            dataIndex: 'height',
            key: 'height',
        },
        {
            title: 'Rộng',
            dataIndex: 'width',
            key: 'width',
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'start_date',
            key: 'start_date',
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'end_date',
            key: 'end_date',
        },
    ];
    return (
    <div className='ads-manage'>
        <h1>Danh sách bảng quảng cáo</h1>
        <Table columns={columns} dataSource={listAds} />
    </div>
    )
}

export default AdsManages