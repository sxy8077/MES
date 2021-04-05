import React, { Component } from 'react'
import { Modal, Form, Input, message, DatePicker  } from 'antd'
import {Model} from '../../../../dataModule/testBone';
import {SaleOrderUrl} from '../../../../dataModule/UrlList'

const model = new Model();
class AddSaleModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmLoading: false,
            contact_person:'',
            contact_position:'',
            contact_tel:'',
            remark: '',  
        }
    }

    handleOk = () => {
        const {validateFields} = this.props.form; 
        validateFields();          //校验并获取一组输入域的值
        const params = {
            sale_form_code: this.state.sale_form_code,
            delivery_address: this.state.delivery_address,
            delivery_date: this.state.delivery_date,
            contact: this.state.contact,
            saler: this.state.saler
        }
        this.setState({
            confirmLoading: true,
        })
        this.createNewSale(params)
    }

    createNewSale = (params) => {
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

    onChangeDate = (date, dateString) => {
        // console.log(dateString)
        this.setState({
            delivery_date: dateString
        })
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
                    title="新增销售订单信息"
                    visible={this.props.Visible}               //对话框是否可见  这个地方通过this.props.Visible 接收到父组件传过来的Visible
                    onOk={this.handleOk}                      //点击确定回调
                    confirmLoading={confirmLoading}            //确定按钮 loading
                    onCancel={this.props.cancel}                //点击遮罩层或右上角叉或取消按钮的回调
                    destroyOnClose={true}               //关闭时销毁 Modal 里的子元素  默认关闭后状态不会自动清空, 如果希望每次打开都是新内容，请设置 destroyOnClose
                >
                <div>      {/* formItemLayout标签布局 */}                                 
                    <Form {...formItemLayout}  ref='contactForm' onSubmit={this.onSubmit}>

                        <Form.Item
                            label="销售订单号"
                        >
                            {getFieldDecorator('sale_form_code', {
                            rules: [{ required: true
                                , message: '请输入销售订单号' }],            //getFieldDecorator()  自定义校验方法,设置此项为必填项
                        })(
                            <Input  name="sale_form_code" onChange={this.handleChange} /> //onChange	输入框内容变化时的回调 value	输入框内容
                        )}
                        </Form.Item>

                        <Form.Item
                            label="交货地址"
                        >
                            {getFieldDecorator('delivery_address', {
                                rules: [{ required: true, message: '请输入交货地址' }],
                            })(
                                <Input  name="delivery_address" onChange={this.handleChange} />
                            )}
                        </Form.Item>
                        
                        <Form.Item
                            label="交货时间"
                        >
                            {getFieldDecorator('delivery_date', {
                                rules: [{ required: true, message: '请输入交货时间' }],
                            })(
                                <DatePicker onChange={this.onChangeDate} />
                            )}
                        </Form.Item>

                        <Form.Item
                            label="联系人"
                        >
                            <Input  name="contact" onChange={this.handleChange} />
                        </Form.Item>

                        <Form.Item
                            label="销售员"
                        >
                        <Input  name="saler" onChange={this.handleChange} />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
            </div>
        )
    }
}

export default Form.create()(AddSaleModal)
