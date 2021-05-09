import React, { useState } from 'react';
import DataGridTable from './datagrid';

function App() {
    const [menuList, setMenuList] = useState([
      {
          "ModuleId": "Module1",
          "ModuleName": "User",
          "MenuId": "001",
          "MenuName": "User settings",
          "IsEnabled": true
      },
      {
          "ModuleId": "Module2",
          "ModuleName": "Role",
          "MenuId": "002",
          "MenuName": "Role settings",
          "IsEnabled": false
      }
      ]);
    const moduleList = [{ModuleId:"Module1",ModuleName:'User'},{ModuleId:"Module2",ModuleName:'Role'}]

    return (
      <DataGridTable MenuList={menuList} ModuleList={moduleList} ChangeMenus={setMenuList} />
    );
}

export default App;
