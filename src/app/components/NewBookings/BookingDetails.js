import React, {Component} from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'
import {getItem} from '../../utils/apiHelper'
import {mapObject} from '../../utils/helper'

import PerDay from './BookItem/PerDay'
import PerNight from './BookItem/PerNight'
import PerTime from './BookItem/PerTime'
import TimeSlots from './BookItem/TimeSlots'
import GiftCertificate from './BookItem/GiftCertificate'

const style = {
  center: {
    margin: '0',
    position: 'relative',
    top: '0px',
    left:'0px',
    right:'25px',
    width: 'auto',
    marginLeft:'-24px',
    marginRight: '-24px',
    display: 'block',
    whiteSpace: 'pre-wrap',
    padding: '0px !important',
  },
  itemName: {
    fontWeight: 'bold',
    color: '#ffffff',
    position: 'relative',
    margin: '10px',
    textAlign: 'center',
  },
  titleBar: {
    width: '100%',
    height: '50px',
    borderStyle: 'solid',
    borderColor: 'rgb(44, 151, 222)',
    backgroundColor: 'rgb(44, 151, 222)',
    textAlign: 'center'
  },
  formContent: {
    paddingLeft: '15px',
  }
}
export default class BookingDetails extends Component {
  constructor(props){
    super(props)
    this.state = {loading: true}
  }
  componentDidUpdate(){
    window.dispatchEvent(new Event('resize'))
  }
  setItem(item){
    this.setState({item: item, child: item, loading: false})
    if(this.state.item.product_group_type === 'P'){
      if(this.state.item.product_group_children.length > 0){
        getItem(this.state.item.product_group_children[0].item_id, this.props.start_date, this.props.end_date, this.setChild.bind(this))
      }
    }
  }
  setChild(child){
    this.setState({child: child, loading: false})
  }
  book(){
    if(this.state.item.type === 'GC'){
      return(
        <div>
          <GiftCertificate
            item={this.state.child}
            close={this.props.close}
          />
        </div>
      )
    }
    if(this.state.item.unit === 'D'){
      return(
        <div>
          <PerDay
            item={this.state.child}
            close={this.props.close}
          />
        </div>
      )
    }
    if(this.state.item.unit === 'N'){
      return(
        <div>
          <PerNight
            item={this.state.child}
            close={this.props.close}
          />
        </div>
      )
    }
    if(this.state.item.unit === 'TS'){
      return(
        <div>
          <TimeSlots
            item={this.state.child}
            close={this.props.close}
          />
        </div>
      )
    }
    if((new RegExp('(?:10M|15M|20M|30M|H)')).test(this.state.item.unit)){
      return(
        <div>
          <PerTime
            item={this.state.child}
            close={this.props.close}
          />
        </div>
      )
    }
  }
  childSelect(){
    if(this.state.item.product_group_type === 'P')
      if(this.state.item.product_group_children.length > 0){
        var childId = this.state.item == this.state.child ? this.state.item.product_group_children[0].item_id : this.state.child.item_id
        return(
          <SelectField
            value={childId}
            onChange={((e, i, value) => {
              getItem(value, this.props.start_date, this.props.end_date, this.setChild.bind(this))
            })}
          >
            {this.state.item.product_group_children.map((child) => {
              return(
                <MenuItem
                  key={child.item_id}
                  value={child.item_id}
                  primaryText = {child.name}
                />
              )
            })}
          </SelectField>
        )}
  }
  render(){
    if(this.state.loading){
      getItem(this.props.item, this.props.start_date, this.props.end_date, this.setItem.bind(this))
      return <CircularProgress size={80} thickness={5} style={style.center} />
    }else{
      return(
        <div style={style.center}>
          <div style={style.titleBar}>
            <h2 style={style.itemName}>
              {this.state.item.name}
            </h2>
          </div>
          <div key={this.state.child.item_id} style={style.formContent}>
            {this.childSelect()}
            {this.state.child && this.book()}
          </div>
        </div>
      )
    }
  }
}
