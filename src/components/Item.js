import React, {PureComponent} from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

class Item extends PureComponent{
	render(){
		const { _id, name, email } = this.props.data;
		return (<div className="grid-item-link">
			<div className="grid-item" >
				<div className="preview-title center">{name}</div>
				<h3 className="center">{email}</h3>
			</div>
		</div>);
	}
}

Item.propTypes = {
	data: PropTypes.object.isRequired
};

export default Item;