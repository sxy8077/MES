import React, { Component } from 'react';
import { DatePicker, Input, Button, Table, Modal, Select, BackTop, Popconfirm, message } from 'antd';
import { originalUrl, deviceRequirements, deviceHealth } from '../../../dataModule/UrlList';
import { Model } from '../../../dataModule/testBone.js';
import axios from 'axios';
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

class DeviceRequirements extends Component{
	constructor(){
	    super();
			this.state = {
				id: '',     //设备维护行 数据id
				//table data：数据 columns 表头
				data: [],
				columns:[
					{title: '需求号',dataIndex: 'ticket_number',width: '12%',align:'center',},
					{title: '设备名',dataIndex: 'device_name',width: '12%',align:'center',},
					{title: '设备号',dataIndex: 'device_num',width: '12%',align:'center',},
					{title: '操作人',dataIndex: 'operator',width: '12%',align:'center',},
					{title: '操作时间',dataIndex: 'operation_time',width: '12%',align:'center',},
					{title: '设备状态',dataIndex: 'device_status',width: '12%',align:'center',},
					{title: '备注',dataIndex: 'remark',width: '12%',align:'center',},
					{title: '操作',dataIndex:'action',render: (text, record)=>{
						return (
							<div>
								<Button id={record.id} type="primary" onClick={()=>{this.handleEdit(record.id)}}
									disabled={record.device_type == 1 ? 'disabled' : false }
									style = {{background:record.device_type == 1 ? 'red' : 'blue',color:"white"}}
								>{record.device_type == 1?'已处理':'未处理'}
								</Button>
							</div>
						)
						
					}},
				],
				//弹框函数
				ModalForm: {
					maintenance_start: '', //维护开始时间
					maintenance_end: '',  //维护结束时间
					maintenance_content: '', //维护内容
					conclusion: '',         //结论
					acceptance_unit: '',  //验收单位
					maintenance_staff: '',  //验收人员
					device_status: '',       //设备状态
					remark: '',            //备注
				},
				Modal1Visible: false,
			}
		}
	render(){
		const { columns, data, Modal1Visible, ModalForm } = this.state;
		return(
			<div id="DeviceRequirements">
				<div className="header">
					<div className="title">
						<h2>设备需求管理</h2>
					</div>
					<div className="filter">
						<div></div>
					</div>
				</div>
				<div className="main">
					<Table className="antd-Table" columns={columns} dataSource={data} 
					pagination={{ pageSize: 8 }} scroll={{ y: '100%', x: 1000 }}/>
					<div className="Materialinout-add">
						<Modal
							title="设备维护记录"
							visible={Modal1Visible}
							onOk={this.handleModal1Ok}
							onCancel={this.handleModal1Cancel}
						>
							<table className="table">
								<thead></thead>
								<tbody>
									<tr>
										<td className="title" style={{marginRight:20}}>维护开始时间:</td>
										<td><Input style={{width: '100%',height:'100%'}} value={ModalForm.maintenance_start} onChange={(ev)=>{this.ModalChange(ev,'maintenance_start')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>维护结束时间:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.maintenance_end} onChange={(ev)=>{this.ModalChange(ev,'maintenance_end')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>维护内容:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.maintenance_content} onChange={(ev)=>{this.ModalChange(ev,'maintenance_content')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>结论:</td>
										<td>
											<Input className="title" style={{width: '100%',height: '100%'}} value={ModalForm.conclusion} onChange={(ev)=>{this.ModalChange(ev,"conclusion")}}/>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>验收单位:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.acceptance_unit} onChange={(ev)=>{this.ModalChange(ev,'acceptance_unit')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>维护人员:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.maintenance_staff} onChange={(ev)=>{this.ModalChange(ev,'maintenance_staff')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>设备状态:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.device_status} onChange={(ev)=>{this.ModalChange(ev,'device_status')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>备注:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.remark} onChange={(ev)=>{this.ModalChange(ev,'remark')}}/></td>
									</tr>
								</tbody>
								<tfoot></tfoot>
							</table>
						</Modal>
					</div>
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
			console.log(this.state.data)
		}
		componentDidUpdate(nextProps){
			// console.log('nextProps:',nextProps);
		}
		componentWillUnmount(){
			console.log('卸载');
		}
	
	//init 获取所有待维护设备信息  
		init = ()=>{
			const me = this;
			let params = {};
			let url = originalUrl + deviceRequirements;
			axios.get(url,params).then(res=>{
				message.success("加载成功！");
				let data = res.data;
				console.log("data:",data);
				for(let item in data){
					data[item].key = data[item].id;
					data[item].ticket_number = data[item].id.slice(0,5);
				}
				this.setState({data,});
			})
		}
		//处理物料需求订单 打开弹窗
		handleEdit = (id)=>{
			console.log('id:',id);
			this.setState({
				Modal1Visible: true,
				id: id,
			})
		}
		ModalChange = (ev,key)=>{
			let form = {...this.state.ModalForm};
			for(let item in form){
				if(item == key){
					form[item] = ev.target.value;
				}
			}
			this.setState({
				ModalForm: form,
			})
		}
		handleModal1Ok = ()=>{
			let id = this.state.id;
			let data = this.state.data;
			let filter = data.filter((item)=>{
				return item.id == id;
			})
			let ofilter = filter[0];
			let form = this.state.ModalForm;
			let params = {...form,...ofilter};
			let url = originalUrl + deviceHealth;
			axios.post(url,params).then((res)=>{
				message.success("提交成功！");
				let url = originalUrl + deviceRequirements + id + '/';
				let params = {device_type: 1};
				axios.put(url,params).then((res)=>{
					message.success("修改成功！");
					for(let i in form){
						form[i] = null;
					}
					this.setState({
						Modal1Visible: false,
						ModalForm: form,
					})
					this.init();
				}).catch((error)=>{
					console.log("error:",error);
					message.error("修改失败！")
				})
			}).catch((error)=>{
				console.log("error:",error);
				message.error("提交失败！")
			})
		}
		handleModal1Cancel = ()=>{
			let form = this.state.ModalForm;
			for(let i in form){
				form[i] = null;
			}
			this.setState({
				Modal1Visible: false,
				ModalForm: form,
			})
			this.init();
		}
}
export default DeviceRequirements;