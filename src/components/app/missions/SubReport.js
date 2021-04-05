import React, {Component} from "react";
import { DatePicker, Input, Button, Table, Modal, Select, BackTop, Popconfirm,message } from 'antd';
import { originalUrl, taskTrack, } from '../../../dataModule/UrlList';
import Edit from '../../../statistics/edit.png';
import axios from "axios";
// import { changeOrder,changeType, typeChange } from '../../commonFunction.js';
import history from '../../common/history.js';
class SubReport extends Component{
	constructor(){
		super();
		this.state = {
			ModalForm: {
				order_number: null,
				serial_number: null,
				product_name: '',
				process_name: null,
				quantity: null,
				operator_id: null,
				operation_time: null,
				device_name: null,
				task_status: '',
				start_time: '',
				end_time: '',
			},
			
		}
	}
	render(){
		const { ModalForm } = this.state;
		return (
			<div id="deviceManagement">
				<div className="header">
					<div className="title">
						<h2>报工</h2>
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
					<div className="SubReport">
						<table className="table">
							<thead></thead>
							<tbody>
								<tr>
									<td className="title" style={{marginRight: 20}}>生产序号:</td>
									<td>
										<Input style={{width: '100%',height:'100%'}} value={ModalForm.serial_number} onChange={(ev)=>{this.Modal2Change(ev,'serial_number')}}></Input>
									</td>
								</tr>
								<tr>
									<td className="title" style={{marginRight: 20}}>产品号:</td>
									<td>
										<Input style={{width: '100%',height:'100%'}} value={ModalForm.product_name} onChange={(ev)=>{this.Modal2Change(ev,'product_name')}}></Input>
									</td>
								</tr>
								<tr>
									<td className="title" style={{marginRight: 20}}>工序名:</td>
									<td>
										<Input style={{width: '100%',height:'100%'}} value={ModalForm.process_name} onChange={(ev)=>{this.Modal2Change(ev,'process_name')}}></Input>
									</td>
								</tr>
								<tr>
									<td className="title" style={{marginRight: 20}}>数量:</td>
									<td>
										<Input style={{width: '100%',height:'100%'}} value={ModalForm.quantity} onChange={(ev)=>{this.Modal2Change(ev,'quantity')}}></Input>
									</td>
								</tr>
								<tr>
									<td className="title" style={{marginRight: 20}}>操作人:</td>
									<td>
										<Input style={{width: '100%',height:'100%'}} value={ModalForm.operator_id} onChange={(ev)=>{this.Modal2Change(ev,'operator_id')}}></Input>
									</td>
								</tr>
								<tr>
									<td className="title" style={{marginRight: 20}}>操作时间:</td>
									<td>
										<Input style={{width: '100%',height:'100%'}} value={ModalForm.operation_time} onChange={(ev)=>{this.Modal2Change(ev,'operation_time')}}></Input>
									</td>
								</tr>
								<tr>
									<td className="title" style={{marginRight: 20}}>设备名:</td>
									<td>
										<Input style={{width: '100%',height:'100%'}} value={ModalForm.device_name} onChange={(ev)=>{this.Modal2Change(ev,'device_name')}}></Input>
									</td>
								</tr>
								<tr>
									<td className="title" style={{marginRight: 20}}>任务状态:</td>
									<td>
										<Input style={{width: '100%',height:'100%'}} value={ModalForm.task_status} onChange={(ev)=>{this.Modal2Change(ev,'task_status')}}></Input>
									</td>
								</tr>
								<tr>
									<td className="title" style={{marginRight: 20}}>开始时间:</td>
									<td>
										<Input style={{width: '100%',height:'100%'}} value={ModalForm.start_time} onChange={(ev)=>{this.Modal2Change(ev,'start_time')}}></Input>
									</td>
								</tr>
								<tr>
									<td className="title" style={{marginRight: 20}}>结束时间:</td>
									<td>
										<Input style={{width: '100%',height:'100%'}} value={ModalForm.end_time} onChange={(ev)=>{this.Modal2Change(ev,'end_time')}}></Input>
									</td>
								</tr>
								<tr>
									<td className="title" style={{marginRight: 20}}>订单号:</td>
									<td>
										<Input style={{width: '100%',height:'100%'}} value={ModalForm.order_number} onChange={(ev)=>{this.Modal2Change(ev,'order_number')}}></Input>
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
		console.log("发送");
		let form = {...this.state.ModalForm};
		let url = originalUrl + taskTrack;
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
export default SubReport;

