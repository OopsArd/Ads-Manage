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
            const data = ads.map(item => {
                return {
                    key: item.id,
                    adstabletype_name: item.adstabletype_name,
                    height: item.height,
                    width: item.width,
                    url: item.url,
                    ads_company_id: item.ads_company_id,
                    start_date: item.start_date,
                    end_date: item.end_date
                }})
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
        {listAds.length > 0 ? <Table columns={columns} dataSource={listAds} /> : <h3>Không có thông tin quảng cáo</h3>}
    </div>
    )
}

export default AdsManages