import './styles.scss';
import React, { Component, PropTypes } from 'react';
import Image from 'components/Image';
import { getProfileImageURL } from 'utils';

class BowlingRow extends Component {

	render(){
		const { data } = this.props;
		const photo = data.photo !== '' ? getProfileImageURL(data.photo) : '';
		const avg = data.runs/data.wickets;
		return(
			<div className='t-row'>
				<div className='t-col name'>
					<Image src={photo}/>
					<div className='text small ml10'>{data.first_name} {data.last_name}</div>
				</div>
				<div className='t-col no-phone'>
					<div className='text tiny gray'>{(data.overs).toFixed(1)}</div>
				</div>
				<div className='t-col no-phone'>
					<div className='text tiny gray'>{data.maidens}</div>
				</div>
				<div className='t-col no-phone'>
					<div className='text tiny gray'>{data.runs}</div>
				</div>
				<div className='t-col'>
					<div className='text tiny underline'>{data.wickets}</div>
				</div>
				<div className='t-col'>
					<div className='text tiny underline'>{(avg != 'Infinity' ? avg : 0).toFixed(2)}</div>
				</div>
				<div className='t-col no-phone'>
					<div className='text tiny underline'>{(data.runs/data.overs).toFixed(2)}</div>
				</div>
				<div className='t-col no-phone'>
					<div className='text tiny gray'>{data.wides}</div>
				</div>
				<div className='t-col no-phone'>
					<div className='text tiny gray'>{data.no_balls}</div>
				</div>
			</div>
		);
	}
	
}

BowlingRow.propTypes = {
	data : PropTypes.object
}

export default BowlingRow;