import React, {Component} from "react";
import { DatePicker, Input, Button, Table, Modal, Select, BackTop, Popconfirm,message } from 'antd';
import { originalUrl, deviceRequirements, } from '../../../dataModule/UrlList';
import Edit from '../../../statistics/edit.png';
import axios from "axios";
// import { changeOrder,changeType, typeChange } from '../../commonFunction.js';
import history from '../../common/history.js';
class DeviceProblem extends Component{
	constructor(){
		super();
		this.state = {
			ModalForm: {
				ticket_number: null,//id
				device_name: null,
				device_num: '',
				device_status: null,
				operator: null, 
				operation_time: null,
				remark: '',
			},
			
		}
	}
	render(){
		const { ModalForm } = this.state;
		return (
			<div id="deviceManagement">
				<div className="header">
					<div className="title">
						<h2>设备问题</h2>
					</div>
					<div className="filter">
						<div style={{width: "100%",height: "100%",display: 'flex'}}>
						</div>
					</div>
				</div>
				<div className="main">
					{/* 回到顶部 */}
					<BackTop />
					<strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}></strong>
					<div className="DeviceProblem">
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
									<td className="title" style={{marginRight: 20}}>设备状态:</td>
									<td>
										<Input style={{width: '100%',height:'100%'}} value={ModalForm.device_status} onChange={(ev)=>{this.Modal2Change(ev,'device_status')}}></Input>
									</td>
								</tr>
								<tr>
									<td className="title" style={{marginRight: 20}}>操作人:</td>
									<td>
										<Input style={{width: '100%',height:'100%'}} value={ModalForm.operator} onChange={(ev)=>{this.Modal2Change(ev,'operator')}}></Input>
									</td>
								</tr>
								<tr>
									<td className="title" style={{marginRight: 20}}>操作时间:</td>
									<td>
										<Input style={{width: '100%',height:'100%'}} value={ModalForm.operation_time} onChange={(ev)=>{this.Modal2Change(ev,'operation_time')}}></Input>
									</td>
								</tr>
								<tr>
									<td className="title" style={{marginRight: 20}}>备注:</td>
									<td>
										<Input style={{width: '100%',height:'100%'}} value={ModalForm.remark} onChange={(ev)=>{this.Modal2Change(ev,'remark')}}></Input>
									</td>
								</tr>
								<tr>
									<td colSpan="2" style={{display: "flex",flexDirection:"row",justifyContent:"center"}}>
										<Button type="primary" style={{width: "80%",}} onClick={()=>{this.handleSubmit()}}>提交</Button>
									</td>
								</tr>
							</tbody>
							<tfoot></tfoot>
						</table>
					</div>
				</div>
			</div>
		);
	}
	//挂载区
	componentDidMount(){
	}
	componentDidUpdate(nextProps){
		// console.log('nextProps:',nextProps);
	}
	componentWillUnmount(){
		console.log('卸载');
	}
	Modal2Change = (ev,key)=>{
		let form = {...this.state.ModalForm};
		for(let item in form){
			if(item == key){
				form[item] = ev.target.value;
			}
		}
		this.setState({ModalForm: form});
	}
	handleSubmit = ()=>{
		let form = {...this.state.ModalForm};
		let url = originalUrl + deviceRequirements;
		let params = form;
		axios.post(url,params).then((res)=>{
			message.success("提交成功！");
			for(let item in form){
				form[item] = null;
			}
			this.setState({ModalForm: form});
		}).catch((err)=>{
			message.error("提交失败！");
			for(let item in form){
				form[item] = null;
			}
			this.setState({ModalForm: form});
		})
	}
}
export default DeviceProblem;