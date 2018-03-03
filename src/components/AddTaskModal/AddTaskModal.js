import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Form, Modal, Upload, Icon } from 'antd'

class AddTaskModal extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    requiredMessage: '',
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
          fileList: prevState.fileList.concat(imageFile)
        }
      })
    }      
  }

  onOk = () => {
    this.props.form.validateFields((err, values) => {
      if (err) return
      if (this.props.edit) {
        const { id } = this.props.editableRow
        const editValues = {
          text: values.text,
          status: values.status
        }
        this.props.editTask(editValues, id)
      } else {
        this.props.addTask(values)
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

  handleUploadChange = ({ fileList }) => {
    if (fileList && fileList[0] && fileList[0].originFileObj) {
      const { originFileObj } = fileList[0]
      this.props.form.setFieldsValue({image: originFileObj})
    }
    this.setState({ fileList })
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }

  handleCancel = () => this.setState({ previewVisible: false })

  validateEmail = (rule, value, callback) => {
    let error = !value ? 'Name is required' : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'This email is not valid' : ''
    this.setState({ requiredMessage: error })
    return error ? callback(error) : callback()
  }

  render () {
    const { edit, editableRow } = this.props
    const { requiredMessage, previewVisible, previewImage, fileList } = this.state
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
        okText={edit ? 'EDIT' : 'SAVE'}
        cancelText='Cancel'
        onOk={this.onOk}
        visible
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
              rules: [{ required: true, message: 'Status can not be empty' }],
              initialValue: editableRow && editableRow.status
            })(
              <Input placeholder='Status' type='number' />
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
                    action='//jsonplaceholder.typicode.com/posts/'
                    listType='picture-card'
                    fileList={fileList}
                    disabled={edit}
                    onPreview={this.handlePreview}
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
