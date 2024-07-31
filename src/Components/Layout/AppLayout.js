import React from 'react';
import MiniDrawer from '../Header/SideBar';

const AppLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
     <MiniDrawer/> 
      <main style={{ flexGrow: 1, overflow: 'auto',backgroundColor:'#F2F5FF' }}>
        {children}
      </main>
    </div>
  );
}

export default AppLayout;
