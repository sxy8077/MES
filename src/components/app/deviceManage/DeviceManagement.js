import React, { Component } from 'react';
import { DatePicker, Input, Button, Table, Modal, Select, BackTop, Popconfirm,message } from 'antd';
import { originalUrl, deviceManagement, } from '../../../dataModule/UrlList';
import { Model } from '../../../dataModule/testBone.js';
import Edit from '../../../statistics/edit.png';
import Delete from '../../../statistics/delete.png';
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
class DeviceManagement extends Component{
	constructor(){
		super();
		this.state = {
			id: null,     //该行数据id 主键
			//搜索区 设备搜索 order
			device_num: null,
			//table data：数据 columns 表头
			data: [],
			columns:[
				{title: '设备名',dataIndex: 'device_name',width: '10%',align:'center',},
				{title: '设备号',dataIndex: 'device_num',width: '10%',align:'center',},
				{title: '设备类型',dataIndex: 'device_type',width: '10%',align:'center',},
				{title: '状态',dataIndex: 'status',width: '10%',align:'center',},
				{title: '设备描述',dataIndex: 'description',width: '10%',align:'center',},
				{title: '设备信息',dataIndex: 'device_info',width: '10%',align:'center',},
				{title: '维修次数',dataIndex: 'maintenance_times',width: '10%',align:'center',},
				{title: '所属车间',dataIndex: 'workshop',width: '10%',align:'center',},
				{title: '操作',dataIndex: 'action', render: (text, record) => {
					return(
						<div>
							<Popconfirm  title="确认删除？" onConfirm={()=>{this.handleDelete(record.id)}}>
								<img src={Delete} style={{cursor: 'pointer'}}/>
							</Popconfirm>
							<Popconfirm title="确认编辑？" onConfirm={()=>{this.handleEdit(record.id)}}>
								<img src={Edit} style={{cursor: 'pointer'}}/>
							</Popconfirm>
						</div>
					)
				}},
			],
			//弹框函数
			ModalForm: {
				device_name: '',
				device_num: '',
				device_type: '',
				status: "",
				description: "",  //设备描述
				device_info: "",
				maintenance_times: "",
				workshop: '',
			},
			Modal2Visible: false,
			Modal1Visible: false,
		}
	}
	render(){
		const { columns, data, ModalForm, Modal2Visible, Modal1Visible, device_num } = this.state;
		return(
			<div id="deviceManagement">
				<div className="header">
					<div className="title">
						<h2>设备管理</h2>
					</div>
					<div className="filter">
						<div style={{width: "100%",height: "100%",display: 'flex'}}>
							<span className="span">
								设备搜索:
								<Input className="input" value={device_num} onChange={(ev)=>{this.device_num(ev)}}></Input>
							</span>
							<Button className="button" type="primary" onClick={()=>{this.search()}}>搜索</Button>
							<Button className="button" type="primary" onClick={()=>{this.reset()}}>重置</Button>
							<Button className="button" type="primary" onClick={()=>{this.Add()}}>添加设备</Button>
						</div>
					</div>
				</div>
				<div className="main">
					<Table className="antd-Table" columns={columns} dataSource={data} 
					pagination={{ pageSize: 8 }} scroll={{ y: '100%', x: 1000 }}/>
					{/* 回到顶部 */}
					<BackTop />
					<strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}></strong>
					<div className="modify-deviceManagement">
						<Modal
							title="设备信息编辑"
							visible={Modal1Visible}
							onOk={this.handleModal1Ok}
							onCancel={this.handleModal1Cancel}
						>
							<table className="table">
								<thead></thead>
								<tbody>
									<tr>
										<td className="title" style={{marginRight: 20}}>设备名:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.device_name} onChange={(ev)=>{this.Modal1Change(ev,'device_name')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>设备号:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.device_num} onChange={(ev)=>{this.Modal1Change(ev,'device_num')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>设备类型:</td>
										<td>
											<select className="select" value={ModalForm.device_type} onChange={(ev)=>{this.Modal1Change(ev,'device_type')}}>
												<option key="-1" value=""></option>
												<option key="0" value="设备类型0">设备类型0</option>
												<option key="1" value="设备类型1">设备类型1</option>
												<option key="2" value="设备类型2">设备类型2</option>
											</select>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>状态:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.status} onChange={(ev)=>{this.Modal1Change(ev,'status')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>设备描述:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.description} onChange={(ev)=>{this.Modal1Change(ev,'description')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>设备信息:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.device_info} onChange={(ev)=>{this.Modal1Change(ev,'device_info')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>维修次数:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.maintenance_times} onChange={(ev)=>{this.Modal1Change(ev,'maintenance_times')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>所属车间:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.workshop} onChange={(ev)=>{this.Modal1Change(ev,'workshop')}}></Input>
										</td>
									</tr>
								</tbody>
								<tfoot></tfoot>
							</table>
						</Modal>
					</div>
					<div className="modify-deviceManagement">
						<Modal
							title="添加设备"
							visible={Modal2Visible}
							onOk={this.handleModal2Ok}
							onCancel={this.handleModal2Cancel}
						>
							<table className="table">
								<thead></thead>
								<tbody>
									<tr>
										<td className="title" style={{marginRight: 20}}>设备名:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.device_name} onChange={(ev)=>{this.Modal2Change(ev,'device_name')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>设备号:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.device_num} onChange={(ev)=>{this.Modal2Change(ev,'device_num')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>设备类型:</td>
										<td>
											<select className="select" value={ModalForm.device_type} onChange={(ev)=>{this.Modal2Change(ev,'device_type')}}>
												<option key="-1" value=""></option>
												<option key="0" value="设备类型0">设备类型0</option>
												<option key="1" value="设备类型1">设备类型1</option>
												<option key="2" value="设备类型2">设备类型2</option>
											</select>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>状态:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.status} onChange={(ev)=>{this.Modal2Change(ev,'status')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>设备描述:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.description} onChange={(ev)=>{this.Modal2Change(ev,'description')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>设备信息:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.device_info} onChange={(ev)=>{this.Modal2Change(ev,'device_info')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>维修次数:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.maintenance_times} onChange={(ev)=>{this.Modal2Change(ev,'maintenance_times')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>所属车间:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.workshop} onChange={(ev)=>{this.Modal2Change(ev,'workshop')}}></Input>
										</td>
									</tr>
								</tbody>
								<tfoot></tfoot>
							</table>
						</Modal>
					</div>
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
		// console.log('卸载')
	}
	//init 获取所有账户信息
	init = ()=>{
		const me = this;
		let params = {};
		let url = originalUrl + deviceManagement;
		model.fetch(params,url,'get',(res)=>{
			console.log('所有设备数据:',res.data);
			let data = res.data;
			for(let i=0;i<data.length;i++){
				data[i]['key'] = data[i].id
			}
			me.setState({
				data: data
			});
		})
	}
	//搜索区 设备序号
	device_num = (ev)=>{
		console.log("搜索设备序号：",ev.target.value);
		this.setState({
			device_num: ev.target.value,
		})
	}
	search = ()=>{
		let device_num = this.state.device_num;
		let data = this.state.data;
		let filter = [];
		for(let item in data){
			if(data[item].device_num == device_num){
				filter.push(data[item]);
			}
		}
		this.setState({data: filter});
	}
	reset = ()=>{
		this.setState({
			device_num: null,
		})
		this.init();
	}
	//编辑设备信息
	handleEdit = (id)=>{
		console.log('设备id:',id);
		let filterData = this.state.data.filter((item)=>{
			return item.id = id; 
		})
		this.setState({
			ModalForm: filterData[0],
			Modal1Visible: true,
			id: id,
			});
	}
	Modal1Change = (ev,key)=>{
		let form = {...this.state.ModalForm};
		for(let item in form){
			if(item == key){
				form[item] = ev.target.value;
			}
		}
		this.setState({ModalForm: form});
	}
	handleModal1Ok = ()=>{
		let form = {...this.state.ModalForm};
		let id = this.state.id;
		let params = form;
		let url = originalUrl + deviceManagement + id + '/';
		axios.put(url,params).then((res)=>{
			message.success("修改成功!");
			for(let item in form){
				form[item] = "";
			}
			this.setState({
				ModalForm: form,
				Modal1Visible: false,
			});
			this.init();
		}).catch(err=>{
			message.error("修改失败！");
			for(let item in form){
				form[item] = "";
			}
			this.setState({
				ModalForm: form,
				Modal1Visible: false,
			});
			this.init();
		})
	}
	handleModalCancel = ()=>{
		let form = {...this.state.ModalForm};
		for(let item in form){
			form[item] = "";
		}
		this.setState({
			Modal1Visible: false,
			ModalForm: form,
		}, () => {
			console.log('this:',this);
			this.init();
		})
	}
	//设备添加
	Add = ()=>{
		this.setState({Modal2Visible: true});
	}
	Modal2Change = (ev,key)=>{
		console.log('设备：',ev.target.value);
		let form = {...this.state.ModalForm};
		for(let item in form){
			if(item == key){
				form[item] = ev.target.value;
			}
		}
		this.setState({ModalForm: form});
	}
	handleModal2Ok = ()=>{
		let form = {...this.state.ModalForm};
		let params = form;
		let url = originalUrl + deviceManagement;
		axios.post(url,params).then((res)=>{
			message.success("创建成功！");
			for(let i in form){
				form[i] = "";
			}
			this.init();
			this.setState({
				Modal2Visible: false,
				ModalForm: form,
			})
		}).catch(err=>{
			message.error("修改失败！");
			for(let i in form){
				form[i] = '';
			}
			this.init();
			this.setState({
				Modal2Visible: false,
				ModalForm: form,
			});
		})
		
	}
	handleModal2Cancel= () =>{
		let form = {...this.state.ModalForm};
		for(let item in form){
			item == "device_type" ? form[item] = "" : null;
		}
		this.setState({
			Modal2Visible: false,
			ModalForm: form,
		}, () => {
			console.log('this:',this);
			this.init();
		})
	}
	//删除设备
	handleDelete = (id)=>{
		let url = originalUrl + deviceManagement + id + '/';
		let params = {};
		axios.delete(url,params).then((res)=>{
			this.init();
			message.success("删除成功！");
		}).catch(err=>{
			this.init();
			message.error("删除失败！");
			console.log("error:",err);
		})
	}
}
export default DeviceManagement;