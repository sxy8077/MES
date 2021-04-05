import React from 'react';
import './styles.less';
import word from './test/word.docx';
import excel from './test/excel.xlsx';
import pdf from './test/pdf.pdf';
import img from './test/img.png';

import { Button } from 'antd';
//react文件预览支持docx，xlsx
import FileViewer from 'react-file-viewer';
//react预览pdf文件插件
import PDF from 'react-pdf-js';

class Test extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          fileState: props.fileState,//父类传递的fileState
          type: props.fileType,//父类传递的fileType
          page: 1,
          pages: null,
      }
  }
  componentWillReceiveProps(nextProps) {//props发生变化时执行
      this.setState({
          fileState: nextProps.fileState,//父类传递的fileState
          type: nextProps.fileType,//父类传递的fileType
      })
  }
  closeFile =()=>{
      this.setState({
          fileState: 'none',
      })
      // this.props.goToFile('none');
  }
 //获取所有页
  onDocumentComplete = (pages) => {
      this.setState({ page: 1, pages })
  }
  //点击上一页
  handlePrevious = () => {
      this.setState({ page: this.state.page - 1 })
  }
  //点击下一页
  handleNext = () => {
      this.setState({ page: this.state.page + 1 })
  }
  render() {
      const { page, pages, type } = this.state;
      return (<React.Fragment>
          <div style={{ display: this.state.fileState }} className="filesBox">
              <div className="fileTop">
                  <span>预览</span>
                  <img className={styles.x} src={img} onClick={this.closeFile.bind(this)} alt="" />
              </div>
              {
                  type == 'docx' ?
                      <div className="flieContent">
                          <FileViewer
                              fileType='docx'//文件类型
                              filePath={word} //文件地址
                          />
                      </div>
                      : type == 'xlsx' ?
                          <div className="flieContent">
                              <FileViewer
                                  fileType='xlsx'//文件类型
                                  filePath={excel} //文件地址
                              />
                          </div>
                          : type == 'pdf' ?
                              <div>
                                  <div className="filePdf">
                                      <PDF
                                          file={pdf}
                                          onDocumentComplete={this.onDocumentComplete}
                                          page={page}
                                      />
                                  </div>
                                  <div className="filePdfFooter">
                                      {page === 1 ?
                                          null
                                          :
                                          <Button type='primary' onClick={this.handlePrevious}>上一页</Button>
                                      }
                                      <div className="filePdfPage">
                                          <span>第{page}页</span>/<span>共{pages}页</span>
                                      </div>
                                      {page === pages ?
                                          null
                                          :
                                          <Button style={{ marginLeft: '10px' }} type='primary' onClick={this.handleNext}>下一页</Button>
                                      }
                                  </div>
                              </div>
                              : ''
              }
          </div>
      </React.Fragment>)
  }
}
export default Test;
