import Vue from 'vue'
import Vuex from 'vuex'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
Vue.use(Vuex, FileSaver, XLSX)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    pageSizes: [20, 60, 80, 100],
    defaultPageSize: 20,
    uiSize: 'small',
    type: [{
      id: 1,
      name: '资产类型1'
    },
    {
      id: 2,
      name: '资产类型2'
    }],
    company: [{
      id: 1,
      name: '西安优逸客',
      children: [{
        id: 101,
        name: '实训部'
      },
      {
        id: 102,
        name: '人事部'
      }]
    },
    {
      id: 2,
      name: '山西优逸客',
      children: [{
        id: 201,
        name: '人事部'
      },
      {
        id: 202,
        name: '研发部'
      }]
    }],
    staff: [{
      id: 1,
      name: 'tony'
    }],
    admin: [{
      id: 1,
      name: 'sandy'
    }],
    address: [{
      id: 1,
      name: '办公室'
    }],
    source: [{
      id: 1,
      name: '购买'
    }],
    assets_type: [{
      type_id: 1,
      type_name: '土地,房屋及构筑物'
    },
    {
      type_id: 2,
      type_name: '电气设备'
    }]
  },
  mutations: {
    save_token (state, token) {
      localStorage.setItem('token', token)
      state.token = token
    },
    exportExcel () {
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.querySelector('.el-table'))
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(new Blob([wbout], {
          type: 'application/octet-stream'
        }), 'sheetjs.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    }
  },
  actions: {
  }
})
