import React, { Component } from 'react';
import { Input, Button, Table, Popconfirm, message, Icon, Tooltip } from 'antd';
// import { originalUrl, deviceManagement, } from '../../../dataModule/UrlList';
import { Model } from '../../../../../dataModule/testBone';
// import history from '../../common/history.js';
import './style.less';

const model = new Model();
class ProductOrderDetail extends Component{
	constructor(){
		super();
		this.state = {
			id: null,     //该行数据id 主键
			//搜索区 销售订单号搜索
			orderFormCode: null,
			//table data：数据 columns 表头
			data: [],
			columns:[
				// {title: '销售订单ID',dataIndex: 'sale_form_id',width: '10%',align:'center',},
				{title: '生产订单号',dataIndex: 'order_form_code',width: '10%',align:'center',},
				{title: '订单状态',dataIndex: 'order_status',width: '10%',align:'center',},
				{title: '生产要求',dataIndex: 'production_requirements',width: '20%',align:'center',},
				{title: '优先级',dataIndex: 'priority',width: '10%',align:'center',},
				{title: '下单时间',dataIndex: 'order_time',width: '10%',align:'center',},
				{title: '期望时间',dataIndex: 'expected_time',width: '10%',align:'center',},
				{title: '完成时间',dataIndex: 'complete_time',width: '10%',align:'center',},
				{title: '创建人',dataIndex: 'create_userby',width: '10%',align:'center',},
				{title: '操作',dataIndex: 'action', width: '10%', render: (text, record) => {
					return(
						<div>
							<Popconfirm
									title="确定删除该条记录?"
									onConfirm={() => this.deleteInfo(record.key)}
									okText="是"
									cancelText="否"
							>
								<Tooltip title="删除信息" >
								<Icon type="delete" theme="filled"  style={{ fontSize:'20px', color:'red', marginRight: '8px' }} />
								</Tooltip>
							</Popconfirm>
							<Tooltip title="编辑信息">
								<Icon type="edit" className="edit"  theme="twoTone" style={{fontSize:'20px', marginRight: '8px' }} 
									onClick={() => this.showEditModal(record)}
								/>
							</Tooltip>
							<Tooltip title="查看订单详情">
								<Icon type="profile" theme="twoTone" style={{fontSize:'20px' }} 
									onClick={() => this.showModal('detail')}
								/>
							</Tooltip>
						</div>
					)
				}},
			],
			editInfo: null,
			addModalVisible: false,
			editModalVisible: false,
			detialModalVisible: false,
		}
	}

	componentDidMount() {
		// const params = this.getParams();
		// this.getProductFormOrder(params);
	}

	getProductFormOrder = (params) => {
		let me = this;
		model.fetch(
			params,
			'./api/productOrder.json',
			'get',
			function(res) {
				console.log(res.data.data)
				const getData = me.addKey(res.data.data)
				me.setState({
					data: getData
				})
			},
			function() {
				message.error('数据获取失败，请刷新页面！')
			},
			true
		)
	}

	// 增加table的key
	addKey = (data) => {
		for(let i=0; i<data.length; i++){
			data[i]['key'] = data[i].product_form_id
		}
		return data
	}

	// 分页 搜索用
	getParams( currentPage = 1, size = 10, orderFormCode = null ) {
        let params = {};
        params = {
            currentPage,
            size,
            orderFormCode
        }
        return params;
    }

    showModal = (action) => {
        switch (action) {
            case 'add':
                this.setState({
                    addModalVisible: true
                })
                break
			case 'detail':
				this.setState({
					detialModalVisible: true
				})
            default:
                break
        }
    }

    closeModal = () => {
        this.setState({
            addModalVisible: false,
			editModalVisible: false,
			detialModalVisible: false
        })
    }

	showEditModal = (record) => {
		this.setState({
			editModalVisible: true
		})
		if (record !== undefined ) {
			this.setState({
				editInfo: record,
			})
		}
		// console.log(record)
	}

	deleteInfo = (key) => {
		console.log(key)
	}

	render(){
		const { columns, data, } = this.state;
		return(
			<div id="productOrderDetail">
				<div >
					<Button className="button" type="primary" onClick={()=>{this.showModal('add')}}>添加订单明细</Button>
				</div>
                {/* <div className="main">
					<Table className="antd-Table" columns={columns} dataSource={data} 
					pagination={{ pageSize: 8 }} scroll={{ y: '100%', x: 1000 }}/>
				</div> */}
			</div>
		)
	}
}
export default ProductOrderDetail;