<template>
  <div>
    <Breadcrumb></Breadcrumb>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="资产登记" name="active">
          <el-row>
            <el-col :span="18">
              <el-button type="primary" icon="el-icon-plus" size="small" @click="addDialogs">新增</el-button>
              <el-button type="danger" icon="el-icon-delete" size="small" @click="delDialogs">删除</el-button>
              <el-dropdown split-button type="primary" size="small" style="margin-left:10px">
                <i class="el-icon-printer"></i>
                导入导出
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>下载导入模板</el-dropdown-item>
                  <el-dropdown-item divided>批量导入资产</el-dropdown-item>
                  <el-dropdown-item divided @click="exportExcel">导出资产</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown split-button type="primary" size="small" style="margin-left:10px">
                <i class="el-icon-printer"></i>
                打印
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>打印资产标签</el-dropdown-item>
                  <el-dropdown-item divided>打印资产卡片</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
            <el-col :span="6">
              <div>
                <el-input
                  placeholder="请输入内容"
                  v-model="search"
                  class="input-with-select"
                  size="small"
                >
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <!-- 资产表格 -->
      <el-table
        :data="registerData"
        border
        style="width: 100%"
        align="center"
        @selection-change="delSelectionChange"
      >
        <el-table-column fixed="left" type="selection" width="30"></el-table-column>
        <el-table-column prop="status" label="资产状态" width="100" align="center">
          <template slot-scope="scope">
            <da-assets-state :status="scope.row.status"></da-assets-state>
          </template>
        </el-table-column>
        <el-table-column prop="bar_code" label="资产条码" width="150"></el-table-column>
        <el-table-column prop="name" label="资产名称" width="120"></el-table-column>
        <el-table-column prop="type_id" label="资产类型" width="100"></el-table-column>
        <el-table-column prop="specification" label="规格型号" width="100"></el-table-column>
        <el-table-column prop="sn" label="产品序列" width="100"></el-table-column>
        <el-table-column prop="money" label="金额" width="100">
          <template slot-scope="scope">{{scope.row.money | currency}}</template>
        </el-table-column>
        <el-table-column prop="company" label="使用公司" width="100"></el-table-column>
        <el-table-column prop="department" label="使用部门" width="100"></el-table-column>
        <el-table-column prop="purchase_time" label="购买时间" width="150">
          <template slot-scope="scope">{{scope.row.purchase_time | date}}</template>
        </el-table-column>
        <el-table-column prop="user_id" label="使用人" width="100"></el-table-column>
        <el-table-column prop="manager_id" label="管理员" width="100"></el-table-column>
        <el-table-column prop="address" label="存放地点" width="100"></el-table-column>
        <el-table-column prop="duration_use" label="使用期限" width="100"></el-table-column>
        <el-table-column prop="source" label="来源" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="seeDialog(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="editDialogs(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="$store.state.pageSizes"
        :page-size="$store.state.defaultPageSize"
        layout="sizes, prev, pager, next"
        :total="400"
        background
      ></el-pagination>
    </el-card>
    <!-- 新增资产表单 -->
    <el-dialog title="资产登记" :visible.sync="addDialogTableVisible" width="80%">
      <el-tabs tab-position="left">
        <el-tab-pane label="基本信息">
          <el-form
            :model="addDialog"
            class="demo-form-inline"
            :size="$store.state.uiSize"
            label-width="80px"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item label="资产条码">
                  <el-input placeholder="资产条码" v-model="addDialog.bar_code" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="资产名称">
                  <el-input placeholder="资产名称" v-model="addDialog.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="资产类型">
                  <el-select placeholder="资产类型" v-model="addDialog.type_id">
                    <el-option
                      v-for="v in $store.state.type"
                      :key="v.id"
                      :label="v.name"
                      :value="v.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="规格型号">
                  <el-input placeholder="规格型号" v-model="addDialog.specification"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="SN号">
                  <el-input placeholder="SN号" v-model="addDialog.sn"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="计量单位">
                  <el-input placeholder="计量单位" v-model="addDialog.metering"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="金额">
                  <el-input placeholder="金额" v-model="addDialog.money"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="使用公司">
                  <el-select placeholder="使用公司" v-model="addDialog.company">
                    <el-option
                      v-for="v in $store.state.company"
                      :key="v.id"
                      :label="v.name"
                      :value="v.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="使用部门">
                  <el-select placeholder="使用部门" v-model="addDialog.department">
                    <el-option
                      v-for="v in $store.state.department"
                      :key="v.id"
                      :label="v.name"
                      :value="v.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="购买时间">
                  <el-date-picker v-model="addDialog.purchase_time" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="使用人">
                  <el-select placeholder="使用人" v-model="addDialog.user_id">
                    <el-option
                      v-for="v in $store.state.staff"
                      :key="v.id"
                      :label="v.name"
                      :value="v.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="管理员">
                  <el-select placeholder="管理员" v-model="addDialog.manager_id">
                    <el-option
                      v-for="v in $store.state.admin"
                      :key="v.id"
                      :label="v.name"
                      :value="v.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="存放地点">
                  <el-select placeholder="存放地点" v-model="addDialog.warehouse_id">
                    <el-option
                      v-for="v in $store.state.address"
                      :key="v.id"
                      :label="v.name"
                      :value="v.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="使用期限">
                  <el-input placeholder="使用期限" v-model="addDialog.duration_use"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="来源">
                  <el-select placeholder="来源" v-model="addDialog.source">
                    <el-option
                      v-for="v in $store.state.source"
                      :key="v.id"
                      :label="v.name"
                      :value="v.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="备注">
                  <el-input type="textarea" v-model="addDialog.remarks"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="上传">
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="维保信息">
          <el-form :model="addDialog"
            class="demo-form-inline"
            :size="$store.state.uiSize"
            label-width="80px">
          <el-row>
            <el-col :span="11">
                <el-form-item label="供应商">
                  <el-input placeholder="供应商" v-model="addDialog.bar_code" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="联系人">
                  <el-input placeholder="联系人" v-model="addDialog.bar_code" readonly></el-input>
                </el-form-item>
              </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
                <el-form-item label="联系方式">
                  <el-input placeholder="联系方式" v-model="addDialog.bar_code" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="维保到期">
                  <el-date-picker v-model="addDialog.purchase_time" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
                <el-form-item label="维保说明">
                  <el-input type="textarea" v-model="addDialog.remarks"></el-input>
                </el-form-item>
              </el-col>
          </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogDone">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看资产表单 -->
    <el-dialog title="查看" :visible.sync="seeDialogTableVisible" width="80%">
      <el-tabs tab-position="left">
        <el-tab-pane label="基本信息">
          <el-form
            :inline="true"
            :model="addDialog"
            class="demo-form-inline"
            :size="$store.state.uiSize"
            label-width="80px"
            :disabled="true"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item label="资产条码">
                  <el-input placeholder="资产条码" v-model="addDialog.bar_code" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="资产名称">
                  <el-input placeholder="资产名称" v-model="addDialog.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="资产类型">
                  <el-select placeholder="资产类型" v-model="addDialog.type_id">
                    <el-option
                      v-for="v in $store.state.type"
                      :key="v.id"
                      :label="v.name"
                      :value="v.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="规格型号">
                  <el-input placeholder="规格型号" v-model="addDialog.specification"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="SN号">
                  <el-input placeholder="SN号" v-model="addDialog.sn"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="计量单位">
                  <el-input placeholder="计量单位" v-model="addDialog.metering"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="金额">
                  <el-input placeholder="金额" v-model="addDialog.money"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="使用公司">
                  <el-select placeholder="使用公司" v-model="addDialog.company">
                    <el-option
                      v-for="v in $store.state.company"
                      :key="v.id"
                      :label="v.name"
                      :value="v.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="使用部门">
                  <el-select placeholder="使用部门" v-model="addDialog.department">
                    <el-option
                      v-for="v in $store.state.department"
                      :key="v.id"
                      :label="v.name"
                      :value="v.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="购买时间">
                  <el-input placeholder="购买时间" v-model="addDialog.purchase_time"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="使用人">
                  <el-select placeholder="使用人" v-model="addDialog.user_id">
                    <el-option
                      v-for="v in $store.state.staff"
                      :key="v.id"
                      :label="v.name"
                      :value="v.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="管理员">
                  <el-select placeholder="管理员" v-model="addDialog.manager_id">
                    <el-option
                      v-for="v in $store.state.admin"
                      :key="v.id"
                      :label="v.name"
                      :value="v.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="存放地点">
                  <el-select placeholder="存放地点" v-model="addDialog.warehouse_id">
                    <el-option
                      v-for="v in $store.state.address"
                      :key="v.id"
                      :label="v.name"
                      :value="v.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="使用期限">
                  <el-input placeholder="使用期限" v-model="addDialog.duration_use"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="来源">
                  <el-select placeholder="来源" v-model="addDialog.source">
                    <el-option
                      v-for="v in $store.state.source"
                      :key="v.id"
                      :label="v.name"
                      :value="v.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="备注">
                  <el-input type="textarea" v-model="addDialog.remarks"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="上传">
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="维保信息">
            <el-form :model="addDialog"
            class="demo-form-inline"
            :size="$store.state.uiSize"
            label-width="80px">
          <el-row>
            <el-col :span="11">
                <el-form-item label="供应商">
                  <el-input placeholder="供应商" v-model="addDialog.bar_code" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="联系人">
                  <el-input placeholder="联系人" v-model="addDialog.bar_code" readonly></el-input>
                </el-form-item>
              </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
                <el-form-item label="联系方式">
                  <el-input placeholder="联系方式" v-model="addDialog.bar_code" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="维保到期">
                  <el-date-picker v-model="addDialog.purchase_time" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
                <el-form-item label="维保说明">
                  <el-input type="textarea" v-model="addDialog.remarks"></el-input>
                </el-form-item>
              </el-col>
          </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="seeDialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="seeDialogTableVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑资产表单 -->
    <el-dialog title="编辑" :visible.sync="editDialogTableVisible" width="80%">
      <el-tabs tab-position="left">
        <el-tab-pane label="基本信息">
          <el-form
            :inline="true"
            :model="editDialog"
            class="demo-form-inline"
            :size="$store.state.uiSize"
            label-width="80px"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item label="资产条码">
                  <el-input placeholder="资产条码" v-model="editDialog.bar_code" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="资产名称">
                  <el-input placeholder="资产名称" v-model="editDialog.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="资产类型">
                  <el-select placeholder="资产类型" v-model="editDialog.type_id">
                    <el-option
                      v-for="v in $store.state.type"
                      :key="v.id"
                      :label="v.name"
                      :value="v.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="规格型号">
                  <el-input placeholder="规格型号" v-model="editDialog.specification"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="SN号">
                  <el-input placeholder="SN号" v-model="editDialog.sn"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="计量单位">
                  <el-input placeholder="计量单位" v-model="editDialog.metering"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="金额">
                  <el-input placeholder="金额" v-model="editDialog.money"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="使用公司">
                  <el-select placeholder="使用公司" v-model="editDialog.company">
                    <el-option
                      v-for="v in $store.state.company"
                      :key="v.id"
                      :label="v.name"
                      :value="v.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="使用部门">
                  <el-select placeholder="使用部门" v-model="editDialog.department">
                    <el-option
                      v-for="v in $store.state.department"
                      :key="v.id"
                      :label="v.name"
                      :value="v.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="购买时间">
                  <el-date-picker v-model="editDialog.purchase_time" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="使用人">
                  <el-select placeholder="使用人" v-model="editDialog.user_id">
                    <el-option
                      v-for="v in $store.state.staff"
                      :key="v.id"
                      :label="v.name"
                      :value="v.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="管理员">
                  <el-select placeholder="管理员" v-model="editDialog.manager_id">
                    <el-option
                      v-for="v in $store.state.admin"
                      :key="v.id"
                      :label="v.name"
                      :value="v.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="存放地点">
                  <el-select placeholder="存放地点" v-model="editDialog.warehouse_id">
                    <el-option
                      v-for="v in $store.state.address"
                      :key="v.id"
                      :label="v.name"
                      :value="v.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="使用期限">
                  <el-input placeholder="使用期限" v-model="editDialog.duration_use"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="来源">
                  <el-select placeholder="来源" v-model="editDialog.source">
                    <el-option
                      v-for="v in $store.state.source"
                      :key="v.id"
                      :label="v.name"
                      :value="v.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="备注">
                  <el-input type="textarea" v-model="editDialog.remarks"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="上传">
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="维保信息">
            <el-form :model="addDialog"
            class="demo-form-inline"
            :size="$store.state.uiSize"
            label-width="80px">
          <el-row>
            <el-col :span="11">
                <el-form-item label="供应商">
                  <el-input placeholder="供应商" v-model="addDialog.bar_code" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="联系人">
                  <el-input placeholder="联系人" v-model="addDialog.bar_code" readonly></el-input>
                </el-form-item>
              </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
                <el-form-item label="联系方式">
                  <el-input placeholder="联系方式" v-model="addDialog.bar_code" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="维保到期">
                  <el-date-picker v-model="addDialog.purchase_time" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
                <el-form-item label="维保说明">
                  <el-input type="textarea" v-model="addDialog.remarks"></el-input>
                </el-form-item>
              </el-col>
          </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialogDone">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import DaAssetsState from "@/components/DaAssetsState.vue";
export default {
  name: "Register",
  data() {
    return {
      activeName: "active", //选项默认选中
      search: "", //搜索关键词
      pageSize: 10, //分页默认size
      registerData: [], //所有资产数据
      addDialogTableVisible: false, //打开新增资产表单
      addDialog: {}, //新增资产数据
      imageUrl: "", //上传地址
      seeDialogTableVisible: false, //查看资产表单
      editDialogTableVisible: false, //打开编辑资产表单
      editDialog: {}, //编辑资产数据
      delData: [] //将要删除的数据
    };
  },
  mounted() {
    this.registerData = [
      {
        id: 1,
        bar_code: "0191063662278",
        name: "打印机",
        type_id: "02",
        specification: "索尼3000",
        sn: 49090343,
        metering: "台",
        money: 2980,
        company: "光威",
        department: "",
        purchase_time: "Sat Aug 25 2018 23:25:52 GMT+0800 (中国标准时间)",
        user_id: 1001,
        manager_id: 102,
        status: 0,
        address: "办公室北区",
        duration_use: "",
        source: "购入",
        remarks: "",
        image: "http://placehold.it/200x200",
        supplier: "索尼赛格旗舰店",
        contacts: "张素芳",
        tell: 13131312323,
        expiry_time: "1529254718034",
        explain: ""
      },
      {
        id: 2,
        bar_code: "0191063662276",
        name: "切纸机",
        type_id: "03",
        specification: "索尼3000",
        sn: 49090343,
        metering: "台",
        money: 280,
        company: "南京",
        department: "",
        purchase_time: "1529254718034",
        user_id: 1001,
        manager_id: 102,
        status: 1,
        address: "办公室北区",
        duration_use: "",
        source: "购入",
        remarks: "",
        image: "http://placehold.it/200x200",
        supplier: "索尼赛格旗舰店",
        contacts: "张素芳",
        tell: 13131312323,
        expiry_time: "1529254718034",
        explain: ""
      },
      {
        id: 3,
        bar_code: "0191063662267",
        name: "复印机",
        type_id: "03",
        specification: "索尼3000",
        sn: 49090343,
        metering: "台",
        money: 280,
        company: "南京",
        department: "",
        purchase_time: "1529254718034",
        user_id: 1001,
        manager_id: 102,
        status: 2,
        address: "办公室北区",
        duration_use: "",
        source: "购入",
        remarks: "",
        image: "http://placehold.it/200x200",
        supplier: "索尼赛格旗舰店",
        contacts: "张素芳",
        tell: 13131312323,
        expiry_time: "1529254718034",
        explain: ""
      },
      {
        id: 4,
        bar_code: "0191064662278",
        name: "电风扇",
        type_id: "03",
        specification: "索尼3000",
        sn: 49090343,
        metering: "台",
        money: 280,
        company: "南京",
        department: "",
        purchase_time: "1529254718034",
        user_id: 1001,
        manager_id: 102,
        status: 0,
        address: "办公室北区",
        duration_use: "",
        source: "购入",
        remarks: "",
        image: "http://placehold.it/200x200",
        supplier: "索尼赛格旗舰店",
        contacts: "张素芳",
        tell: 13131312323,
        expiry_time: "1529254718034",
        explain: ""
      },
      {
        id: 5,
        bar_code: "0191063662270",
        name: "电风扇",
        type_id: "03",
        specification: "索尼3000",
        sn: 49090343,
        metering: "台",
        money: 280,
        company: "南京",
        department: "",
        purchase_time: "1529254718034",
        user_id: 1001,
        manager_id: 102,
        status: 12,
        address: "办公室北区",
        duration_use: "",
        source: "购入",
        remarks: "",
        image: "http://placehold.it/200x200",
        supplier: "索尼赛格旗舰店",
        contacts: "张素芳",
        tell: 13131312323,
        expiry_time: "1529254718034",
        explain: ""
      },
      {
        id: 6,
        bar_code: "0191063662277",
        name: "电风扇",
        type_id: "03",
        specification: "索尼3000",
        sn: 49090343,
        metering: "台",
        money: 280,
        company: "南京",
        department: "",
        purchase_time: "1529254718034",
        user_id: 1001,
        manager_id: 102,
        status: 0,
        address: "办公室北区",
        duration_use: "",
        source: "购入",
        remarks: "",
        image: "http://placehold.it/200x200",
        supplier: "索尼赛格旗舰店",
        contacts: "张素芳",
        tell: 13131312323,
        expiry_time: "1529254718034",
        explain: ""
      },
      {
        id: 7,
        bar_code: "0191063662272",
        name: "电风扇",
        type_id: "03",
        specification: "索尼3000",
        sn: 49090343,
        metering: "台",
        money: 280,
        company: "南京",
        department: "",
        purchase_time: "1529254718034",
        user_id: 1001,
        manager_id: 102,
        status: 4,
        address: "办公室北区",
        duration_use: "",
        source: "购入",
        remarks: "",
        image: "http://placehold.it/200x200",
        supplier: "索尼赛格旗舰店",
        contacts: "张素芳",
        tell: 13131312323,
        expiry_time: "1529254718034",
        explain: ""
      },
      {
        id: 8,
        bar_code: "0191063662271",
        name: "电风扇",
        type_id: "03",
        specification: "索尼3000",
        sn: 49090343,
        metering: "台",
        money: 280,
        company: "南京",
        department: "",
        purchase_time: "1529254718034",
        user_id: 1001,
        manager_id: 102,
        status: 0,
        address: "办公室北区",
        duration_use: "",
        source: "购入",
        remarks: "",
        image: "http://placehold.it/200x200",
        supplier: "索尼赛格旗舰店",
        contacts: "张素芳",
        tell: 13131312323,
        expiry_time: "1529254718034",
        explain: ""
      },
      {
        id: 9,
        bar_code: "0191063662252",
        name: "电风扇",
        type_id: "03",
        specification: "索尼3000",
        sn: 49090343,
        metering: "台",
        money: 280,
        company: "南京",
        department: "",
        purchase_time: "1529254718034",
        user_id: 1001,
        manager_id: 102,
        status: 0,
        address: "办公室北区",
        duration_use: "",
        source: "购入",
        remarks: "",
        image: "http://placehold.it/200x200",
        supplier: "索尼赛格旗舰店",
        contacts: "张素芳",
        tell: 13131312323,
        expiry_time: "1529254718034",
        explain: ""
      },
      {
        id: 10,
        bar_code: "0191063662223",
        name: "电风扇",
        type_id: "03",
        specification: "索尼3000",
        sn: 49090343,
        metering: "台",
        money: 280,
        company: "南京",
        department: "",
        purchase_time: "1529254718034",
        user_id: 1001,
        manager_id: 102,
        status: 0,
        address: "办公室北区",
        duration_use: "",
        source: "购入",
        remarks: "",
        image: "http://placehold.it/200x200",
        supplier: "索尼赛格旗舰店",
        contacts: "张素芳",
        tell: 13131312323,
        expiry_time: "1529254718034",
        explain: ""
      },
      {
        id: 11,
        bar_code: "0191063662233",
        name: "电风扇",
        type_id: "03",
        specification: "索尼3000",
        sn: 49090343,
        metering: "台",
        money: 280,
        company: "南京",
        department: "",
        purchase_time: "1529254718034",
        user_id: 1001,
        manager_id: 102,
        status: 0,
        address: "办公室北区",
        duration_use: "",
        source: "购入",
        remarks: "",
        image: "http://placehold.it/200x200",
        supplier: "索尼赛格旗舰店",
        contacts: "张素芳",
        tell: 13131312323,
        expiry_time: "1529254718034",
        explain: ""
      }
    ];
  },
  methods: {
    // 分页 条数 变化
    handleSizeChange(size) {
      this.pageSize = size;
    },
    //当前页发生变化
    handleCurrentChange(currentPage) {
      
    },
    //上传图片
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 打开新增资产表单
    addDialogs() {
      this.addDialog = {};
      this.addDialogTableVisible = true;
    },
    // 确定提交新增数据
    addDialogDone() {
      this.addDialogTableVisible = false;
      this.addDialog.purchase_time = this.addDialog.purchase_time || new Date();
      this.registerData.push(this.addDialog);
      this.$message({
        message: "提交成功",
        type: "success"
      });
      this.addDialog = {};
    },
    //导出表格
    exportExcel() {
      this.$store.commit("exportExcel");
    },
    //查看资产表单
    seeDialog(val) {
      this.seeDialogTableVisible = true;
      this.addDialog = JSON.parse(JSON.stringify(val));
    },
    // 编辑资产表单
    editDialogs(val) {
      this.editDialogTableVisible = true;
      this.editDialog = JSON.parse(JSON.stringify(val));
    },
    // 提交编辑资产表单
    editDialogDone() {
      this.editDialogTableVisible = false;
      this.editDialog.purchase_time =
        this.editDialog.purchase_time || new Date();
      this.registerData.forEach((val, key) => {
        if (val.id == this.editDialog.id) {
          Object.assign(this.registerData[key], this.editDialog);
        }
      });
      this.$message({
        message: "提交成功",
        type: "success"
      });
      this.editDialog = {};
    },
    //当多选框状态发生改变时,val是选中的数据
    delSelectionChange(val) {
      this.delData = JSON.parse(JSON.stringify(val));
    },
    //删除数据
    delDialogs(val) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.registerData.forEach((v, k) => {
            this.delData.forEach((val, key) => {
              if (v.id == val.id) {
                this.registerData.splice(k, 1);
              }
            });
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  components: {
    Breadcrumb,
    DaAssetsState
  }
};
</script>
<style lang="less" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

