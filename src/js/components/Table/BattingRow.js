import './styles.scss';
import React, { Component, PropTypes } from 'react';
import Image from 'components/Image';
import { getProfileImageURL } from 'utils';

class BattingRow extends Component {

	render(){
		const { data } = this.props;
		const photo = data.photo !== '' ? getProfileImageURL(data.photo) : '';
		return(
			<div className='t-row'>
				<div className='t-col name'>
					<Image src={photo}/>
					<div className='text small ml10'>{data.first_name} {data.last_name}</div>
				</div>
				<div className='t-col no-phone'>
					<div className='text tiny'>{data.innings}</div>
				</div>
				<div className='t-col no-phone'>
					<div className='text tiny'>{data.not_out}</div>
				</div>
				<div className='t-col'>
					<div className='text tiny underline'>{data.runs}</div>
				</div>
				<div className='t-col no-phone'>
					<div className='text tiny gray'>{data.balls}</div>
				</div>
				<div className='t-col no-phone'>
					<div className='text tiny gray'>{(data.runs/(data.innings - data.not_out)).toFixed(2)}</div>
				</div>
				<div className='t-col'>
					<div className='text tiny underline'>{data.highest}</div>
				</div>
				<div className='t-col no-phone'>
					<div className='text tiny'>{data.hundreds}</div>
				</div>
				<div className='t-col no-phone'>
					<div className='text tiny'>{data.fifties}</div>
				</div>
				<div className='t-col no-phone'>
					<div className='text tiny underline'>{(data.runs*100/data.balls).toFixed(1)}</div>
				</div>
				<div className='t-col no-phone'>
					<div className='text tiny gray'>{data.sixes}</div>
				</div>
				<div className='t-col no-phone'>
					<div className='text tiny gray'>{data.fours}</div>
				</div>
			</div>
		);
	}
	
}

BattingRow.propTypes = {
	data : PropTypes.object
}

export default BattingRow;