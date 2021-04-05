import React, { Component } from 'react';
import { DatePicker, Input, Button, Table, Modal, Select, BackTop, Popconfirm } from 'antd';
import { originalUrl, inventoryManagement } from '../../../dataModule/UrlList';
import { Model } from '../../../dataModule/testBone.js';
import Edit from '../../../statistics/edit.png';
import Delete from '../../../statistics/delete.png';
// import { changeOrder,changeType, typeChange } from '../../commonFunction.js';
import history from '../../common/history.js';
import '../style.less';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const {Option} = Select;
const model = new Model();

class InventoryManagement extends Component{
	constructor(){
	    super();
			this.state = {
				id: '',     //订单序号编号
				//table data：数据 columns 表头
				data: [],
				columns:[
					{title: '物料名',dataIndex: 'material_name',width: '5%',align:'center',},
					{title: '物料号',dataIndex: 'material_num',width: '8%',align:'center',},
					{title: '物料类型',dataIndex: 'material_type',width: '8%',align:'center',},
					{title: '材料',dataIndex: 'material_science',width: '8%',align:'center',},
					{title: '数量',dataIndex: 'quantity',width: '5%',align:'center',},
					{title: '订单序号',dataIndex: 'order_number',width: '5%',align:'center',},
					{title: '库位',dataIndex: 'location',width: '5%',align:'center',},
				],
			}
		}
	render(){
		const { columns, data } = this.state;
		return(
			<div id="InventoryManagement">
				<div className="header">
					<div className="title">
						<h2>库存</h2>
					</div>
					<div className="filter">
						<div></div>
					</div>
				</div>
				<div className="main">
					<Table className="antd-Table" columns={columns} dataSource={data} 
					pagination={{ pageSize: 8 }} scroll={{ y: '100%', x: 1000 }}/>
					{/* 回到顶部 */}
					<BackTop />
					<strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}></strong>
					<div className="MissionManage"></div>
				</div>
			</div>
		)
	}
		//挂载区
		componentDidMount(){
			this.init();
		}
		componentDidUpdate(nextProps){
			// console.log('nextProps:',nextProps);
		}
		componentWillUnmount(){
			console.log('卸载');
		}
	
	//init 获取所有账户信息  
		init = ()=>{
			const me = this;
			let params = {};
			let url = originalUrl + inventoryManagement;
			model.fetch(params,url,'get',(res)=>{
			console.log('所有库存数据:',res.data);
				let data = res.data;
				for(let i=0;i<data.length;i++){
					data[i]['key'] = data[i].id
				}
				me.setState({
					data: data
				});
			})
		}
}
export default InventoryManagement;