import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import Popup from '../../components/Popup/Popup'
import { useSelector, useDispatch } from 'react-redux'
import { fetchReports } from '../../redux/Slice/reportSlice'

import './reports.css'

const ReportsManage = () => {
    const dispatch = useDispatch();
    const reports = useSelector(state => state.reports.reports)

    const [listReports, setList] = useState(null);
    const [dataRow, setDataRow] = useState();
    const [isOpen, setOpen] = useState(false);

    const handleRowClick = (row) => {
        console.log("row: ", row);
        setDataRow(row);
        handleOpen(true);
    }

    const handleOpen = (value) => {
        setOpen(value);
    }

    useEffect(() => {
        dispatch(fetchReports())
    }, [dispatch])
    useEffect(() => {
        if(reports){
            const data = reports.map(report => {
                return {
                    key: report.id,
                    reporttype_name: report.reporttype_name,
                    fullname: report.fullname,
                    adress: report.wards_fullname + "/" + report.districts_fullname,
                    created: report.created,
                    processed: report.processed
                }})
            setList(data)
        }
    }, [reports])

    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'stt',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Người gửi',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Thời gian gửi',
            dataIndex: 'created',
            key: 'created',
        },
        {
            title: 'Loại hình báo cáo',
            dataIndex: 'reporttype_name',
            key: 'reporttype_name',
        },
    ];

    return (
        <>
        { isOpen && <Popup data={dataRow} handleOpen={handleOpen} /> }
            <div className={`reports-manage  ${isOpen ? 'overlay' : ''}`}>
                <h1>Danh sách báo cáo</h1>
                <Table columns={columns} dataSource={listReports} 
                    onRow={(row) => ({
                        onClick: () => {handleRowClick(row)}
                    })} 
                />
            </div>
        </>
        
    )
}

export default ReportsManage