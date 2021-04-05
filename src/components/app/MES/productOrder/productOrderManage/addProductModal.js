import React, { Component } from 'react'
import { Modal, Form, Input, message, DatePicker, Select  } from 'antd'
import { Model } from '../../../../../dataModule/testBone';
import { SaleOrderUrl } from '../../../../../dataModule/UrlList'

const model = new Model()
const { Option } = Select
class AddProductOrderModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmLoading: false, 
        }
    }

    handleOk = () => {
        const {validateFields} = this.props.form; 
        validateFields();          //校验并获取一组输入域的值
        const params = {
            order_form_code: this.state.order_form_code,
            production_requirements: this.state.production_requirements,
            priority: this.state.priority,
            order_time: this.state.order_time,
            expected_time: this.state.expected_time,
            complete_time: this.state.complete_time
        }
        this.setState({
            confirmLoading: true,
        })
        this.createNewSale(params)
    }

    createNewSale = (params) => {
        console.log(params)
        let me = this;
        model.fetch(
          params,
          SaleOrderUrl,
          'post',
          function() {
            me.props.cancel
            me.setState({
                confirmLoading: false,
            })
            // const item = me.props.getParams();
            // me.props.getCurrentPage(item);
            message.success('创建成功')
          },
          function() {
            message.warning('发送数据失败，请重试')
            setTimeout(() => {
                me.setState({
                  confirmLoading: false,
                });
              }, 2000)
          },
          false
        )
      }

    //输入框内容保存
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        // console.log(e.target.value)
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
        const { confirmLoading } = this.state
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
                    title="新增生产订单信息"
                    visible={this.props.Visible}               //对话框是否可见  这个地方通过this.props.Visible 接收到父组件传过来的Visible
                    onOk={this.handleOk}                      //点击确定回调
                    confirmLoading={confirmLoading}            //确定按钮 loading
                    onCancel={this.props.cancel}                //点击遮罩层或右上角叉或取消按钮的回调
                    destroyOnClose={true}               //关闭时销毁 Modal 里的子元素  默认关闭后状态不会自动清空, 如果希望每次打开都是新内容，请设置 destroyOnClose
                >
                <div>      {/* formItemLayout标签布局 */}                                 
                    <Form {...formItemLayout}  ref='addProductForm' onSubmit={this.onSubmit}>

                        <Form.Item
                            label="生产订单号"
                        >
                            {getFieldDecorator('order_form_code', {
                            rules: [{ required: true
                                , message: '请输入生产订单号' }],            //getFieldDecorator()  自定义校验方法,设置此项为必填项
                        })(
                            <Input  name="order_form_code" onChange={this.handleChange} /> //onChange	输入框内容变化时的回调 value	输入框内容
                        )}
                        </Form.Item>

                        <Form.Item
                            label="生产要求"
                        >
                            <Input  name="production_requirements" onChange={this.handleChange} />
                        </Form.Item>

                        <Form.Item
                            label="优先级"
                        >
                            {getFieldDecorator('priority', {
                            rules: [{ required: true
                                , message: '请选择优先级' }],  
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
                                rules: [{ required: true, message: '请输入下单时间' }],
                            })(
                                <DatePicker onChange={(...arg) => this.onChangeDate(...arg, 'order_time')} />
                            )}
                        </Form.Item>

                        <Form.Item
                            label="期望时间"
                        >
                            {getFieldDecorator('expected_time', {
                                rules: [{ required: true, message: '请输入期望时间' }],
                            })(
                                <DatePicker onChange={(...arg) => this.onChangeDate(...arg, 'expected_time')} />
                            )}
                        </Form.Item>

                        <Form.Item
                            label="完成时间"
                        >
                            <DatePicker onChange={(...arg) => this.onChangeDate(...arg, 'complete_time')} />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
            </div>
        )
    }
}

export default Form.create()(AddProductOrderModal)
