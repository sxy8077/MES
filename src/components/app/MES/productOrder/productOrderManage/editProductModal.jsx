import React, { Component } from 'react';
import { Model } from '../../../../../dataModule/testBone'
import { Modal, Form, Input, message, Select, DatePicker } from 'antd'
import moment from 'moment';

const model = new Model();
const { Option } = Select
class EditProductModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            confirmLoading: false,
            product_form_id: '',
            order_form_code: '',
            production_requirements: '',
            priority: '',
            order_time: '',
            expected_time: '',
            complete_time: '',
        }
    }

    componentDidUpdate(prevProps) {
        // console.log('preProps', prevProps.editInfo)
        // console.log('this.editinfo', this.props.editInfo)
        if(this.props.editInfo !== prevProps.editInfo) {
            let editInfo = this.props.editInfo
            this.setState({
                product_form_id: editInfo.key,
                order_form_code: editInfo.order_form_code,
                production_requirements: editInfo.production_requirements,
                priority: editInfo.priority,
                order_time: editInfo.order_time,
                expected_time: editInfo.expected_time,
                complete_time: editInfo.complete_time
            })
        }
    }

    handleOk = () => {
        const {validateFields} = this.props.form;
        validateFields();
        const params = {
            order_form_code: this.state.order_form_code,
            production_requirements: this.state.production_requirements,
            priority: this.state.priority,
            order_time: this.state.order_time,
            expected_time: this.state.expected_time,
            complete_time: this.state.complete_time
        }
        console.log(params)
    }

    handleCancel = () => {
        this.props.cancel()
    }

    //输入框内容保存
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    selectChange = (value) => {
        this.setState({
            priority: value
        })
    }

    onChangeDate = (date, dateString, action) => {
        // console.log(dateString, action)
        switch (action) {
            case 'order_time':
                this.setState({
                    order_time: dateString
                })
                break;
            case 'expected_time':
                this.setState({
                    expected_time: dateString
                })
                break;
            case 'complete_time':
                this.setState({
                    complete_time: dateString
                })
                break;
            default:
                break;
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const { visible } = this.props;
        const { confirmLoading, order_form_code, production_requirements, 
            priority, order_time, expected_time, complete_time,
        } = this.state
        const formItemLayout = {
            labelCol: {
              span: 5      //左边留白大小
            },
            wrapperCol: {
              span: 16,          // 内容区大小（两者和不能!>24
            },
        }

        return (
            <div>
                <Modal
                    title="编辑生产订单信息"
                    visible={visible}
                    confirmLoading={confirmLoading} 
                    onOk={this.handleOk}
                    onCancel={ () => this.handleCancel() }
                    destroyOnClose={true}
                >
                <div>
                    <Form {...formItemLayout}  ref='edtiProductForm' onSubmit={this.onSubmit}>
                        <Form.Item
                            label="生产订单号"
                        >
                            {getFieldDecorator('order_form_code', {
                            initialValue: order_form_code
                        })(
                            <Input  name="order_form_code" onChange={this.handleChange} />
                        )}
                        </Form.Item>

                        <Form.Item
                            label="生产要求"
                        >
                            {getFieldDecorator('production_requirements', {
                            initialValue: production_requirements
                        })(
                            <Input  name="production_requirements" onChange={this.handleChange} />
                        )}
                        </Form.Item>

                        <Form.Item
                            label="优先级"
                        >
                            {getFieldDecorator('priority', {
                            initialValue: priority
                        })(
                                <Select onChange={this.selectChange}>
                                    <Option value='1'>普通</Option>
                                    <Option value='2'>加急</Option>
                                    <Option value='3'>特急</Option>
                                </Select>
                        )}
                        </Form.Item>
                        
                        <Form.Item
                            label="下单时间"
                        >
                            {getFieldDecorator('order_time', {
                                initialValue: order_time === '' ? null : moment(order_time)
                            })(
                                <DatePicker  onChange={(...arg) => this.onChangeDate(...arg, 'order_time')} />
                            )}
                        </Form.Item>

                        <Form.Item
                            label="期望时间"
                        >
                            {getFieldDecorator('expected_time', {
                                initialValue: expected_time === '' ? null : moment(expected_time)
                            })(
                            <DatePicker onChange={(...arg) => this.onChangeDate(...arg, 'expected_time')} />
                            )}
                        </Form.Item>

                        <Form.Item
                            label="完成时间"
                        >   
                            {getFieldDecorator('complete_time', {
                                initialValue: complete_time === '' ? null : moment(complete_time)
                            })(
                            <DatePicker onChange={(...arg) => this.onChangeDate(...arg, 'complete_time')} />
                            )}
                        </Form.Item>
                    </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Form.create()(EditProductModal)