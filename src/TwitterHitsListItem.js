import React from 'react';
import './App.css';
import extend from 'lodash/extend';

import { Glyphicon, Button } from 'react-bootstrap';

import Tweet from 'react-tweet';


class TwitterHitsListItem extends React.Component {

  constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }

  click(source) {
      this.props.topicClick(source);
  }

  render() {

    const {bemBlocks, result} = this.props
    const source = extend({}, result._source, result.highlight)
    var tweet = "Hola";
    if (source.extended_tweet){
      tweet = source.extended_tweet.full_text
    }else{
      tweet = source.text
    }
    console.log(result.highlight);

    return(
      <button onClick={() => this.click(source)} className="boton">

          <h2 className={bemBlocks.item("title")}><img alt={source.user.name} src={source.user.profile_image_url_https}/>{source.user.name}</h2>
          <h3 className={bemBlocks.item("subtitle")}>{tweet} {this.props.valor}</h3>
          <h4><Glyphicon glyph="retweet" /> {source.retweet_count}<Glyphicon glyph="heart" /> {source.favorite_count}</h4>
      </button>
    )
    }

}

export default TwitterHitsListItem;
