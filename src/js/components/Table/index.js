import './styles.scss';
import React, { Component, PropTypes } from 'react';
import Classnames from 'classnames';
import BattingRow from './BattingRow';
import BowlingRow from './BowlingRow';

class Table extends Component {

	render(){
		const { head, data, type } = this.props;
		return(
			<div className='table'>
				<div className='t-head'>
					<div className='t-row'>
						{
							head.map(function(h,i){
								return (
									<div className={Classnames('t-col', h.classnames)} key={'head-col-' + i}>
										<div className='text primary tiny gray'>{h.label}</div>
									</div>
								)
							})
						}
					</div>
				</div>
				<div className='t-body'>
				{
					type === 'batting' ? 
						data.map(function(d,i){
							return (
								<BattingRow data={d} key={'batting-row-' + i}/>
							);
						})
					:
						data.map(function(d,i){
							return (
								<BowlingRow data={d} key={'batting-row-' + i}/>
							);
						})
				}
				</div>
			</div>
		);
	}
}

Table.propTypes = {
	head : PropTypes.array,
	data : PropTypes.array,
	type : PropTypes.string
}

Table.defaultProps = {
	head : [],
	data : [],
	type : ''
}

export default Table;