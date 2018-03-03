import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Table, Row, Col, Icon, Menu } from 'antd'
import AddTaskModal from '../AddTaskModal'
import { fetchList, createTask, editTask } from '../../store/tasks/actions'

import './TaskTable.css'

const SubMenu = Menu.SubMenu

class TaskTable extends Component {
  state = {
    showTaskModal: false,
    filterDropdownVisible: false,
    isEdit: false,
    editableRow: {},
    page: 1,
    sortByAZ: 'asc',
    pageSize: 3
  }

  componentDidMount = () => {
    this.fetchList()
  }

  fetchList = () => {
    let { page, sortByAZ, sortField } = this.state
    this.props.dispatch(fetchList(page, sortByAZ, sortField))
  }

  handleModal = () => this.setState({showTaskModal: true})

  handleAddTask = params => {
    this.props.dispatch(createTask(params))
  }

  handleEditTask = (params, id) => {
    this.props.dispatch(editTask(params, id))
  }

  handleEditTaskOpen = row => {
    this.setState({
      isEdit: true,
      editableRow: row,
      showTaskModal: true
    })
  }

  handleModalClose = () => {
    this.setState({
      showTaskModal: false,
      isEdit: false,
      editableRow: {}
    })
  }

  handlePageClick = page => {
    this.setState({ page }, this.fetchList)
  }

  sortByField = key => {
    this.setState({sortField: key }, this.fetchList)
  }

  sortAZ = () => {
    let sortByAZ
    if (this.state.sortByAZ === 'asc') {
      sortByAZ = 'desc'
    } else {
      sortByAZ = 'asc'
    }
    this.setState({sortByAZ}, this.fetchList)
  }

  callSortAction = menu => {
    const calFunc = {
      id: () => this.sortByField(menu.key),
      username: () => this.sortByField(menu.key),
      email: () => this.sortByField(menu.key),
      status: () => this.sortByField(menu.key),
      'a-z': this.sortAZ
    }
    if (calFunc[menu.key]) {
      calFunc[menu.key]()
    }
    this.setState({ filterDropdownVisible: false })
  }

  getTableData = () => {
    const { fetching, taskList: { tasks, total_task_count }} = this.props
    const { sortByAZ } = this.state

    const menu = (
      <Menu className='sort-menu' onClick={this.callSortAction}>
        <Menu.Item key='a-z'>
          {sortByAZ === 'asc' ? 'Sort by Z-A' : 'Sort by A-Z'}
        </Menu.Item>
        <SubMenu className='sort-sub-menu' key='sortField' title='Sort Filed'>
          <Menu.Item key='id'> By Id</Menu.Item>
          <Menu.Item key='username'>By Username</Menu.Item>
          <Menu.Item key='email'>By Email</Menu.Item>
          <Menu.Item key='status'>By Status</Menu.Item>
        </SubMenu>
      </Menu>
    )

    const columns = [{
      title: '',
      key: 'filter',
      filterDropdown: (
        <div className='custom-filter-dropdown'>
          {menu}
        </div>
      ),
      filterIcon: <Icon type='filter' style={{ verticalAlign: 'middle', cursor: 'pointer', color: this.state.isSortBySelected ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: visible => {
        this.setState({
          filterDropdownVisible: visible
        })
      }
    },{
      title: 'User Name',
      dataIndex: 'username',
      key: 'username'      
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: 'Text',
      dataIndex: 'text',
      key: 'text',
    }, {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '',
      key: 'edit',
      render: (value, row) => (
        <div>
          <Icon type='edit' className='edit-icon' onClick={() => this.handleEditTaskOpen(row)} />
        </div>
      )
    }]
    const locale = {
      emptyText: 'No tasks here'
    }
    return {
      columns,
      locale,
      rowKey: 'id',
      pagination: {
        total: parseInt(total_task_count, 10),
        current: this.state.page,
        pageSize: this.state.pageSize,
        onChange: this.handlePageClick
      },
      dataSource: tasks,
      loading: fetching
    }
  }
  render() {
    const { showTaskModal, editableRow, isEdit } = this.state

    return (
      <div>
        <Row>
          <Col span={24}>
            <h1 style={{textAlign: 'center'}}><b>Task Table</b></h1>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Button type='primary' className='create-button' onClick={this.handleModal}>
              Create Task
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table {...this.getTableData()} />
          </Col>
        </Row>
        {showTaskModal && (
          <AddTaskModal
            edit={isEdit}
            editableRow={editableRow}
            addTask={this.handleAddTask}
            editTask={this.handleEditTask}
            closeModal={this.handleModalClose} />
        )}

      </div>
    )
  }
}

const mapStateToProps = state => ({
  taskList: state.tasks.list.asMutable({deep: true}),
  fetching: state.tasks.fetching
})

export default connect(mapStateToProps)(TaskTable)
