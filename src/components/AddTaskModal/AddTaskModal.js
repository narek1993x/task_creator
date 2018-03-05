import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Input, Form, Modal, Upload, Icon, Select, message } from 'antd'

import './AddTaskModal.css'

const FILE_TYPES = ['JPEG', 'JPG', 'GIF', 'PNG']
class AddTaskModal extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    imgSrc: '',
    fileList: [],
    requiredMessage: '',
    requiredStatusMessage: '',
  }

  componentWillMount = () => {
    const { editableRow, edit } = this.props

    if (edit && editableRow) {
      const imageFile = {
        uid: -1,
        name: 'default.png',
        status: 'done',
        url: editableRow.image_path
      }
      this.setState(prevState => {
        return {
          imgSrc: imageFile.url,
          fileList: prevState.fileList.concat(imageFile)
        }
      })
    }      
  }

  onOk = () => {
    const { form, editableRow, addTask, editTask, edit } = this.props
    form.validateFields((err, values) => {
      if (err) return
      if (edit) {
        const { id } = editableRow
        const newValues = {
          text: values.text,
          status: values.status
        }
        editTask(newValues, id)
      } else {
        addTask(values)
      }
      this.onOkFinish()
    })
  }
  
  onOkFinish = () => {
    this.props.form.resetFields()
    this.props.closeModal()
  }

  onCancel = () => {
    this.props.closeModal()
    this.props.form.resetFields()
  }
  
  statusChangeHandle = status => {
    this.props.form.setFieldsValue({status})
  }

  handleUploadChange = ({ fileList }) => {
    if (fileList && fileList[0] && fileList[0].originFileObj) {
      const { originFileObj } = fileList[0]
      this.props.form.setFieldsValue({image: originFileObj})
    }
    this.setState({ fileList, imgSrc: fileList[0].thumbUrl })
  }

  handleBeforeUpload = file => {
    const types = file.type === 'image/jpeg' ||
                  file.type === 'image/gif' ||
                  file.type === 'image/png'
    if (!types) {
      message.error(`You can only upload ${FILE_TYPES.join(', ')} files!`)
    }
    return types
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }

  showPreview = () => {
    const { imgSrc } = this.state
    const fields = ['username', 'email', 'text']
    const { username, email, text } = this.props.form.getFieldsValue(fields)

    return Modal.confirm({
      title: 'PREVIEW',
      width: 520,
      content: (
        <div className='preview-modal'>
          <div>Username: <span>{username}</span></div>
          <div>Email: <span>{email}</span></div>
          <div>Text: <span>{text}</span></div>
          <div>Image: {imgSrc && <img src={imgSrc} alt='img' width='100' heigth='100' />}</div>  
        </div>
      )
    })
  }

  handleCancel = () => this.setState({ previewVisible: false })

  validateEmail = (rule, value, callback) => {
    let error = !value ? 'Email is required' : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'This email is not valid' : ''
    this.setState({ requiredMessage: error })
    return error ? callback(error) : callback()
  }

  validateStatus = (rule, value, callback) => {
    let error = !value ? 'Status is required' : value < 0 || value > 10 ? 'Status must be between 0 to 10' : ''
    this.setState({ requiredMessage: error })
    return error ? callback(error) : callback()
  }

  render () {
    const { edit, editableRow } = this.props
    const statuses = [0, 10]

    const { requiredMessage, requiredStatusMessage, previewVisible, previewImage, fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className='ant-upload-text'>Upload</div>
      </div>
    )

    return (
      <Modal
        onCancel={this.onCancel}
        title={edit ? 'Edit task' : 'Add new task'}
        visible
        maskClosable={false}
        footer={[
          <Button style={{float: 'left'}} key='preview' type='ghost' onClick={this.showPreview}>
            PREVIEW
          </Button>,
          <Button key='back' type='ghost' onClick={this.onCancel}>
            CANCEL
          </Button>,
          <Button key='submit' type='primary' onClick={this.onOk}>
            {edit ? 'EDIT' : 'SAVE'}
          </Button>
        ]}
        >
        <Form autoComplete='off' layout='vertical' className='modal-form'>
          <Form.Item label='User Name'>
            {this.props.form.getFieldDecorator('username', {               
                rules: [{ required: true, message: 'This field can not be empty' }],
                initialValue: editableRow && editableRow.username
              })(
                <Input placeholder='Username' disabled={edit} />
              )}
          </Form.Item>
          <Form.Item label='Email'>
            {this.props.form.getFieldDecorator('email', {               
                rules: [{ required: true, message: requiredMessage, validator: this.validateEmail }],
                initialValue: editableRow && editableRow.email
              })(
                <Input placeholder='Email' disabled={edit} />
              )}
          </Form.Item>
          {edit && <Form.Item label='Status'>
            {this.props.form.getFieldDecorator('status', {
              rules: [{ required: true, message: requiredStatusMessage, validator: this.validateStatus }],
              initialValue: editableRow && editableRow.status ? editableRow.status : ''
            })(
              <Select
                placeholder='Choose status'
                onChange={this.statusChangeHandle}>
                {statuses.map((option, i) => <Select.Option key={i}>{option}</Select.Option>)}
              </Select>
            )}
          </Form.Item>}
          <Form.Item label='Text'>
            {this.props.form.getFieldDecorator('text', {               
                rules: [{ required: true, message: 'Text can not be empty' }],
                initialValue: editableRow && editableRow.text
              })(
              <Input.TextArea placeholder='Text' rows={4} />
              )}
          </Form.Item>
          <Form.Item label='Image'>
              {this.props.form.getFieldDecorator('image', {                               
                rules: [{ required: false, message: 'This field can not be empty' }],
                initialValue: editableRow && editableRow.image
              })(
                <div>
                  <Upload
                    action='//jsonplaceholder.typicode.com/post/'
                    listType='picture-card'
                    fileList={fileList}
                    disabled={edit}
                    onPreview={this.handlePreview}
                    beforeUpload={this.handleBeforeUpload}
                    onChange={this.handleUploadChange} >
                    {fileList.length ? null : uploadButton}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt='example' style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </div>
              )}
            </Form.Item>       
        </Form>
      </Modal>
    )
  }
}

AddTaskModal.propTypes = {
  form: PropTypes.object,
  closeModal: PropTypes.func,
  addMessage: PropTypes.func
}

export default Form.create()(AddTaskModal)
