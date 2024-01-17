import {React, useState} from 'react'
import {  Layout, Menu } from 'antd';

import Mapbox from '../../components/Mapbox/Mapbox';
import AdsManage from '../AdsManage/AdsManage';
import ReportsManage from '../ReportsManage/ReportsManage';
import EditAds from '../EditAds/EditAds';
// import AdsProvider from '../AdsProvider/AdsProvider';
import {
  HomeOutlined,
  UnorderedListOutlined,
  FormOutlined,
} from '@ant-design/icons';

import './phuong.css'

const {  Content, Sider } = Layout;

function getItem(label, key, path, icon, children) {
  return {key, icon, children, label, path};
}

const HomePage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [render, setRender] = useState(1);

    const items = [
      getItem('Trang chủ', '1','/', <HomeOutlined />),
      getItem('Quản lý QC', '2','/ads-manage', <UnorderedListOutlined />),
      getItem('Cập nhật QC', '3','/update-ads', <FormOutlined />),
      getItem('Quản lý RP', '4','/reports-manage', <UnorderedListOutlined />),
      // getItem('Xin cấp phép QC', '5','/reports-manage', <UnorderedListOutlined />),
      // getItem('Xin cấp phép QC', '6','/reports-manage', <UnorderedListOutlined />),
      //getItem('Quản lý RP', '4','/reports-manage', <UnorderedListOutlined />),
      //getItem('Đăng xuất', '5','/logout', <UnorderedListOutlined />),
    ];

    const components = {
      1: <Mapbox />,
      2: <AdsManage />,
      3: <EditAds />,
      4: <ReportsManage />
      // 5: <AdsProvider />
    };

    // const handleMenuClick = (item) => {
    //     console.log("key:", item.path); 
    // }

    const handleSelectKey = (item) => {
      setRender(item.key)
    }

  return (
    <div className="side-bar">
        <Layout style={{ minHeight: '100vh',}}>
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <Menu theme="dark" onSelect={handleSelectKey} defaultSelectedKeys={['1']} mode="inline" items={items}/>
          </Sider>
          <Layout>
            <Content>
              { components[render] }
            </Content>
          </Layout>
        </Layout>
    </div>
  )
}

export default HomePage