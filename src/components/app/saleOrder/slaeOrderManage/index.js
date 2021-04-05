import React, { Component } from 'react';
import { DatePicker, Input, Button, Table, Modal, Select, BackTop, Popconfirm,message } from 'antd';
// import { originalUrl, deviceManagement, } from '../../../dataModule/UrlList';
import { Model } from '../../../../dataModule/testBone';
import Edit from '../../../../statistics/edit.png';
import Delete from '../../../../statistics/delete.png';
import axios from "axios";
// import { changeOrder,changeType, typeChange } from '../../commonFunction.js';
// import history from '../../common/history.js';
import './style.less';
import AddSaleModal from './addSaleModal'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const {Option} = Select;
const model = new Model();
class saleOrderManage extends Component{
	constructor(){
		super();
		this.state = {
			id: null,     //该行数据id 主键
			//搜索区 销售订单号搜索
			saleFormCode: null,
			//table data：数据 columns 表头
			data: [],
			columns:[
				// {title: '销售订单ID',dataIndex: 'sale_form_id',width: '10%',align:'center',},
				{title: '销售订单号',dataIndex: 'sale_form_code',width: '10%',align:'center',},
				{title: '交货时间',dataIndex: 'delivery_date',width: '10%',align:'center',},
				{title: '交货地址',dataIndex: 'delivery_address',width: '20%',align:'center',},
				{title: '销售员',dataIndex: 'saler',width: '10%',align:'center',},
				{title: '联系人',dataIndex: 'contact',width: '10%',align:'center',},
				{title: '创建人',dataIndex: 'userby',width: '10%',align:'center',},
				{title: '创建时间',dataIndex: 'gmt_create',width: '10%',align:'center',},
				{title: '操作',dataIndex: 'action', width: '10%', render: (text, record) => {
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
			addModalVisible: false,
			editModalVisible: false,
		}
	}

	getSaleFormOrder = () => {

	}

	

    //搜索区 销售订单编号
	getSearchCode = (ev)=>{
		// console.log("搜索销售订单编号：",ev.target.value);
		this.setState({
			saleFormCode: ev.target.value,
		})
	}

    reset = ()=>{
		this.setState({
			saleFormCode: null,
		})
	}

    showModal = (action) => {
        switch (action) {
            case 'add':
                this.setState({
                    addModalVisible: true
                })
                break
			case 'edit':
				this.setState({
					editModalVisible: true
				})
            default:
                break
        }
    }

    closeModal = () => {
        this.setState({
            addModalVisible: false
        })
    }

	render(){
		const { columns, data, ModalForm, addModalVisible, Modal1Visible, saleFormCode } = this.state;
		return(
			<div id="slaeOrderManage">
				<div className="header">
					<div className="title">
						<h2>销售订单管理</h2>
					</div>
					<div className="filter">
						<div style={{width: "100%",height: "100%",display: 'flex'}}>
							<span className="span">
								销售订单号搜索:
								<Input className="input" value={saleFormCode} onChange={(ev)=>{this.getSearchCode(ev)}}></Input>
							</span>
							<Button className="button" type="primary" onClick={()=>{this.search()}}>搜索</Button>
							<Button className="button" type="primary" onClick={()=>{this.reset()}}>重置</Button>
							<Button className="button" type="primary" onClick={()=>{this.showModal('add')}}>添加订单</Button>
						</div>
					</div>
				</div>
                <div className="main">
					<Table className="antd-Table" columns={columns} dataSource={data} 
					pagination={{ pageSize: 8 }} scroll={{ y: '100%', x: 1000 }}/>
				</div>
                <AddSaleModal 
                    Visible = { addModalVisible }
                    cancel = { this.closeModal }
                />
			</div>
		)
	}
}
export default saleOrderManage;