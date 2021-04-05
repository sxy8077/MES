import React, { Component } from 'react';
import { DatePicker, Input, Button, Table, Modal, Select, BackTop, Popconfirm, message } from 'antd';
import { originalUrl, deviceHealth } from '../../../dataModule/UrlList';
import { Model } from '../../../dataModule/testBone.js';
import axios from "axios";
// import { changeOrder,changeType, typeChange } from '../../commonFunction.js';
import history from '../../common/history.js';
import '../style.less';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const {Option} = Select;
const model = new Model();

class DeviceHealth extends Component{
	constructor(){
	    super();
			this.state = {
				id: '',     //订单序号编号
				//table data：数据 columns 表头
				data: [],
				columns:[
					{title: '物料名',dataIndex: 'device_name',width: '8%',align:'center',},
					{title: '物料号',dataIndex: 'device_num',width: '8%',align:'center',},
					{title: '维护开始时间',dataIndex: 'maintenance_start',width: '8%',align:'center',},
					{title: '维护结束时间',dataIndex: 'maintenance_end',width: '8%',align:'center',},
					{title: '维护内容',dataIndex: 'maintenance_content',width: '8%',align:'center',},
					{title: '结论',dataIndex: 'conclusion',width: '8%',align:'center',},
					{title: '验收单位',dataIndex: 'acceptance_unit',width: '8%',align:'center',},
					{title: '维护人员',dataIndex: 'maintenance_staff',width: '8%',align:'center',},
					{title: '设备状态',dataIndex: 'device_status',width: '8%',align:'center',},
					{title: '备注',dataIndex: 'remark',width: '8%',align:'center',},
				],
			}
		}
	render(){
		const { columns, data } = this.state;
		return(
			<div id="DeviceHealth">
				<div className="header">
					<div className="title">
						<h2>设备健康</h2>
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
	
	//init 获取所有设备健康信息  
		init = ()=>{
			const me = this;
			let params = {};
			let url = originalUrl + deviceHealth;
			axios.get(url,params).then(res=>{
				message.success("加载成功!");
				console.log('data:',res.data);
				let data = res.data;
				for(let item in data){
					data[item].key = data[item].id;
				}
				this.setState({data,})
			}).catch(err=>{
				message.error("加载失败！");
			})
		}
}
export default DeviceHealth;