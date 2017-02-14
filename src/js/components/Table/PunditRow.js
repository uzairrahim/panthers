import './styles.scss';
import './PunditRow.scss';
import React, { Component, PropTypes } from 'react';
import Image from 'components/Image';
import { getProfileImageURL } from 'utils';

class PunditRow extends Component {

	constructor(props){
		super(props);
		this.onSelectHandler = this.onSelectHandler.bind(this);
		this.onOversChangeHandler = this.onOversChangeHandler.bind(this);
		this.state = {
			selection : false
		}
	}

	render(){
		const { data } = this.props;
		const photo = data.photo !== '' ? getProfileImageURL(data.photo) : '';
		return(
			<div className={'t-row selectable ' + this.getSelectedState()}>
				<div className='t-col name' onClick={this.onSelectHandler}>
					<Image src={photo}/>
					<div className='text small ml10'>{data.first_name} {data.last_name}</div>
				</div>
				{
					this.state.selection ? 
					<input
						ref='overs'
						type='number'
						className='input number mr20'
						onChange={this.onOversChangeHandler}
						defaultValue={0}
					/>
					: null
				}
			</div>
		);
	}

	getSelectedState() {
		if(this.state.selection) return 'selected';
	}

	onSelectHandler(){
		let { onAddToRoster, onRemoveFromRoster, data } = this.props;
		let selection = !this.state.selection;
		let overs = this.refs.overs ? this.refs.overs.value || 0 : 0;

		if(selection) onAddToRoster(data.id, overs);
		if(!selection) onRemoveFromRoster(data.id);
		this.setState({selection});
	}

	onOversChangeHandler(){
		let { data } = this.props;
		let overs = this.refs.overs.value || 0;
		this.props.onOversChangeHandler(data.id, overs);
	}
	
}

PunditRow.propTypes = {
	data : PropTypes.object,
	onAddToRoster : PropTypes.func,
	onRemoveFromRoster : PropTypes.func,
	onOversChangeHandler : PropTypes.func
}

export default PunditRow;