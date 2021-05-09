import React, { useState} from 'react';
import { DataGrid, useGridSlotComponentProps } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const FONT_SIZE = "0.85rem";
const FULL_SIZE = "100%";

const useStyles = makeStyles(() => ({
  gridForm: {
      height: 300,
      width: 800
  },
  dataGrid: {
      fontSize: FONT_SIZE,
      '& input[type="checkbox"]': {
          height: FULL_SIZE
      }
  },
  formControl: {
    minWidth: FULL_SIZE,
    '& > div': {
      fontSize: FONT_SIZE
    }
  },
  formControlLabel: {
    '& .MuiFormControlLabel-label': {
      fontSize: FONT_SIZE
    }
  },
  textField: {
    minWidth: FULL_SIZE,
    '& > div': {
      fontSize: FONT_SIZE,
      '& > input': {
        height: FULL_SIZE
      }
    }
  }
}));

  export default function DataGridTable(props) {
    const {ChangeMenus, MenuList, ModuleList} = props;
    const classes = useStyles();

    const getMenu = (id) => {
      return MenuList.find(x => x.MenuId === id);
    };

    const statusCell = (params) => (
      <FormControlLabel className={classes.formControlLabel}
        control={
          <Switch
            checked={params.value}
            onChange={(event) => {
              const tmpMenu = getMenu(params.id);
              tmpMenu.IsEnabled = event.target.checked;
              ChangeMenus([...MenuList]);
            }}
            color="primary"
          />
        }
        label={(params.value) ? "Active" : "InActive"}
      />
    );

    const moduleCell = (params) => (
      <TextField className={classes.formControl}
      select
      value={params.getValue("ModuleId")}
      onChange={(event) => {
        const tmpMenu = getMenu(params.id);
        tmpMenu.ModuleId = event.target.value;
        tmpMenu.ModuleName = ModuleList.find(x => x.ModuleId === tmpMenu.ModuleId).ModuleName;
        ChangeMenus([...MenuList]);
        }}
      > 
      {ModuleList.map((item) => (
        <MenuItem key={item.ModuleId} value={item.ModuleId}> {item.ModuleName}
        </MenuItem>
      ))}
    </TextField> 
    );

    const menuNameCell = (params) => (
      <TextField className={classes.textField}
          defaultValue={params.value}
          onChange={(event) => {
            const tmpMenu = getMenu(params.id);
            tmpMenu.MenuName = event.target.value;
          }}
        />
    );
  
  const columns = [
      { field: 'MenuId', headerName: 'Menu ID', sortable: false, flex: 0.25, disableClickEventBubbling: true },
      { field: 'MenuName', headerName: 'Menu Name', sortable: false, flex: 0.25, renderCell: menuNameCell, disableClickEventBubbling: true },
      { field: 'ModuleName', headerName: 'Module', sortable: false, flex: 0.25, renderCell: moduleCell, disableClickEventBubbling: true },
      { field: 'IsEnabled', headerName: 'IsEnabled', sortable: false, flex: 0.25, renderCell: statusCell, disableClickEventBubbling: true }
    ];

    return (
      <div className={classes.gridForm}>
         <DataGrid className={classes.dataGrid} 
          rows={MenuList} getRowId ={(row) => row.MenuId}
          columns={columns}
          checkboxSelection 
          disableColumnMenu />
      </div>
    );
  }