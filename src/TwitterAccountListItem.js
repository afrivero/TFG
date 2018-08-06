import React from 'react';
import './App.css';
import extend from 'lodash/extend';

import { Glyphicon, Button } from 'react-bootstrap';


class TwitterAccountListItem extends React.Component {

  constructor(props) {
        super(props);
    }

  render() {

    const {bemBlocks, result} = this.props
    const source = extend({}, result._source, result.highlight)

    console.log(source);
    return(
      <button className="boton">
          <h2 className={bemBlocks.item("title")}><img alt={source.user.name} src={source.user.profile_image_url_https}/>{source.user.name}</h2>
          <h4><Glyphicon glyph="retweet" /> Followers:  {source.user.followers_count}<Glyphicon glyph="heart" /> Seguidos:  {source.user.friends_count}</h4>
      </button>
    )
    }

}

export default TwitterAccountListItem;
