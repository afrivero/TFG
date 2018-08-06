import React from 'react';
import './App.css';
import { SearchkitManager,SearchkitProvider,
  SearchBox, RefinementListFilter, Pagination,
  HierarchicalMenuFilter, HitsStats, SortingSelector, NoHits,
  ResetFilters, RangeFilter, NumericRefinementListFilter,
  ViewSwitcherHits, ViewSwitcherToggle, DynamicRangeFilter,
  InputFilter, GroupedSelectedFilters, SearchkitComponent,
  Layout, TopBar, LayoutBody, LayoutResults,
  ActionBar, ActionBarRow, SideBar } from 'searchkit';

import extend from 'lodash/extend';

import WordCloud from 'react-d3-cloud';

import { ButtonGroup } from 'react-bootstrap';


import TwitterHitsListItem from "./TwitterHitsListItem.js";

const host = "http://localhost:9200/elastic/"
const searchkit = new SearchkitManager(host)

let  data = new Object();
class PulsaBoton extends SearchkitComponent<SearchBoxProps, any> {
  contarPalabras(str){

    var palabras = str.split(' ');
    data = [];
    for(var i=0 ; i<palabras.length; i++){
        var a = 1;
        //Ya encontro la primera, entonces sumo
        data[palabras[i]] = {text: palabras[i], value: a};
        for(var j=0; j<palabras.length; j++){
          //Evitamos que se cuente de nuevo
          if(i !== j){
           if(palabras[i] === palabras[j]){
             a++;
             data[palabras[i]] = {text: palabras[i], value: a};
            }
          }
        }
    }
    data.map((word, value) => {
      return (
        <li>{word} {value}</li>
      )
    });
    console.log(data);
  }
  funcion(a){
    var strTotal = "";
    console.log(a);
    for (var i =0; i<a.length; i++){
      if(a[i]._source.extended_tweet){
        strTotal = strTotal.concat(a[i]._source.extended_tweet.full_text);
      }else{
        strTotal = strTotal.concat(a[i]._source.text);
      }

    }
    console.log(strTotal);
    this.contarPalabras(strTotal);
  }

  render() {

    var a = this.searchkit.results
    if(this.searchkit.results != null){
      a = this.searchkit.results.hits.hits
    }

    const obj = [
      { text: 'Hey', value: 1000 },
      { text: 'lol', value: 200 },
      { text: 'first impression', value: 800 },
      { text: 'very cool', value: 1000000 },
      { text: 'duck', value: 10 },
    ];
    const fontSizeMapper = word => Math.log2(word.value) * 5;
    const rotate = word => word.value % 360;

    return(
      <div>
        <button onClick={() => this.funcion(a)}>Pulsa</button>
        <WordCloud data={obj} fontSizeMapper={fontSizeMapper} rotate={rotate}/>
      </div>

    )
  }
}


class TopicsComponent extends React.Component {
  constructor(props) {
        super(props);
        this.topicClick = this.topicClick.bind(this);
    }

  topicClick(source) {
      this.props.tweetSeleccionado(source);
  }

  pulsa(){
    console.log(this.searchkit.results)
  }

  render() {
    const twitterItem = (
          <TwitterHitsListItem topicClick={this.topicClick} anotherprop="anothervalue" />
        );


    return(
      <div>
      <SearchkitProvider searchkit={searchkit}>

        <LayoutBody>

          <SideBar>
            <HierarchicalMenuFilter fields={["user.name.keyword"]} title="Usuario" id="usuario"/>
            <RefinementListFilter id="hashtags" title="Hashtags" field="entities.hashtags.text.keyword" size={10}/>
            <RefinementListFilter id="localizacion" title="Localización" field="user.location.keyword" size={10}/>
            <RefinementListFilter id="menciones" title="Menciones" field="entities.user_mentions.screen_name.keyword" size={10}/>
            <RangeFilter min={0} max={50} field="retweet_count" id="num_retweets" title="Numero Retweets" showHistogram={true}/>
            <RangeFilter min={0} max={50} field="favorite_count" id="num_favorites" title="Numero Favoritos" showHistogram={true}/>
          </SideBar>

          <LayoutResults>
            <SearchBox autofocus={true} searchOnChange={true} prefixQueryFields={["hashtags^2"]}/>

            <ActionBar>
                <ActionBarRow>
                  <HitsStats translations={{
                    "hitstats.results_found":"{hitCount} results found"
                  }}/>
                  <ViewSwitcherToggle/>
                  <SortingSelector options={[
                    {label:"Relevance", field:"_score", order:"desc"},
                    {label:"Latest Releases", field:"released", order:"desc"},
                    {label:"Earliest Releases", field:"released", order:"asc"}
                  ]}/>
                </ActionBarRow>
                <ActionBarRow>
                  <GroupedSelectedFilters/>
                  <ResetFilters/>
                </ActionBarRow>
              </ActionBar>
            <PulsaBoton/>
            <ViewSwitcherHits
                  hitsPerPage={8} highlightFields={["message.keyword"]}
                  sourceFilter={["user", "retweet_count", "favorite_count", "extended_tweet","quoted_status.extended_tweet", "text"]}
                  hitComponents={[
                    {key:"list", title:"List", itemComponent:twitterItem}
                  ]}
                  scrollTo="body"
              />

              <NoHits suggestionsField={"title"}/>
              <Pagination showNumbers={true}/>

            </LayoutResults>

        </LayoutBody>


      </SearchkitProvider>

      <button onClick={this.pulsa}>Pulsa</button>
      </div>
    )
    }

}

export default TopicsComponent;
