import React, {Component} from "react";
import { DatePicker, Input, Button, Table, Modal, Select, BackTop, Popconfirm,message } from 'antd';
import { originalUrl, materialrequirements, } from '../../../dataModule/UrlList';
import Edit from '../../../statistics/edit.png';
import axios from "axios";
// import { changeOrder,changeType, typeChange } from '../../commonFunction.js';
import history from '../../common/history.js';
class MaterialReq extends Component{
	constructor(){
		super();
		this.state = {
			ModalForm: {
				ticket_number: '',//id
				material_name: '',
				material_num: '',
				material_type: '',
				status: '',  //需求状态
				quantity: '',
				priority: '',
				demander: '',
				operation_time: '',
				device_name: '',
				order_number: '',
			},
			
		}
	}
	render(){
		const { ModalForm } = this.state;
		return (
			<div id="deviceManagement">
				<div className="header">
					<div className="title">
						<h2>物料需求</h2>
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
					<div className="MaterialReq">
						<table className="table">
							<thead></thead>
							<tbody>
								<tr>
									<td className="title" style={{marginRight: 20}}>物料名称:</td>
									<td>
										<Input style={{width: '100%',height:'100%'}} value={ModalForm.material_name} onChange={(ev)=>{this.Modal2Change(ev,'material_name')}}></Input>
									</td>
								</tr>
								<tr>
									<td className="title" style={{marginRight: 20}}>物料序号:</td>
									<td>
										<Input style={{width: '100%',height:'100%'}} value={ModalForm.material_num} onChange={(ev)=>{this.Modal2Change(ev,'material_num')}}></Input>
									</td>
								</tr>
								<tr>
									<td className="title" style={{marginRight: 20}}>需求状态:</td>
									<td>
										<select className="select" value={ModalForm.status} onChange={(ev)=>{this.Modal2Change(ev,'status')}}>
											<option key="-1" value=""></option>
											<option key="0" value="设备类型0">需求状态0</option>
											<option key="1" value="需求状态1">需求状态1</option>
											<option key="2" value="需求状态2">需求状态2</option>
										</select>
									</td>
								</tr>
								<tr>
									<td className="title" style={{marginRight: 20}}>优先级:</td>
									<td>
										<select className="select" value={ModalForm.priority} onChange={(ev)=>{this.Modal2Change(ev,'priority')}}>
											<option key="-1" value=""></option>
											<option key="0" value="优先级0">优先级0</option>
											<option key="1" value="优先级1">优先级1</option>
											<option key="2" value="优先级2">优先级2</option>
										</select>
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
										<Input style={{width: '100%',height:'100%'}} value={ModalForm.demander} onChange={(ev)=>{this.Modal2Change(ev,'demander')}}></Input>
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
		let form = {...this.state.ModalForm};
		let url = originalUrl + materialrequirements;
		let params = form;
		axios.post(url,params).then((res)=>{
			message.success("提交成功！");
			for(let item in form){
				form[item] = '';
			}
			this.setState({ModalForm: form});
		}).catch((err)=>{
			message.error("提交失败！");
			for(let item in form){
				form[item] = '';
			}
			this.setState({ModalForm: form});
		})
	}
}
export default MaterialReq;