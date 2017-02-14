import './styles.scss';
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Select extends Component {

	constructor(props) {
		super(props);

		this.state = {
			show : false,
			selectedIndex : this.props.selectedIndex
		}
	}

	componentDidMount() {
		this.setSelectState = this.setSelectState.bind(this);
		this.onChangehandler = this.onChangehandler.bind(this);
	}

	render() {
		const { classNames, options } = this.props;
		return(
			<div className={classnames('select', classNames)}>
				<div className='text medium gray label' onClick={this.setSelectState}>
					{
						!options.length ?
							'Select'
						:
							options[this.state.selectedIndex]
					}
				</div>
				<div className={'options' + this.getSelectState()}>
				{
					options.map(function(o,i){
						return (
							<div className={'option' + this.getSelectedState(i)} key={'option' + i} data-index={i} onClick={this.onChangehandler}>{o}</div>
						)
					}.bind(this))
				}
				</div>
			</div>
		);
	}

	getSelectState() {
		return this.state.show ? ' show' : '';
	}

	setSelectState() {
		this.setState({'show' : !this.state.show});
	}

	getSelectedState(index) {
		return this.state.selectedIndex == index ? ' selected' : '';
	}

	onChangehandler(event) {
		let i = event.target.getAttribute('data-index');
		this.setState({selectedIndex : i});
		this.setSelectState();
		this.props.onSelectHandler(i);
	}
}

Select.propTypes = {
	classNames : PropTypes.string,
	options : PropTypes.array,
	selectedIndex : PropTypes.number,
	onSelectHandler : PropTypes.func
}

Select.defaultProps = {
	classNames : '',
	options : [],
	selectedIndex : 0
}

export default Select;