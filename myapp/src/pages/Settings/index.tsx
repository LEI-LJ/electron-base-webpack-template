import React from 'react';
import {PageContainer, ProCard} from "@ant-design/pro-components";


const Settings: React.FC = () => {
  return (
    <div className='settings'>
      <PageContainer header={{
        title: '设置'
      }}>
        <ProCard></ProCard>
      </PageContainer>
    </div>
  );
};

export default Settings;
